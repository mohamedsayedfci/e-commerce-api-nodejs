const express = require('express')
const Auth = require('../../middleware/auth')

const router = new express.Router()

//signup
const auth= require('../../Controllers/Api/AuthController');
router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/logout', auth.logout);

module.exports = router