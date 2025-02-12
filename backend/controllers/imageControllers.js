const { Image } = require('../models/Image');
const path = require('path');
const fs = require("fs");
const { convertImage } = require('../service/sharp');
const { CustomError } = require('../errors/CustomError');

const uploadImage = async (req, res, next) => {
    try{
        const userId = req.user.userId;
        const file = req.file;

        await Image.create({
            name: file.originalname,
            url: file.path,
            userId: userId,
        });

        return res.status(200).json({message : "Image added."});
    }catch(err){
        next(err);
    }
}

const retrieveImage = async (req, res, next) => {
    try{
        const { imageId } = req.params;
        const userId = req.user.userId;

        const image = await Image.findOne({ _id: imageId, userId: userId });
        if(!image) { throw new CustomError("Image not found.", 404); }

        const filepath = path.resolve(image.url);
        if(!fs.existsSync(filepath)){ throw new CustomError("Image not found.", 404); }

        res.set({ 'Content-Disposition': `attachment; filename="${image.name}"` });
        return res.status(200).sendFile(filepath);
    }catch(err){
        next(err);
    }
}

const listImages = async (req, res, next) => {
    try{
        const userId = req.user.userId;
        const images = await Image.find({ userId: userId });

        const response = images.map((image) => {
            const obj = { id: image.id, name: image.name }
            return obj;
        });

        return res.status(200).json({ message: "OK", images: response });
    }catch(err){
        next(err);
    }
}

const removeImage = async (req, res) => {
    try{
        const userId = req.user.userId;
        const imageId = req.params.id;

        const image = await Image.findOne({ _id : imageId, userId: userId});
        if(!image){ throw new CustomError("Image not found.", 404); }

        if(fs.existsSync(image.url)){ 
            fs.unlink(image.url, (err) => {
                if(err) { throw err; }
            });
        }
        const query = await image.deleteOne();
        return res.status(200).json({ message: "Image removed" });
    }catch(err){
        next(err);
    }
}

const transformImage = async (req, res, next) => {
    try{
        const user = req.user;
        const options = JSON.parse(req.body.options);
        const image = req.file.buffer;
        const filename = req.file.originalname;

        const transformedImage = await convertImage(image,  options);
        const dir = path.join(__dirname, '../transforms');
        const filepath = path.join(dir, filename);

        fs.writeFileSync(filepath, transformedImage);

        const uploadedImage = await Image.create({
            userId: user.userId,
            url: filepath,
            name: filename,
        });

        return res.status(200).json({ message: "Image posted."});
    }catch(err){
        next(err);
    }
}

module.exports = {
    transformImage,
    uploadImage,
    retrieveImage,
    listImages,
    removeImage
};