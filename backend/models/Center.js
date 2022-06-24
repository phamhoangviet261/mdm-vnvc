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
    addresDetail: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('centers', CenterSchema)