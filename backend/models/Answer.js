const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AnswerSchema = new Schema({
    id: {
        type: String, 
        required: true,
        unique: true
    },
    content: { type: String, required: true },
    expert: { 
        name: String,
        nameOfCenter: String,
    }, 
}, { timestamps: true })

module.exports = mongoose.model('answers', AnswerSchema)