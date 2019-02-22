const express = require('express');
const router = express.Router();
const db = require('../model/mysql.operation')

const jsonResult = require('../model/jsonResult')

const USERINFO_TABLE = 'userinfo'

/* apis with handler '/users' */

router.post('/login', function(req, res, next) {

    let userInfo = req.body;
    let sql = ` select * from ${USERINFO_TABLE} where ${userInfo.accountType} = ? and password = ? `
    let params = [userInfo.account, userInfo.password]

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(`查询失败:${err}`)
            return false
        } else {
            jsonResult(res, result);
        }
    });
});

/* 注册时判断手机号是否已被注册 */
router.post('/checkUniquePhone', function(req, res, next) {

    let userInfo = req.body;
    let sql = ` select * from ${USERINFO_TABLE} where phone = ? `
    let params = userInfo.phone
    let data = {
        isExisits: true //存在
    }
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(`查询失败:${err}`)
            return false
        } else {
            console.log(result.length)
                //当返回结果为0，说明该号码不存在
            if (!result.length) {
                data.isExisits = false
            }
            console.log(data)
            jsonResult(res, data);
        }
    });
});

/* 注册时判断Email是否已被注册 */
router.post('/checkUniqueEmail', function(req, res, next) {

    let userInfo = req.body;
    let sql = ` select * from ${USERINFO_TABLE} where email = ? `
    let params = userInfo.email
    let data = {
        isExisits: true //存在
    }
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(`查询失败:${err}`)
            return false
        } else {
            console.log(result.length)
                //当返回结果为0，说明该email不存在
            if (!result.length) {
                data.isExisits = false
            }
            console.log(data)
            jsonResult(res, data);
        }
    });
});

router.post('/register', (req, res) => {
    let date = new Date();
    let userID = Date.parse(date).toString()
    let createAt = date.toLocaleDateString();
    let userInfo = req.body;

    let sql = `INSERT INTO ${USERINFO_TABLE}(userID,userName,password,phone,email,createAt) VALUES(?,?,?,?,?,?) `
    let params = [userID, userInfo.userName, userInfo.password, userInfo.phone, userInfo.email, createAt]

    db.add(sql, params, res);
})



module.exports = router;