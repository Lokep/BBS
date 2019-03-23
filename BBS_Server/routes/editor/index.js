const express = require('express');
const router = express.Router();

const multer = require('multer')
const path = require('path')
const fs = require('fs')

const db = require('../../model/mysql.operation')
const jsonResult = require('../../model/jsonResult')

const ARTICLE_TABLE = 'article'
const TOPIC_TABLE = 'topics'
const ARTICLE_IMAGE_TABLE = 'articleImg'

const uploadPath = './public/images/' //路径是基于当前项目而非当前文件
const staticPath = '/public/images/'
const upload = multer({ dest: uploadPath, limits: 65535 });

const date = new Date()
const stamp = Date.parse(date).toString()


router.post('/tags', (req, res, next) => {
    let tagLimit = 5
    let sql = `SELECT topicID,topicName,topicTitle from ${TOPIC_TABLE} order by rand() limit ${tagLimit} `
    db.query(sql, '', (err, result) => {
        if (err) {
            jsonResult(res, { status: 0, msg: "failed" })
            return false
        } else {
            jsonResult(res, result)
        }
    })
})

router.post('/content', (req, res, next) => {

    // let acticleID = stamp
    let author = req.body.author
    let title = req.body.title
    let tagName = req.body.tags[0].topicName
    let tagCode = req.body.tags[0].topicID
    let content = req.body.content
    let createAt = req.body.createAt

    let sql = `INSERT INTO ${ARTICLE_TABLE} (articleID,author,title,tagName,tagCode,content,createAt) VALUES(?,?,?,?,?,?,?)`
    let params = [stamp, author, title, tagName, tagCode, content, createAt]
    db.add(sql, params, (err, result) => {
        if (err) {
            console.log(err)
            jsonResult(res)
        } else {
            jsonResult(res, { msg: 200 })
        }
    })
})

router.post('/images', upload.single('image'), (req, res, next) => {
    //文件上传

    let oldPath = req.file.path
    let newPath = uploadPath + stamp + req.file.originalname.toString().slice(-4)
    let newName = stamp + req.file.originalname.toString().slice(-4)
    let createAt = date.toLocaleTimeString()
    console.log(req.file)
    fs.rename(oldPath, uploadPath + newName, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('msg:200');
        }

    })
    let sql = `INSERT INTO ${ARTICLE_IMAGE_TABLE} (aid,id,path,name,createAt) VALUES(?,?,?,?,?)`
    let params = [stamp, stamp, staticPath, newName, createAt]
    db.add(sql, params, (err, result) => {
        if (err) {
            jsonResult(res)
        } else {
            jsonResult(res, { msg: 200 })
        }
    })
})


module.exports = router;