const express = require('express')
const path = require('path');
const userRouter = require('./src/routers/api/user')
const itemRouter =require('./src/routers/api/item')
const cartRouter = require('./src/routers/api/cart')
const orderRouter = require('./src/routers/api/order')
// const webRouter = require('./src/routers/web')
require('./src/db/mongoose')
const responseEnhancer = require('./src/middleware/response');


const port = process.env.PORT||3000
const homeController = require('./src/Controllers/HomeContrroler')

const app = express()
// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
app.use(express.json())
const web = express.Router()
const router = express.Router()
app.get('/index',homeController.index)
app.use(responseEnhancer);

// web.use(webRouter)
//api
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