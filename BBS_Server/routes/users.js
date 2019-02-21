const express = require('express');
const router = express.Router();
const db = require('../model/mysql.operation')

const USERINFO_TABLE = 'userinfo'

/* apis with handler '/users' */
/* result暂时不知道是什么参数 
 *  fields 就是数据库中的data
 */

// var responseJSON = function(res, ret) {
//     if (typeof ret == 'undefined') {      
//         res.json({ code: "-200", msg: "操作失败" });    
//     } else {      
//         res.json(ret);    
//     }
// }

router.post('/login', function(req, res, next) {

    let userInfo = req.body;
    let sql = ` select * from ${USERINFO_TABLE} where ${userInfo.accountType} = ? and password = ? `
    let params = [userInfo.account, userInfo.password]

    db.query(sql, params, (result, fields) => {
        console.log(`result:${result}`, `fields:${fields}`);
    });
    res.send(userInfo);
});

router.post('/checkUniquePhone', function(req, res, next) {

    let userInfo = req.body;
    let sql = ` select * from ${USERINFO_TABLE} where phone = ? `
    let params = userInfo.phone
    let data = {
        isExisits: true
    }
    console.log(params)
    db.query(sql, params, (result, fields) => {
        if (fields) {
            isExisits = true
        }
        data.isExisits = fields ? true : false
        console.log('result:' + result)
        res.send(result);
    });

});


router.post('/register', (req, res) => {
    let date = new Date();
    let userID = Date.parse(date).toString()
    let createAt = date.toLocaleDateString();
    let userInfo = req.body;

    let sql = `INSERT INTO ${USERINFO_TABLE}(userID,userName,password,phone,email,createAt) VALUES(?,?,?,?,?,?) `
    let params = [userID, userInfo.userName, userInfo.password, userInfo.phone, userInfo.email, createAt]

    let reqMessage = {
        msg: 'success',
        status: '200',
        data: '',
        count: ''
    }

    db.query(sql, params, (result, fields) => {
        console.log(result, fields);
    });
    console.log(req.body);
    res.send(reqMessage);
})



module.exports = router;