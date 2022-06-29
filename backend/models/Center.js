const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CenterSchema = new Schema({
    id: {
        type: String, 
        required: true,
        unique: true
    },
    name: { type: String, required: true },
    address: { type: String },
    addressDetail: { type: String },
    googleMap:{
        type: Object
    },
    status: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model('centers', CenterSchema)