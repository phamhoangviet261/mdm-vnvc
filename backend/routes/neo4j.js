const express = require('express')
const router = express.Router()
const neo4j = require('neo4j-driver')
require('dotenv').config()
const Center = require('../models/Center')

router.get('/', async(req, res, next) =>{
    console.log('START CONNECT NEO4J........');
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
        const result = await session.run('MATCH (n) RETURN (n);');
        let data = [];
        for(let i = 0; i < result.records.length; i++) {
            data.push(result.records[i]?._fields[0].properties);
        }
        return res.status(200).json({data});
    } catch (error) {
        console.log(`unable to execute query. ${error}`)
    } finally {
        await session.close()
    }
   
    // Don't forget to close the driver connection when you're finished with it
    await driver.close()
    console.log('END CONNECT NEO4J........');
    return res.status(200).json({data: 'NEO4J - CYPHER'});
})


// TODO: find center in ward

const findCenter = (centers, wards) => {
    let result = [];
    for(let i = 0; i < centers.length; i++){
        for(let j = 0; j < wards.length; j++){
            if(centers[i].address == wards[j].id){
                result.push(centers[i])
            }
        }
    }
    return result;
}

router.get('/near/:adrId', async(req, res, next) =>{
    const adrId = req.params.adrId;
    console.log('START CONNECT NEO4J........');
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
    
    // TODO: get all centers
    let fakeCenter;
    let centerHN = [], centerHCM = [];
    try {
        const centers = await Center.find();
        fakeCenter = JSON.parse(JSON.stringify(centers));
        for (let i = 0; i < fakeCenter.length; i++) {
            fakeCenter[i].centerArr = fakeCenter[i].addressDetail.split(',').map(element => element.trim());
            fakeCenter[i].city  = fakeCenter[i].centerArr[fakeCenter[i].centerArr.length-1]
            fakeCenter[i].ward  = fakeCenter[i].centerArr[fakeCenter[i].centerArr.length-2]
            if(fakeCenter[i].city == 'TP.Hà Nội'){
                centerHN.push(fakeCenter[i])
            } else {
                centerHCM.push(fakeCenter[i])
            }
        }
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }

    // TODO: return center if input adrId has center VNVC
    for(let i=0; i<fakeCenter.length; i++) {
        if(fakeCenter[i].address === adrId) {
            return res.status(200).json({data: {centerNearest: fakeCenter[i]}});
        }
    }

    // TODO: Neu khong co center trong quan huyen thi tim quan huyen gan do
    const session = driver.session()
    let centerNearest = [];
    try {
        const node = await session.run(`MATCH (n:Address) WHERE n.id = '${adrId}' return n;`)
        const result = await session.run(`MATCH (n:Address) - [:NEAR] - (m) WHERE n.id = '${adrId}' RETURN DISTINCT  m;`);
        if(result.records.length > 0) {
            let wardNear = [];
            for(let i = 0; i < result.records.length; i++) {
                wardNear.push(result.records[i]?._fields[0].properties);
            }
            let resultCenter = findCenter(node.records[0]._fields[0].properties.city == 'Hà Nội' ? centerHN : centerHCM, wardNear);
            if(resultCenter.length == 0){
                const result_1 = await session.run(`MATCH (n:Address) - [:NEAR] - () - [:NEAR] - (m:Address) WHERE n.id = '${adrId}' return DISTINCT  m`)
                if(result_1.records.length > 0){
                    let wardNear_1 = [];
                    for(let i = 0; i < result_1.records.length; i++) {
                        wardNear_1.push(result_1.records[i]?._fields[0].properties);
                    }
                    let resultCenter_1 = findCenter(node.records[0]._fields[0].properties.city == 'Hà Nội' ? centerHN : centerHCM, wardNear_1);
                    return res.status(200).json({data: {message: 'Tim xa', centers: resultCenter_1, self: node.records[0]._fields[0].properties}});
                }
            }
            return res.status(200).json({data: {message: 'Tim gan', centers: resultCenter, self: node.records[0]._fields[0].properties}});
        }
        return res.status(200).json({data: node, fakeCenter});
    } catch (error) {
        console.log(`unable to execute query. ${error}`)
        return res.status(200).json({data: 'NEO4J - CYPHER'});
    } finally {
        await session.close()
        await driver.close()
    }
   
    // Don't forget to close the driver connection when you're finished with it
    await driver.close()
    console.log('END CONNECT NEO4J........');
    return res.status(200).json({data: 'NEO4J - CYPHER'});
})


module.exports = router