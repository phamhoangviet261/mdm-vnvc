const express = require('express')
const router = express.Router()

const PackageVaccine = require('../models/PackageVaccine');
const Vaccine = require('../models/Vaccine');
const mongoose = require('mongoose')

router.get('/', async (req, res, next) => {
    try {
        const packages = await PackageVaccine.find();
        console.log({packages: packages});
        return res.status(200).json({data: packages});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.get('/:packageId', async (req, res, next) => {
    try {
        console.log("req.params.packageId: ", req.params.packageId);
        const packages = await PackageVaccine.find({id: req.params.packageId});
        console.log({package: packages});
        console.log({package: packages[0]?.vaccines});
        if(packages[0]?.vaccines.length>0) {
            for (const vc in packages[0].vaccines) {
                console.log({vc});
                const vaccineDetails = await Vaccine.find({id: packages[0]?.vaccines[vc].vcid});
                console.log({vaccineDetails});
                packages[0].vaccines[vc].vaccineDetails = vaccineDetails;
            }
        }
        return res.status(200).json({data: packages});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.get('/target/:targetId', async (req, res, next) => {
    try {
        console.log("req.params.targetId: ", req.params.targetId);
        const packages = await PackageVaccine.find({"target.targetId": req.params.targetId});
        console.log({vcc: packages});
        if(packages[0]?.vaccines.length>0) {
            for (const vc in packages[0].vaccines) {
                console.log({vc});
                const vaccineDetails = await Vaccine.find({id: packages[0]?.vaccines[vc].vcid});
                console.log({vaccineDetails});
                packages[0].vaccines[vc].vaccineDetails = vaccineDetails;
            }
        }
        return res.status(200).json({data: packages});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

module.exports = router