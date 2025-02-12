const bcrypt = require('bcryptjs');
const  { User } = require('../models/User');
const { Image } = require('../models/Image');
const jwt = require('jsonwebtoken');
const { Unverified } = require('../models/Unverified');
const { sendVerificationMail, sendPasswordResetEmail } = require('../service/email');
const { CustomError } = require('../errors/CustomError');
require('dotenv').config();

const login = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if(!user){ throw new CustomError("User not found", 401); }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){ throw new CustomError("Invalid Password", 401) }

        const token = jwt.sign({ userId: user._id, email: email }, process.env.SECRET_KEY_AUTHENTICATION, { expiresIn: '2h' });

        const cookieConfig = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
            sameSite: 'strict'
        };

        res.cookie('token', token, cookieConfig);
        return res.status(200).json({ 
            message: "Logged in successfully.",
            email: user.email,
            fullName: user.fullName,
        });
    }catch(err){
        next(err);
    }
}

const register = async (req, res, next) => {
    try{
        const { fullName, email, password } = req.body;
        const user = await User.findOne({ email : email });
        if(user){ throw new CustomError("User already exists", 400); }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullName: fullName,
            email: email,
            password: hashedPassword
        });

        return res.status(200).json({ message: "User registered successfully." });
    }catch(err){
        next(err);
    }
}

const logout = (req, res, next) => {
    try{
        const config = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        };

        res.clearCookie('token', config);
        res.clearCookie('userId', config);

        return res.status(200).json({ message: "Logged Out Successfully."});
    }catch(err){
        next(err);
    }
}

const removeAccount = async (req, res, next) => {
    try{
        const userId = req.user.userId;
        const user = await User.findOneAndDelete({ _id: userId });
        const removedImages = await Image.deleteMany({ userId: userId });

        res.cookie("token", {
            httpOnly: true,
            expiresIn: new Date(0),
            sameSite: 'strict'
        });
        return res.status(200).json({ message: "Profile deleted."});
    }catch(err){
        next(err);
    }
}

const verifyAccount = async (req, res, next) => {
    try{
        const userData = req.body;
        const user = await User.findOne({ email: userData.email });
        if(user) { throw new CustomError("Email already in use.", 400); }

        const token = jwt.sign({ email: userData.email }, process.env.SECRET_KEY_EMAIL_VERIFICATION);
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const unverifiedUser = {
            fullName: userData.fullName,
            email: userData.email,
            password: hashedPassword,
            verificationToken: token
        };

        const exists = await Unverified.findOne({ email: userData.email });
        if(exists) { throw new CustomError("Request already made using this email.", 400); }

        const query = await Unverified.create(unverifiedUser);
        sendVerificationMail(token, userData.email);

        return res.status(200).json({ message: "Verification link sent over mail." });
    }catch(err){
        next(err);
    }
}

const verifyEmailLink = async (req, res, next) => {
    try{
        const token = req.query.token;
        const decoded = jwt.verify(token, process.env.SECRET_KEY_EMAIL_VERIFICATION);
        const user = await Unverified.findOneAndDelete({ verificationToken: token });
        if(!user) { throw new CustomError("Token expired", 400); }

        const newUser = {
            fullName: user.fullName,
            email: user.email,
            password: user.password,
        }

        const query = await User.create(newUser);
        res.set('Content-Type', 'text/html');
        return res.status(200).redirect('/verification_success.html');
    }catch(err){
        next(err);
    }
}

const forgotPassword = async (req, res, next) => {
    try{
        const email = req.body.email;
        const user = await User.findOne({ email: email });
        if(!user) { throw new CustomError("Email not found", 400); }

        const token = jwt.sign({ email: email }, process.env.SECRET_KEY_PASSWORD_RESET);

        sendPasswordResetEmail(token, email);
        return res.status(200).json({ message: "Mail sent for password reset." });
    }catch(err){
        next(err);
    }
}

const resetPassword = async (req, res, next) => {
    try{
        const token = req.body.token;
        if(!token) { throw new CustomError("Bad Request", 401); }
        
        const password = req.body.password;
        const decoded = jwt.verify(token, process.env.SECRET_KEY_PASSWORD_RESET);
        const newPassword = await bcrypt.hash(password, 10);

        const user = await User.findOneAndUpdate(
            { email: decoded.email },
            { password: newPassword }
        );

        return res.status(200).json({ message: "Password reset." });
    }catch(err){
        next(err);
    }
}

module.exports = { 
    login,
    register,
    logout,
    removeAccount,
    verifyAccount,
    verifyEmailLink,
    forgotPassword,
    resetPassword,
}