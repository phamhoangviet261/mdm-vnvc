const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ExpertSchema = new Schema({
    id: {
        type: String, 
        required: true,
        unique: true
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    degrees: { type: Array, required: true },
    researches: { type: Array },
    center: { type: String, required: true },
    status: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model('experts', ExpertSchema)