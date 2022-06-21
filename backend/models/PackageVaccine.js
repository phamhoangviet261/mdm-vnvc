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
        // each part is a list of vaccineID and numOfInjection
        commonParts: { data: [{vaccineId: String, numOfInjection: Number }], required: true }, // Phan vaccine chung cua goi
        particularParts: { data: [{vaccineId: String, numOfInjection: Number }] }, // Phan vacxin rieng trong goi

        // list of umOfInjection of each part
        totalNumOfInjection: {
            type: [Number],
            required: true
        },
        // list of prices of each part
        totalPrice: {
            type: [Number],
            required: true
        }
    },
    
})

module.exports = mongoose.model('packages', PackageVaccineSchema)