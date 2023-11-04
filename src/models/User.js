const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require("validator");
const userSchema = new Schema({
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minLength: 7,
            trim: true,
            validate(value) {
                if( value.toLowerCase().includes("password")) {
                    throw new Error("password musn\’t contain password")
                }
            }
        },
        token: {
            type: String,
        }


    }, {
        toJSON: {getters: true}
    },
    {timestamps: true})
// Hash the password before saving it to the database
userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})




module.exports = mongoose.models.User || mongoose.model('User', userSchema);