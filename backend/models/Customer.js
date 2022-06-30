const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    id: {
        type: String, 
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true,
    },
    name: {
        type: String, 
        required: true,
    },
    age: {
        type: Number, 
        min: [0, 'Too few age.']
    },
    ccid: {
        type: String, 
    },
    gender: {
        type: String,
    },
    address: {
        type: String,
    },
    addressDetail: {
        type: String, 
    },
    invoices: {
        type: Array,
    },
    vaccines: {
        type: Array,
    },
    status: String
}, { timestamps: true })

module.exports = mongoose.model('customers', CustomerSchema)