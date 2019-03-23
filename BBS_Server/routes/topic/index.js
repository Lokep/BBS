const express = require('express');
const router = express.Router();
const db = require('../../model/mysql.operation')
const jsonResult = require('../../model/jsonResult')

const TOPICS_TABLE = 'topics'

router.post('/list', (req, res, next) => {
    let topicsLimit = 40
        // let sql = `select * from ${TOPICS_TABLE} limit ${topicsLimit} `
    let sql = ` select t.*,(case when u.isFollow is null then 0 else 1 end ) isFollow from topics t LEFT JOIN (select topicID as isFollow from userfollows) u on t.topicID=u.isFollow order by rand() limit ${topicsLimit}`

    db.query(sql, '', (err, result) => {
        if (err) {
            console.log(err)
            return false
        } else {
            jsonResult(res, result)
        }
    })
})


module.exports = router;