const express = require('express')
const path = require('path');
const userRouter = require('./src/routers/user')
const itemRouter =require('./src/routers/item')
const cartRouter = require('./src/routers/cart')
const orderRouter = require('./src/routers/order')
require('./src/db/mongoose')

const port = process.env.PORT

const app = express()

app.use(express.json())
const router = express.Router()

router.use(userRouter)
router.use(itemRouter)
router.use(cartRouter)
router.use(orderRouter)
app.use('/api', router);


const publicDirectory = path.join(__dirname, 'public')
app.use(express.static(publicDirectory))

app.get('/', (req, res) => {
    res.sendFile('index.html')
})
app.listen(port, () => {
    console.log('server listening on port ' + port)
})