const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const { connectDB } = require('./db/connect.js');
const { errorHandler } = require('./middlewares/middlewares.js');
const { router } = require('./routes/routes.js');

const app = express();
const PORT = 5000;
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(morgan('tiny'));
app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    next();
});
app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());
app.use('/api/v1', router);
app.use(errorHandler);

process.on("unhandledRejection", (reason) => console.error("Unhandled Rejection:", reason));
process.on("uncaughtException", (error) => console.error("Uncaught Exception:", error));

if(!fs.existsSync('./assets')){ fs.mkdirSync('./assets'); }

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        console.log("connected to database");
        app.listen(PORT, () => {
            console.log(`server listening on port ${PORT}`);
        })
    }catch(err){
        console.log(err);
    }
};

start();