//fetch all items
const Auth = require("../middleware/auth");
const Item = require("../models/Item");
const response = require("../Helpers/Response");

exports.index = async (req, res) => {

    if (req.query.user == 1) {
        try {
            const items = await Item.find({owner: req.user._id})
            response.sendResponse(items)
        } catch (error) {
            response.sendError(error, 400)
        }
    } else {
        try {
            const items = await Item.find({})
            response.sendResponse(items)
        } catch (error) {
            response.sendError(error, 400)
        }
    }
}

//fetch an item
exports.show = async (req, res) => {
    try {
        const item = await Item.findOne({_id: req.params.id})
        if (!item) {
            response.sendError("Item not found")
        }
        response.sendResponse(item)
    } catch (error) {
        response.sendError(error)
    }
}

//create an item
exports.store = async (req, res) => {
    try {
        return await Item.create(request)
        const newItem = new Item({
            ...req.body,
            owner: req.user._id
        })
        await newItem.save()
        response.sendResponse(newItem)
    } catch (error) {
        console.log({error})
        response.sendError(error, 400)
    }
}

//update an item

exports.upadte = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description', 'category', 'price']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        response.sendError("validation error")

    }

    try {
        const item = await Item.findOne({_id: req.params.id})

        if (!item) {
            response.sendError("not found")
        }

        updates.forEach((update) => item[update] = req.body[update])
        await item.save()
        response.sendResponse(item)
    } catch (error) {
        response.sendError(error)
    }
}

//delete item
exports.delete = async (req, res) => {
    try {
        const deletedItem = await Item.findOneAndDelete({_id: req.params.id})
        if (!deletedItem) {
            response.sendError("item Not Found")
        }
        response.sendResponse(deletedItem)
    } catch (error) {
        response.sendError(error)
    }
}