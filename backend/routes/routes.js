const express = require("express");
const { 
    register,
    login,
    logout,
    removeAccount,
    verifyAccount,
    verifyEmailLink,
    forgotPassword,
    resetPassword
} = require("../controllers/auth");

const {
    transformImage, 
    uploadImage, 
    retrieveImage, 
    listImages, 
    removeImage 
} = require('../controllers/imageControllers');

const { verifyJWT, verifyAuth } = require('../middlewares/auth');
const { uploadToDisk, uploadToMemory } = require('../config/multer')

const router = express.Router();

router.post('/login', login);
router.post('/register', register);

router.post('/image', verifyJWT, uploadToDisk.single('image'), uploadImage);
router.get('/images', verifyJWT, listImages);
router.get('/image/:imageId', verifyJWT, retrieveImage);
router.delete('/image/:id', verifyJWT, removeImage);
router.post('/transform', verifyJWT, uploadToMemory.single('image'), transformImage);
router.get('/logout', verifyJWT, logout);
router.get('/auth/verify', verifyAuth);
router.get('/user/remove', verifyJWT, removeAccount);

router.post('/verify-account', verifyAccount);
router.get('/verify-email', verifyEmailLink);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = { router };