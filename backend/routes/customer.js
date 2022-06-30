const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const Customer = require('../models/Customer')
const User = require('../models/User')
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
        const cus = await Customer.findOne({phoneNumber: req.params.phoneNumber});
        return res.status(200).json({data: cus});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }    
})

router.post('/add', async (req, res, next) => {
    try {
        const {phoneNumber, name, age, address, addressDetail, invoices, registerVaccines, password, status} = req.body;
        if(!phoneNumber || !name || !age || !address || !addressDetail  || !password){
            return res.status(400).json({success: false, message: 'Incorrect data.'});
        }
        const oldCustomer = await Customer.findOne({phoneNumber});
        if(oldCustomer){
            return res.status(400).json({success: false, message: `SOS. The phone number is belong to ${oldCustomer.name}`});
        }
        const hashedPassword = await bcrypt.hash(password, '$2b$10$o/hktJ4aYLFo3zuvTU80mO');
        const customerList = await Customer.find({});
        const customer = new Customer({id: `CUS${customerList.length}`, phoneNumber, password: hashedPassword, name, age, address, addressDetail, invoices, registerVaccines, status})
        const cus = await customer.save();
        // const hashedPassword = await bcrypt.hash(password, '$2b$10$o/hktJ4aYLFo3zuvTU80mO');
        // const user = new User({phoneNumber, password: hashedPassword, firstname: name, lastname: name, address})
        // const u = await user.save();
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