const mongoose = require('mongoose')
const Vaccine = require('./Vaccine')
const Schema = mongoose.Schema

const PackageVaccineSchema = new Schema({
    id: {
        type: String, 
        required: true,
        unique: true,
        index: true,
    },
    name: { type: String, required: true },
    target: {
        targetId: { type: String, required: true },
        targetName: { type: String, required: true }
    },
    vaccines: {
        type: Array,
        required: true
    },
    // list of umOfInjection of each part
    totalNumOfInjection: {
        type: Number,
        required: true
    },
    // list of prices of each part
    totalPrice: {
        type: Number,
        required: true
    }
    
})

module.exports = mongoose.model('packagevaccines', PackageVaccineSchema)