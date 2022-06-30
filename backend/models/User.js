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
        type: String
    },
    lastname: {
        type: String
    },
    address: {
        type: Array,
        require: true
    }
}, { timestamps: true })

module.exports = mongoose.model('users', UserSchema)