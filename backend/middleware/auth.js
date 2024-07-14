const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Middleware to check if the user is authenticated
exports.adminAuth =  function (req, res , next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'You are not authenticated' });
    }

    // Bearer token
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if(decoded.role === 'admin'){
            req.user = decoded;
            next();
        }else{
            return res.status(401).json({ message: 'Forbidden: Only admins are allowed' });
        }
    }
    catch(error){
        return res.status(401).json({ message: 'Invalid' });
    }
}