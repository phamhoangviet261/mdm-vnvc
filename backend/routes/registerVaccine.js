const express = require('express')
const router = express.Router()

const RegisterVaccineSchema = require('../models/RegisterVaccine')
const mongoose = require('mongoose')

router.get('/', async (req, res, next) => {
    try {
        const registerVaccine = await RegisterVaccineSchema.find();
        return res.status(200).json({data: registerVaccine});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.get('/:rvcId', async (req, res, next) => {
    try {
        const registerVaccine = await RegisterVaccineSchema.findOne({id: req.params.rvcId});
        return res.status(200).json({data: registerVaccine});
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
        const registerVaccineList = await RegisterVaccineSchema.find();
        const registerVaccine = new RegisterVaccineSchema({id: `RVC${registerVaccineList.length}`, patient: patient, vaccines, packageVaccines, total});
        const rvc = await registerVaccine.save();
        return res.status(200).json({data: rvc});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
})

module.exports = router