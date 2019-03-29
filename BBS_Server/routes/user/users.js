const express = require('express');
const router = express.Router();
const db = require('../../model/mysql.operation')

const jsonResult = require('../../model/jsonResult')

const USERINFO_TABLE = 'userinfo'

/* apis with handler '/users' */

router.post('/login', function(req, res, next) {

    let userInfo = req.body;
    let sql = ` select * from ${USERINFO_TABLE} where ${userInfo.accountType} = ? and password = ? `
    let params = [userInfo.account, userInfo.password]
    console.log("userInfo", userInfo)
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
    };
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

router.post('/register', (req, res, next) => {
    let date = new Date();
    let userID = Date.parse(date).toString()
    let createAt = date.toLocaleDateString();
    let userInfo = req.body;

    let sql = `INSERT INTO ${USERINFO_TABLE}(userID,userName,password,phone,email,createAt) VALUES(?,?,?,?,?,?) `
    let params = [userID, userInfo.userName, userInfo.password, userInfo.phone, userInfo.email, createAt]

    db.add(sql, params, (err, result) => {
        if (err) {
            console.log(err)
            jsonResult(res)
            return false
        } else {
            jsonResult(res, result)
        }
    });
});

router.post('/update_pwd', (req, res, next) => {
    let updateInfo = req.body,
        sql = `SELECT * FROM ${USERINFO_TABLE} WHERE id = ?`,
        params = [updateInfo.id],
        updateSql = `UPDATE ${USERINFO_TABLE} SET password = ? WHERE id = ?`,
        updateParams = [updateInfo.newpwd, updateInfo.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(`查询失败:${err}`);
            return false
        } else {
            if(result[0].password === updateInfo.oldpwd) {
                db.query(updateSql, updateParams, (error, data) => {
                    if(error) {
                        console.log(`查询失败:${error}`);
                        return false
                    }
                    res.send({code: "200", message: "密码修改成功", data: data})
                })
            } else {
                res.send({code: "404", message: "旧密码输入错误"})
            }
        }
    });
});

router.post('/update_phone', (req, res, next) => {
    let updateInfo = req.body,
        sql = `SELECT * FROM ${USERINFO_TABLE} WHERE id = ?`,
        params = [updateInfo.id],
        updateSql = `UPDATE ${USERINFO_TABLE} SET phone = ? WHERE id = ?`,
        updateParams = [updateInfo.newphone, updateInfo.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(`查询失败:${err}`);
            return false
        } else {
            if(result[0].phone === updateInfo.oldphone) {
                db.query(updateSql, updateParams, (error, data) => {
                    if(error) {
                        console.log(`查询失败:${error}`);
                        return false
                    }
                    res.send({code: "200", message: "手机号修改成功", data: data})
                })
            } else {
                res.send({code: "404", message: "旧手机号输入错误"})
            }
        }
    });
});

router.post('/update_email', (req, res, next) => {
    let updateInfo = req.body,
        sql = `SELECT * FROM ${USERINFO_TABLE} WHERE id = ?`,
        params = [updateInfo.id],
        updateSql = `UPDATE ${USERINFO_TABLE} SET email = ? WHERE id = ?`,
        updateParams = [updateInfo.newemail, updateInfo.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(`查询失败:${err}`);
            return false
        } else {
            console.log(result[0].password, "result.password")
            console.log(result[0], "result")
            console.log(result[0].email === updateInfo.oldemail)
            if(result[0].email === updateInfo.oldemail) {
                db.query(updateSql, updateParams, (error, data) => {
                    if(error) {
                        console.log(`查询失败:${error}`);
                        return false
                    }
                    res.send({code: "200", message: "邮箱修改成功", data: data})
                })
            } else {
                res.send({code: "404", message: "原始邮箱输入错误"})
            }
        }
    });
});

module.exports = router;