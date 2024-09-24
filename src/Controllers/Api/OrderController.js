const express = require("express")
const Flutterwave = require("flutterwave-node-v3")
const Order = require("../../models/Order")
const Cart = require("../../models/Cart")
const User = require("../../models/User")
const Auth = require("../../middleware/auth")



//const flw = new Flutterwave(process.env.FLUTTERWAVE_V3_PUBLIC_KEY, process.env.FLUTTERWAVE_V3_SECRET_KEY)
/* 
commenting that out till I find a fix for flutterwave public key required error
*/

//get orders

exports.index= async (req, res) => {
    const owner = req.user._id;
    try {
        const order = await Order.find({ owner: owner }).sort({ date: -1 });
        if(order) {
            res.sendError(order)
        }
        res.sendError('No orders found')

    } catch (error) {
        res.sendError('No orders found')
    }
}

//checkout
exports.checkout= async(req, res) => {
    try {
        const owner = req.user._id;
        let payload = req.body
        

        //find cart and user 
        let cart = await Cart.findOne({owner})
        let user = req.user
        if(cart) {
            
        payload = {...payload, amount: cart.bill, email: user.email}
            const response = await flw.Charge.card(payload)
           // console.log(response)
            if(response.meta.authorization.mode === 'pin') {
                let payload2 = payload
                payload2.authorization = {
                    "mode": "pin",
                    "fields": [
                        "pin"
                    ],
                    "pin": 3310
                }
                const reCallCharge = await flw.Charge.card(payload2)

                const callValidate = await flw.Charge.validate({
                    "otp": "12345",
                    "flw_ref": reCallCharge.data.flw_ref
                })
                console.log(callValidate)
                if(callValidate.status === 'success') {
                    const order = await Order.create({
                        owner,
                        items: cart.items,
                        bill: cart.bill
                    })
                    //delete cart
                    const data = await Cart.findByIdAndDelete({_id: cart.id})
                    res.sendError(order,"Payment successful")

                } else {
                    res.sendError('payment failed',400)

                }
            }
            if( response.meta.authorization.mode === 'redirect') {

                let url = response.meta.authorization.redirect
                open(url)
            }

           // console.log(response)

        } else {
            res.sendError('No cart found',400)

        }
    } catch (error) {
        console.log(error)
        res.sendError('No cart found',400)
        
    }
}

