const mongoose = require('mongoose')

const Schema = mongoose.Schema

const InvoiceSchema = new Schema({
    id: {
        type: String, 
        required: true,
        unique: true
    },
    patient: {
        type: Object, required: true,
    },
    vaccines: {
        type: Array,        
    },
    packageVaccines: {
        type: Array,        
    },
    total: {
        type: Number,
    }
}, { timestamps: true })

module.exports = mongoose.model('invoices', InvoiceSchema)