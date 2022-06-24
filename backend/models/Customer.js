const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    phoneNumber: {
        type: String, 
        required: true,
        unique: true
    },
    name: {
        type: String, 
        required: true,
    },
    age: {
        type: Number, 
        require: true,
        min: [0, 'Too few age.']
    },
    address: {
        type: String,
        require: true
    },
    addressDetail: {
        type: String, 
    },
    invoices: {
        type: Array,
    },
    registeredVaccines: {
        type: Array,
    }
}, { timestamps: true })

module.exports = mongoose.model('customers', CustomerSchema)