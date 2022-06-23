const express = require('express')
const router = express.Router()

const PackageVaccine = require('../models/PackageVaccine')
const mongoose = require('mongoose')

router.get('/', async (req, res, next) => {
    try {
        const packages = await PackageVaccine.find();
        console.log({packages: packages});
        return res.status(200).json({data: packages});
    } catch (errors) {
        console.log(errors);
    }
    
})

router.get('/:packageId', async (req, res, next) => {
    try {
        console.log("req.params.packageId: ", req.params.packageId);
        const packages = await PackageVaccine.find({id: req.params.packageId});
        console.log({vcc: packages});
        return res.status(200).json({data: packages});
    } catch (errors) {
        console.log(errors);
    }
    
})

module.exports = router