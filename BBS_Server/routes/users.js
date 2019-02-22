const express = require('express');
const router = express.Router();
const db = require('../model/mysql.operation')

const USERINFO_TABLE = 'userinfo'

/* apis with handler '/users' */

router.post('/login', function(req, res, next) {

    let userInfo = req.body;
    let sql = ` select * from ${USERINFO_TABLE} where ${userInfo.accountType} = ? and password = ? `
    let params = [userInfo.account, userInfo.password]

    db.query(sql, params, res);
});

router.post('/checkUniquePhone', function(req, res, next) {

    let userInfo = req.body;
    let sql = ` select * from ${USERINFO_TABLE} where phone = ? `
    let params = userInfo.phone
    let data = {
        isExisits: true
    }
    console.log(params)
    db.query(sql, params, res);

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