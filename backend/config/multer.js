const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        const dir = path.join(__dirname, '../assets');
        cb(null, dir)
    },
    filename: (req, file, cb) => cb(null, Date.now()+"_"+file.originalname)
});

const uploadToDisk = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(!file.mimetype.startsWith('image/')){ 
            return cb(new Error("Only images allowed"), false)
        }
        cb(null, true);
    },
    limits: { fileSize: 5*1024*1024 }
});

const uploadToMemory = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if(!file.mimetype.startsWith('image/')){
            return cb(new Error("Only images allowed", false));
        }
        cb(null, true);
    },
    limits: { fileSize: 5*1024*1024 }
})

module.exports = { uploadToDisk, uploadToMemory }