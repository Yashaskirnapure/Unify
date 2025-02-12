const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

const sendVerificationMail = async (token, email) => {
    const verificationLink = `http://localhost:5000/api/v1/verify-email?token=${token}`;
    const mailOptions = {
        from: "Unify <unify.production@gmail.com>",
        to: email,
        subject: "Email Verification",
        text: `Please verify your email by clicking the link: ${verificationLink}`,
        html: `<p>Please verify your email by clicking <a href="${verificationLink}">this link</a>.</p>`,
    }

    await transporter.sendMail(mailOptions);
}

const sendPasswordResetEmail = async (token, email) => {
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    const mailOptions = {
        from: "Unify <unify.production@gmail.com>",
        to: email,
        subject: "Email Verification",
        text: `Please verify your email by clicking the link: ${resetLink}`,
        html: `<p>Navigate to <a href="${resetLink}">this link</a> to reset password.</p>`,
    }

    await transporter.sendMail(mailOptions);
}

module.exports = { sendVerificationMail, sendPasswordResetEmail }