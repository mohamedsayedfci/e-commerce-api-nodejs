const express = require("express");
const Auth = require("../middleware/auth");

const router = new express.Router();
const cartController = require('../Controllers/CartController')

//get cart items

router.get("/cart", Auth,cartController.cart());

//add cart
router.post("/cart", Auth, cartController.store());

//delete item in cart

router.delete("/cart/", Auth, cartController.delete());



module.exports = router;
