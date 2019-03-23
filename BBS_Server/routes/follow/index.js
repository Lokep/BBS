const express = require('express');
const router = express.Router();
const db = require('../../model/mysql.operation')
const jsonResult = require('../../model/jsonResult')

const FOLLOW_TABLE = 'userFollows'
const TOPICS_TABLE = 'topics'

router.post('/click', (req, res, next) => {
    let info = req.body
    let createAt = new Date().toLocaleString()
    let followSql = info.operation ? `INSERT INTO ${FOLLOW_TABLE}(id,userID,topicID,createAt) VALUES(?,?,?,?)` : `DELETE FROM ${FOLLOW_TABLE} WHERE userID=${info.userID} and topicID=${info.topicID}`
    let countSql = `UPDATE ${TOPICS_TABLE} SET topicSum= ${info.operation ? +info.topicSum++:+info.topicSum--} WHERE topicID=${info.topicID}`
    let params = [0, info.userID, info.topicID, createAt]
    let r = []
        //插入关注表
    db.add(followSql, params, (err, result) => {
        if (err) {
            r.push({ code: 500, msg: 'insert failed' })
            console.log(err)
            return false
        } else {
            // res.send({ status: 200, msg: 'insert success' })
            r.push({ code: 200, msg: 'insert success' })
        }
    })

    db.add(countSql, '', (err, result) => {
        if (err) {
            r.push({ code: 500, msg: 'update success' })
            console.log(err)
            return false
        } else {
            r.push({ code: 200, msg: 'update success' })
        }
    })
    jsonResult(res, r)
    next()
})

//我的关注 话题
router.post('/myfollow', (req, res, next) => {
    let info = req.body
    let sql = `SELECT t.*,u.userID,1 as isFollow from (select * from ${FOLLOW_TABLE} where userID=${info.userID}) as u LEFT JOIN (SELECT * from topics)as t ON u.topicID = t.topicID`

    console.log(info.userID)
    db.add(sql, '', (err, result) => {
        if (err) {
            return false
        } else {
            console.log(result)
            jsonResult(res, result)
        }
    })
})
module.exports = router