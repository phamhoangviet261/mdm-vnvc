const express = require('express')
const router = express.Router()

const Center = require('../models/Center')
const mongoose = require('mongoose')

router.get('/', async (req, res, next) => {
    try {
        const centers = await Center.find();
        return res.status(200).json({data: centers});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.get('/:centerId', async (req, res, next) => {
    try {
        const center = await Center.findOne({id: req.params.centerId});
        return res.status(200).json({data: center});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.post('/add', async (req, res, next) => {
    try {
        const {name, address, addressDetail, googleMap, status} = req.body;
        if(!name){
            return res.status(400).json({success: false, message: 'Incorrect data.'});
        }
        const centerList = await Center.find();
        const cen = new Center({id: `CEN${centerList.length}`, name: "VNVC "+name, address: address, addressDetail: addressDetail, googleMap: googleMap, status: status || "inactive"});
        const center = await cen.save();
        return res.status(200).json({data: center});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

module.exports = router