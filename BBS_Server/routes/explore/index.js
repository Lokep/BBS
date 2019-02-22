const express = require('express');
const router = express.Router();
const db = require('../../model/mysql.operation')
const jsonResult = require('../../model/jsonResult')
const EXPLORE_TABLE = 'explore'

router.post('/activity', (req, res, next) => {
    console.log(req.body)
    const params = req.body


    let sql = ` select * from ${EXPLORE_TABLE} 
            ${params.type||params.cityCode?'where':''}  
            ${params.type?' type= '+params.type:''} 
            ${params.type&&params.cityCode?' and ':''} 
            ${params.cityCode?' cityCode='+params.cityCode:''}`

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