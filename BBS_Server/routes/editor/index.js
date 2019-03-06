const express = require('express');
const router = express.Router();

const multer = require('multer')
const path = require('path')
const fs = require('fs')

const db = require('../../model/mysql.operation')
const jsonResult = require('../../model/jsonResult')
const stamp = require('../../utils/timeStamp')

const EXPLORE_TABLE = 'article'
const TOPIC_TABLE = 'topics'

const uploadPath = './public/images/' //路径是基于当前项目而非当前文件
const upload = multer({ dest: uploadPath });

router.post('/tags', (req, res, next) => {
    let tagPage = 5
    let sql = `SELECT topicID,topicName from ${TOPIC_TABLE} limit ${tagPage} `
    db.query(sql, '', (err, result) => {
        if (err) {
            jsonResult(res, { status: 0, msg: "failed" })
            return false
        } else {
            console.log(result)
            jsonResult(res, result)
        }
    })
})

router.post('/content', (req, res, next) => {

    let acticleID = stamp

    console.log(req.body, acticleID)
})

router.post('/images', upload.single('image'), (req, res, next) => {
    //文件上传
    console.log(req.file)
    fs.rename(req.file.path, uploadPath + stamp + req.file.originalname.toString().slice(-4), (err) => {
        if (err) {
            console.log(err);
        }
        console.log('msg:200');
    })
    jsonResult(res, { filename: req.file.filename + '.jpg' });
})


module.exports = router;