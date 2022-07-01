const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const Customer = require('../models/Customer')
const Vaccine = require('../models/Vaccine')
const mongoose = require('mongoose')
const neo4j = require('neo4j-driver')
require('dotenv').config()

router.get('/', async (req, res, next) => {
    try {
        const cus = await Customer.find();
        return res.status(200).json({data: cus});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.get('/:phoneNumber', async (req, res, next) => {
    try {
        const cus = await Customer.findOne({phoneNumber: req.params.phoneNumber});
        let fakeCustomer = JSON.parse(JSON.stringify(cus));
        fakeCustomer.vaccinesDetail = []
        for(let i = 0; i < fakeCustomer.vaccines.length; i++) {
            const child = await Vaccine.findOne({id: fakeCustomer.vaccines[i]});
            fakeCustomer.vaccinesDetail.push(child);
        }
        return res.status(200).json({data: fakeCustomer});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }    
})

router.post('/add', async (req, res, next) => {
    try {
        const {phoneNumber, name, age, ccid, gender, address, addressDetail, invoices, vaccines, password, status} = req.body;
        if(!phoneNumber || !name || !age || !address || !addressDetail  || !password){
            return res.status(400).json({success: false, message: 'Incorrect data.'});
        }
        const oldCustomer = await Customer.findOne({phoneNumber});
        if(oldCustomer){
            return res.status(400).json({success: false, message: `SOS. The phone number is belong to ${oldCustomer.name}`});
        }
        const hashedPassword = await bcrypt.hash(password, '$2b$10$o/hktJ4aYLFo3zuvTU80mO');
        const customerList = await Customer.find({});
        const customer = new Customer({id: `CUS${customerList.length}`, phoneNumber, password: hashedPassword, name, ccid, gender, age, address, addressDetail, invoices, vaccines, status: status ? status : "active"})
        const cus = await customer.save();
        // const hashedPassword = await bcrypt.hash(password, '$2b$10$o/hktJ4aYLFo3zuvTU80mO');
        // const user = new User({phoneNumber, password: hashedPassword, firstname: name, lastname: name, address})
        // const u = await user.save();

        // TODO: add Neo4j Customer node
        const uri = process.env.NEO4J_URI;
        const user = process.env.NEO4J_USERNAME;
        const NeoPassword = process.env.NEO4J_PASSWORD;

        const driver = neo4j.driver(uri, neo4j.auth.basic(user, NeoPassword))
        // const session = driver.session()

        try {
            await driver.verifyConnectivity()
            console.log('Driver created')
        } catch (error) {
            console.log(`connectivity verification failed. ${error}`)
        }

        const session = driver.session()
        try {
            const node = await session.run(`CREATE (n:Customer {phone: '${phoneNumber}'});`)
            return res.status(200).json({data: cus, node: node});
        } catch (errors) {
            return res.status(400).json({success: false, message: errors.message});
        }

        
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }    
})

router.post('/update', async (req, res, next) => {
    try {
        const {phoneNumber, name, age, address, addressDetail, invoices, registerVaccines} = req.body;
        if(!phoneNumber || !name || !age || !address || !addressDetail){
            return res.status(400).json({success: false, message: 'Incorrect data.'});
        }
        const oldCustomer = await Customer.findOne({phoneNumber});
        if(oldCustomer){
            const customer = await Customer.findOneAndUpdate({'phoneNumber': oldCustomer.phoneNumber}, {phoneNumber, name, age, address, addressDetail, invoices, registerVaccines}, {upsert: true})
            const cus = await Customer.findOne({phoneNumber});
            return res.status(200).json({data: cus});
        }
        return res.status(404).json({success: false, message: 'Customer not found.'});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }    
})


router.get('/:phoneNumber/hint', async (req, res, next) => {
    try {
        const cus = await Customer.findOne({phoneNumber: req.params.phoneNumber});
        let fakeCustomer = JSON.parse(JSON.stringify(cus));

        // TODO: add Neo4j Customer node
        const uri = process.env.NEO4J_URI;
        const user = process.env.NEO4J_USERNAME;
        const NeoPassword = process.env.NEO4J_PASSWORD;

        const driver = neo4j.driver(uri, neo4j.auth.basic(user, NeoPassword))
        // const session = driver.session()

        try {
            await driver.verifyConnectivity()
            console.log('Driver created')
        } catch (error) {
            console.log(`connectivity verification failed. ${error}`)
        }

        const session = driver.session()
        try {
            const node = await session.run(`
            MATCH (:Customer {phone: ${cus.phoneNumber}})-[:BUY]-(v1:Vaccine)-[:BUY]-(other:Customer) 
            WITH collect(v1) as listv1
            MATCH (other)-[:BUY]-(v2:Vaccine)
            WHERE not v2 in listv1
            RETURN v2
            `)
            let data = [];
            for(let i = 0; i < node.records.length; i++) {
                data.push(node.records[i]?._fields[0].properties.id);
            }
            return res.status(200).json({data: cus, vaccinesHint: data});
        } catch (errors) {
            return res.status(400).json({success: false, message: errors.message});
        }

    } catch (errors) {
        return res.status(400).json({success: false, message: errors.message});
    }
})

module.exports = router