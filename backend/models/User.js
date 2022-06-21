const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    phoneNumber: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true,
    },
    firstname: {
        type: String, 
        required: true,
    },
    lastname: {
        type: String, 
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    address: {
        type: Array,
        require: true
    }
})

module.exports = mongoose.model('users', UserSchema)