const express = require('express')
const router = express.Router()

const PackageVaccine = require('../models/PackageVaccine');
const Vaccine = require('../models/Vaccine');
const mongoose = require('mongoose')

router.get('/', async (req, res, next) => {
    try {
        const packages1 = await PackageVaccine.find();
        const packages = JSON.parse(JSON.stringify(packages1));
        
        for(let i = 0; i < packages.length; i++) {
            let desc = [];
            if(packages[i]?.vaccines.length>0) {
                
                for (const vc in packages[i].vaccines) {
                    const vaccineDetails = await Vaccine.findOne({id: packages[i]?.vaccines[vc].vcid});
                    // console.log({vaccineDetails});
                    // packages[i].vaccines[vc].vaccineDetails = vaccineDetails;
                    desc.push(vaccineDetails.prevention)
                }
            }
            // console.log({desc1: desc});
            // console.log({desc2: packages[i]});
            packages[i].description = desc;
            // console.log({desc3: packages[i].description});
        }
        // console.log({packages1: packages});
        return res.status(200).json({data: packages});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.get('/:packageId', async (req, res, next) => {
    try {
        const packages = await PackageVaccine.find({id: req.params.packageId});
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
        const packages = await PackageVaccine.find({"target.targetId": req.params.targetId});
        if(packages[0]?.vaccines.length>0) {
            for (const vc in packages[0].vaccines) {
                const vaccineDetails = await Vaccine.find({id: packages[0]?.vaccines[vc].vcid});
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