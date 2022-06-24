const express = require('express')
const router = express.Router()

const Invoice = require('../models/Invoice')
const mongoose = require('mongoose')

router.get('/', async (req, res, next) => {
    try {
        const inv = await Invoice.find();
        return res.status(200).json({data: inv});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.get('/:invoiceId', async (req, res, next) => {
    try {
        console.log("req.params.vccId: ", req.params.invoiceId);
        const inv = await Invoice.findOne({id: req.params.invoiceId});
        return res.status(200).json({data: inv});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.post('/add', async (req, res, next) => {
    try {
        const {patient, vaccines, packageVaccines, total} = req.body;
        if(!patient || !total){
            return res.status(400).json({success: false, message: 'Incorrect data.'});
        }
        const invList = await Invoice.find();
        const inv = new Invoice({id: `INV${invList.length}`, patient: patient, vaccines, packageVaccines, total});
        const invoice = await inv.save();
        return res.status(200).json({data: invoice});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

module.exports = router