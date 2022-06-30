const express = require('express')
const router = express.Router()

const User = require('../models/User')
const mongoose = require('mongoose')

router.get('/', async (req, res, next) => {
    try {
        const us = await User.find();
        return res.status(200).json({data: us});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})


module.exports = router