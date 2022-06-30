const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RegisterVaccineSchema = new Schema({
    id: {
        type: String, 
        required: true,
        unique: true
    },
    regisSelfInfo: {
        fullname: String,
        birthday: String,
        gender: String,
        city: String,
        district: String,
        address: String,
        ccid: String,
        phoneNumber: String,
    },
    regisAnotherInfo: {
        fullname: String,
        birthday: String,
        gender: String,
        city: String,
        district: String,
        address: String,
        phoneNumber: String,
        relationship: String,
        relatedFullName: String,
    },
    serviceInfo: {
        city: String,
        center: String,
        injectDate: String,
    },
    listPackages: Array,
    listVaccines: Array,
    total: {
        type: Number,
    }
}, { timestamps: true })

module.exports = mongoose.model('registerVaccines', RegisterVaccineSchema)