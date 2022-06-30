const express = require('express')
const router = express.Router()

const Question = require('../models/Question');
const Answer = require('../models/Answer');
const mongoose = require('mongoose')

router.get('/', async (req, res, next) => {
    try {
        const questions = await Question.find();
        return res.status(200).json({data: questions});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.get('/:questionId', async (req, res, next) => {
    try {
        const qs = await Question.findOne({id: req.params.questionId});
        let fakeQuestion = JSON.parse(JSON.stringify(qs));
        let answers = [];
        for(let i = 0; i < fakeQuestion.answers.length; i++){
            const ans = await Answer.findOne({id: fakeQuestion.answers[i]});
            answers.push(ans)
        }
        fakeQuestion.answerDetail = answers;
        return res.status(200).json({data: fakeQuestion});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.post('/add', async (req, res, next) => {
    try {
        const {content, customerShortInfo, customer, answers} = req.body;
        if(!content){
            return res.status(400).json({success: false, message: 'Incorrect data.'});
        }
        const questionList = await Question.find();
        const qs = new Question({id: `QUS${questionList.length}`, content, customerShortInfo, customer, answers});
        const question = await qs.save();
        return res.status(200).json({data: question});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

module.exports = router