const express = require('express')
const router = express.Router()

const Customer = require('../models/Customer')
const mongoose = require('mongoose')

router.get('/', async (req, res, next) => {
    try {
        const cus = await Customer.find();
        return res.status(200).json({data: cus});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.get('/:phoneNumber', async (req, res, next) => {
    try {
        const cus = await Customer.find({phoneNumber: req.params.phoneNumber});
        return res.status(200).json({data: cus});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }    
})

router.post('/add', async (req, res, next) => {
    try {
        const {phoneNumber, name, age, address, addressDetail, invoices, registerVaccines} = req.body;
        if(!phoneNumber || !name || !age || !address || !addressDetail){
            return res.status(400).json({success: false, message: 'Incorrect data.'});
        }
        const oldCustomer = await Customer.findOne({phoneNumber});
        if(oldCustomer){
            return res.status(400).json({success: false, message: `SOS. The phone number is belong to ${oldCustomer.name}`});
        }
        const customer = new Customer({phoneNumber, name, age, address, addressDetail, invoices, registerVaccines})
        const cus = await customer.save();
        return res.status(200).json({data: cus});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }    
})

router.post('/update', async (req, res, next) => {
    try {
        const {phoneNumber, name, age, address, addressDetail, invoices, registerVaccines} = req.body;
        if(!phoneNumber || !name || !age || !address || !addressDetail){
            return res.status(400).json({success: false, message: 'Incorrect data.'});
        }
        const oldCustomer = await Customer.findOne({phoneNumber});
        if(oldCustomer){
            const customer = await Customer.findOneAndUpdate({'phoneNumber': oldCustomer.phoneNumber}, {phoneNumber, name, age, address, addressDetail, invoices, registerVaccines}, {upsert: true})
            const cus = await Customer.findOne({phoneNumber});
            return res.status(200).json({data: cus});
        }
        return res.status(404).json({success: false, message: 'Customer not found.'});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }    
})

module.exports = router