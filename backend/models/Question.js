const mongoose = require('mongoose')

const Schema = mongoose.Schema

const QuestionSchema = new Schema({
    id: {
        type: String, 
        required: true,
        unique: true
    },
    content: { type: String, required: true },
    customerShortInfo: { 
        name: String,
        city: String,
        required: true,
     },
    customer: { type: String, required: true}, // customer id
    answers: { type: Array },
}, { timestamps: true })

module.exports = mongoose.model('questions', QuestionSchema)