const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){ return res.status(403).json({ message: 'Unauthorized' }); }
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY_AUTHENTICATION);
        req.user = { userId: decoded.userId, email: decoded.email };
        next();
    }catch(err){
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

const verifyAuth = async (req, res) => {
    const token = req.cookies.token;
    if (!token) { return res.status(401).json({ isAuthenticated: false }); }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY_AUTHENTICATION);
        return res.status(200).json({ isAuthenticated: true });
    } catch (error) {
        console.log(error.name);
        return res.status(401).json({ isAuthenticated: false });
    }
}

module.exports = { verifyJWT, verifyAuth }