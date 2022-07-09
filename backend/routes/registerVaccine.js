const express = require('express')
const router = express.Router()

const RegisterVaccineSchema = require('../models/RegisterVaccine')
const Vaccine = require('../models/Vaccine')
const PackageVaccine = require('../models/PackageVaccine')
const Customer = require('../models/Customer')
const mongoose = require('mongoose')
const neo4j = require('neo4j-driver')
require('dotenv').config()

router.get('/', async (req, res, next) => {
    try {
        const registerVaccine = await RegisterVaccineSchema.find();
        return res.status(200).json({data: registerVaccine});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
    
})

router.get('/:rvcId', async (req, res, next) => {
    try {
        const registerVaccine = await RegisterVaccineSchema.findOne({id: req.params.rvcId});
        return res.status(200).json({data: registerVaccine});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
})

router.post('/add', async (req, res, next) => {
    try {
        let {customerId, regisAnotherInfo, serviceInfo, listPackages, listVaccines, total} = req.body;
        total = total || 0;
        if(!customerId){
            return res.status(400).json({success: false, message: 'Incorrect data.'});
        }

        // TODO: cal total number
        let vaccines = await Vaccine.find({})
        let resultVaccine= [], resultPackage = [];
        for(let i = 0; i < listVaccines.length; i++) {
            resultVaccine = vaccines.filter(item => listVaccines.includes(item.id));
        }
        resultVaccine.forEach(item => total += item.retailPrice)

        let packages = await PackageVaccine.find({})
        for(let i = 0; i < listPackages.length; i++) {
            resultPackage = packages.filter(item => listPackages.includes(item.id));
        }
        resultPackage.forEach(item => total += item.totalPrice)

        // TODO: add new registerVaccine
        const registerVaccineList = await RegisterVaccineSchema.find();
        const registerVaccine = new RegisterVaccineSchema({id: `RVC${registerVaccineList.length}`, customerId, regisAnotherInfo, serviceInfo, listPackages: listPackages ? listPackages : [], listVaccines: listVaccines ? listVaccines : [], total});
        const rvc = await registerVaccine.save();

        // TODO: update list vaccine in customer information
        const cus = await Customer.findOne({id: `${customerId}`});
        let listCustomerVaccines = cus.vaccines;
        listCustomerVaccines = listCustomerVaccines.concat(listVaccines.filter((item) => listCustomerVaccines.indexOf(item) < 0))

        let listVaccinesInPackage = []
        resultPackage.forEach((item) => {
            for(let v of item.vaccines) {
                listVaccinesInPackage.push(v.vcid)
            }
        })
        listCustomerVaccines = listCustomerVaccines.concat(listVaccinesInPackage.filter((item) => listCustomerVaccines.indexOf(item) < 0))
        const newCus = await Customer.findOneAndUpdate({id: customerId}, {vaccines: listCustomerVaccines})

        // TODO: add Neo4j relationship from Customer to Vaccine
        // TODO: get new vaccine from Customer
        let newVaccines = listCustomerVaccines.filter((item) => cus.vaccines.indexOf(item) == -1)

        let vacinesInPackage = [];
        for(let i = 0; i < listPackages.length; i++){
            let p = await PackageVaccine.findOne({id: listPackages[i]});
            vacinesInPackage.push(p);
        }

        // TODO: create relationship
        newVaccines.forEach(async (item) =>{
            const uri = process.env.NEO4J_URI;
            const user = process.env.NEO4J_USERNAME;
            const password = process.env.NEO4J_PASSWORD;
            
            const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
            // const session = driver.session()
        
            try {
                await driver.verifyConnectivity()
                console.log('Driver created')
            } catch (error) {
                console.log(`connectivity verification failed. ${error}`)
            }

            const session = driver.session()
            try {
                console.log(`MATCH (c:Customer), (v:Vaccine) WHERE c.phone = '${cus.phoneNumber}' AND v.id = '${item}' CREATE (c)-[:BUY]->(v);`);
                const node = await session.run(`MATCH (c:Customer), (v:Vaccine) WHERE c.phone = '${cus.phoneNumber}' AND v.id = '${item}' CREATE (c)-[:BUY]->(v);`)
                console.log({node});
            } catch (errors) {
                console.log(errors);
                // return res.status(400).json({success: false, message: errors.message});
            }
        })

        return res.status(200).json({data: newVaccines, resultPackage, listPackages});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
})

module.exports = router