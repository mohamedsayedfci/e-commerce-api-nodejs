const express = require("express")
const router = new express.Router()
const Auth = require("../middleware/auth")
const orderController = require('../Controllers/OrderController')

//get orders

router.get('/orders', Auth, orderController.index())

//checkout
router.post('/order/checkout', Auth,orderController.checkout)

module.exports = router
