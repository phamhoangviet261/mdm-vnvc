const mongoose = require('mongoose')

const Schema = mongoose.Schema

const VaccineSchema = new Schema({
    id: {
        type: String, 
        required: true,
        unique: true
    },
    name: {
        type: String, 
        required: true,
        unique: true
    },
    prevention: {
        type: String, 
        required: true,
    },
    producingCountry: {
        type: String, 
        required: true,
    },
    retailPrice: {
        type: Number, 
        required: true,
    },
    preorderPrice: {
        type: Number, 
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('vaccines', VaccineSchema)