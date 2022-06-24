const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RegisterVaccineSchema = new Schema({
    id: {
        type: String, 
        required: true,
        unique: true
    },
    patient: {
        type: Object, required: true,
    },
    vaccines: {
        type: Array
    },
    packageVaccines: {
        type: Array
    }
}, { timestamps: true })

module.exports = mongoose.model('registerVaccines', RegisterVaccineSchema)