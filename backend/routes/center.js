const express = require('express')
const router = express.Router()

const Center = require('../models/Center')
const mongoose = require('mongoose')
router.get('/', async (req, res, next) => {
    try {
        const centers = await Center.find();
        let fakeCenter = JSON.parse(JSON.stringify(centers));
        for (let i = 0; i < fakeCenter.length; i++) {
            fakeCenter[i].centerArr = fakeCenter[i].addressDetail.split(',').map(element => element.trim());
            fakeCenter[i].city  = fakeCenter[i].centerArr[fakeCenter[i].centerArr.length-1]
            fakeCenter[i].ward  = fakeCenter[i].centerArr[fakeCenter[i].centerArr.length-2]
        }
        return res.status(200).json({data: fakeCenter});
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