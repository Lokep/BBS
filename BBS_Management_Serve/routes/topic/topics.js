const express = require('express');
const router = express.Router();
const db = require('../../model/mysql.operation');
const multer = require('multer');
const fs = require('fs')

const TOPICS_TABLE = 'topics';

/* apis with handler '/users' */

// 上传图片 接口

const upload = multer({
    dest: './public/uploads'
});

router.post('/upload', upload.single('imageFile'), function (req, res, next) {
    fs.rename(req.file.path, "./public/uploads/" + req.file.filename + '.jpg', function (err) {
        if (err) {
            throw err;
        }
        console.log('上传成功!');
    })
    res.send({filename: req.file.filename + '.jpg'});
})

//新增话题  接口
router.post('/', async (req, res, next) => {
    let message = req.body,
        createAt = new Date(),
        topicID = Date.now(),
        sql = `INSERT INTO ${TOPICS_TABLE}(id, topicID, topicName, topicSum, topicImg, topicTitle, createAt) VALUES(?,?,?,?,?,?,?) `,
        params = [0, topicID, message.topicName, 0, message.topicImg, message.topicTitle, createAt],
        result = await db.query(sql, params);
    if(result) {
        res.send({code: "200", message: "新增话题成功", result: result})
    } else {
        res.send({code: "405", message: "添加失败"})
    }
});

// 查询所有话题、按标题查询 接口
router.get("/", async (req, res, next) => {
    let sql = `SELECT * FROM ${TOPICS_TABLE}`, params = [], result;
    let condition = req.query.condition;
    if(condition) {
        sql += " WHERE topicName LIKE ?";
        params = ["%" + condition + "%"];
        result = await db.query(sql, params);
    } else {
        result = await db.query(sql, params)
    }
    res.send({code: "200", message: "查询成功", result: result})
});

// 更改发布状态 接口
router.post("/issue", async (req, res, next) => {
    let sql = `UPDATE ${TOPICS_TABLE} SET state = ? WHERE id = ?`,
        state = req.body.state,
        id = req.body.id,
        params = [state, id],
        result = await db.query(sql, params);
    if(result) {
        res.send({code: "200", message: "修改成功", result: result})
    } else {
        res.send({code: "404", message: "参数错误，没有相关信息"})
    }
});

// 删除话题  接口
router.get("/del_topic", async (req, res, next) => {
    let sql = `DELETE FROM ${TOPICS_TABLE} WHERE id = ?`,
        id = req.query.id,
        params = [id],
        result = await db.query(sql, params);
    if (result) {
        res.send({code: "200", message: "删除成功", result: result})
    }
});

module.exports = router;