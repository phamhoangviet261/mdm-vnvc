const express = require('express')
const router = express.Router()

const RegisterVaccineSchema = require('../models/RegisterVaccine')
const Vaccine = require('../models/Vaccine')
const PackageVaccine = require('../models/PackageVaccine')
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
        let {regisSelfInfo, regisAnotherInfo, serviceInfo, listPackages, listVaccines, total} = req.body;
        total = total || 0;

        let vaccines = await Vaccine.find({})
        for(let i = 0; i < listVaccines.length; i++) {
            resultVaccine = vaccines.filter(item => listVaccines.includes(item.id));
        }
        resultVaccine.forEach(item => total += item.retailPrice)

        let packages = await PackageVaccine.find({})
        for(let i = 0; i < listPackages.length; i++) {
            resultPackage = packages.filter(item => listPackages.includes(item.id));
        }
        resultPackage.forEach(item => total += item.totalPrice)

        const registerVaccineList = await RegisterVaccineSchema.find();
        const registerVaccine = new RegisterVaccineSchema({id: `RVC${registerVaccineList.length}`, regisSelfInfo, regisAnotherInfo, serviceInfo, listPackages, listVaccines, total});
        const rvc = await registerVaccine.save();
        return res.status(200).json({data: rvc});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
})

module.exports = router