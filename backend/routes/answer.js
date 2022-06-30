const express = require('express')
const router = express.Router()

const Answer = require('../models/Answer')
const mongoose = require('mongoose')

router.get('/', async (req, res, next) => {
    try {
        const answer = await Answer.find();
        return res.status(200).json({data: answer});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.get('/:answerId', async (req, res, next) => {
    try {
        const qs = await Answer.findOne({id: req.params.answerId});
        return res.status(200).json({data: qs});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.post('/add', async (req, res, next) => {
    try {
        const {content, expert} = req.body;
        if(!content || !expert){
            return res.status(400).json({success: false, message: 'Incorrect data.'});
        }
        const answerList = await Answer.find();
        const ans = new Answer({id: `ANS${answerList.length}`, content, expert});
        const answer = await ans.save();
        return res.status(200).json({data: answer});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

module.exports = router