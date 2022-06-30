const express = require('express')
const router = express.Router()

const Answer = require('../models/Answer')
const Question = require('../models/Question');
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
        const {content, expert, questionId} = req.body;
        if(!content || !expert || !questionId){
            return res.status(400).json({success: false, message: 'Incorrect data.'});
        }
        const answerList = await Answer.find();
        const ans = new Answer({id: `ANS${answerList.length}`, content, expert});
        const answer = await ans.save();

        let oldQuestion = await Question.findOne({id: questionId});
        oldQuestion.answers.push(`ANS${answerList.length}`);
        const question = await Question.findOneAndUpdate({id: questionId}, {answers: oldQuestion.answers});

        return res.status(200).json({data: {answer, question}});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

module.exports = router