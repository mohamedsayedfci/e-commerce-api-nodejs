

const jwt = require('jsonwebtoken');
let User = require('../models/User');
const response = require("../Helpers/Response");
require('dotenv').config();


const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return  response.sendError(res,'Authentication required',401);
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return  response.sendError(res,'User not found',401);
        }

        req.user = user;
        next();
    } catch (error) {
        return  response.sendError(res,'Invalid token',401);

        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticate ;