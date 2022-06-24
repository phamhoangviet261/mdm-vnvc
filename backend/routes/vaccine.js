const express = require('express')
const router = express.Router()

const Vaccine = require('../models/Vaccine')
const mongoose = require('mongoose')

router.get('/', async (req, res, next) => {
    try {
        const vaccines = await Vaccine.find();
        console.log({vcc: vaccines});
        return res.status(200).json({data: vaccines});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.get('/:vccId', async (req, res, next) => {
    try {
        console.log("req.params.vccId: ", req.params.vccId);
        const vaccine = await Vaccine.find({id: req.params.vccId});
        console.log({vcc: vaccine});
        return res.status(200).json({data: vaccine});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

module.exports = router