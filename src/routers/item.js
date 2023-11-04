const express = require('express')
const router = new express.Router()
const Item = require('../models/Item')
const Auth = require('../middleware/auth')
const itemController = require('../Controllers/ItemContrroler')

//fetch all items
router.get('/items', Auth,itemController.index)

//fetch an item
router.get('/items/:id', Auth,itemController.show)

//create an item
router.post('/items',Auth, itemController.store)

//update an item
router.patch('/items/:id', Auth,itemController.upadte)

//delete item
router.delete('/items/:id', Auth,itemController.delete)

module.exports = router