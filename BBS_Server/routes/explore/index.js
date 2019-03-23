const express = require('express');
const router = express.Router();
const db = require('../../model/mysql.operation')
const jsonResult = require('../../model/jsonResult')
const EXPLORE_TABLE = 'explore'

router.post('/activity', (req, res, next) => {
    console.log(req.body)
    const params = req.body

    const type = params.type
    const city = params.city

    let sql
    if (type && city) {
        sql = `select * from ${EXPLORE_TABLE} where type='${type}' and city='${city}'`
    } else if (!type && city) {
        sql = `select * from ${EXPLORE_TABLE} where city='${city}'`
    } else if (!city && type) {
        sql = `select * from ${EXPLORE_TABLE} where type='${type}'`
    } else {
        sql = `select * from ${EXPLORE_TABLE} `
    }

    // let sql = ` select * from ${EXPLORE_TABLE} 
    //         ${params.type||params.city?'where':''}  
    //         ${params.type?' type= '+params.type:''} 
    //         ${params.type&&params.city?' and ':''} 
    //         ${params.city?' city='+params.city:''}`

    console.log(sql)
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(`查询失败:${err}`)
            return false
        } else {
            jsonResult(res, result);
        }
    });
})

module.exports = router;