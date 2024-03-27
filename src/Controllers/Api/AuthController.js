const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const response = require("../../Helpers/Response");
require('dotenv').config();

// Register a new user
exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = new User({ email, name, password });
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '3 hour'
        });
        user.token=token;
        response.sendResponse(res,user,'Registered Successfully');

    } catch (error) {
        next(error);
    }
};

// Login with an existing user
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        var user = await User.findOne({ email });
        if (!user) {
            return  response.sendError(res,'User not found',404);

        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return  response.sendError(res,'Incorrect password',401);
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '3 hour'
        });
         user.token=token;
          response.sendResponse(res, user,'login',401);

    } catch (error) {
        next(error);
    }
};
exports.logout = async (req, res) => {
    try {
        req.user.tokens =  req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
};
// module.exports = { register, login };