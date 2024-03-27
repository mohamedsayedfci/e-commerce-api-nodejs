//fetch all items
const Auth = require("../../middleware/auth");
const Item = require("../../models/Item");
const response = require("../../Helpers/Response");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
exports.index = async (req, res) => {

    if (req.query.user == 1) {
        try {
            const items = await Item.find({owner: req.user._id})
            response.sendResponse(res,items)
        } catch (error) {
            response.sendError(res,error, 400)
        }
    } else {
        try {
            const items = await Item.find({})
            response.sendResponse(res,items)
        } catch (error) {
            response.sendError(res,error, 400)
        }
    }
}

//fetch an item
exports.show = async (req, res) => {
    try {
        const item = await Item.findOne({_id: req.params.id})
        if (!item) {
            response.sendError(res,"Item not found")
        }
        response.sendResponse(res,item)
    } catch (error) {
        response.sendError(res,error)
    }
}

//create an item
exports.store = async (req, res) => {
    try {
        const gfs = new Grid(mongoose.connection.db, mongoose.mongo);
        const writeStream = gfs.createWriteStream({
            filename: req.file.originalname,
            mode: 'w',
            content_type: req.file.mimetype,
        });
        fs.createReadStream(req.file.path).pipe(writeStream);
        writeStream.on('close', (file) => {
            fs.unlink(req.file.path, (err) => {
                if (err) throw err;
                return res.json({ file });
            });
        });
      //  return await Item.create(request)
        const newItem = new Item({
            ...req.body,
            owner: req.user._id
        })
        await newItem.save()
        response.sendResponse(res,newItem)
    } catch (error) {
        console.log({error})
        response.sendError(res,error, 400)
    }
}

//update an item

exports.upadte = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description', 'category', 'price']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        response.sendError(res,"validation error")

    }

    try {
        const item = await Item.findOne({_id: req.params.id})

        if (!item) {
            response.sendError(res,"not found")
        }

        updates.forEach((update) => item[update] = req.body[update])
        await item.save()
        response.sendResponse(res,item)
    } catch (error) {
        response.sendError(res,error)
    }
}

//delete item
exports.delete = async (req, res) => {
    try {
        const deletedItem = await Item.findOneAndDelete({_id: req.params.id})
        if (!deletedItem) {
            response.sendError(res,"item Not Found")
        }
        response.sendResponse(res,deletedItem)
    } catch (error) {
        response.sendError(res,error)
    }
}