const express = require('express')
const router = express.Router()

const Expert = require('../models/Expert')
const mongoose = require('mongoose')

router.get('/', async (req, res, next) => {
    try {
        const experts = await Expert.find();
        return res.status(200).json({data: experts});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.get('/:expertId', async (req, res, next) => {
    try {
        const expert = await Expert.findOne({id: req.params.expertId});
        return res.status(200).json({data: expert});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.post('/add', async (req, res, next) => {
    try {
        const {name, description, degrees, researches, center, status} = req.body;
        if(!name || !description || !degrees || !center){
            return res.status(400).json({success: false, message: 'Incorrect data.'});
        }
        const expertList = await Expert.find();
        const exp = new Expert({id: `EXP${expertList.length}`, name: name, description: description, degrees: degrees, researches: researches, center: center, status: status});
        const expert = await exp.save();
        return res.status(200).json({data: expert});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

module.exports = router