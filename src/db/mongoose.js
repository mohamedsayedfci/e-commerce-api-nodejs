// const mongoose = require('mongoose');
//
// mongoose.connect(process.env.MONGODB_URL, {
//     // useNewUrlParser: true,
// })
require('dotenv').config();

const DB = process.env.MONGODB_URI
const mongoose = require('mongoose');
// require('dotenv').config();

const connect=mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    console.log('Database connected..')
}).catch((error)=>{
    console.log(error)
})