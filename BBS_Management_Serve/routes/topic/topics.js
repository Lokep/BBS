const express = require('express');
const router = express.Router();
const db = require('../../model/mysql.operation');
const multer = require('multer');// 上传文件的包
const fs = require('fs'); // node内置模块

// 话题表
const TOPICS_TABLE = 'topics';

// 上传图片的路径
const upload = multer({
    dest: './public/uploads'
});

// 上传图片 接口
router.post('/upload', upload.single('imageFile'), function (req, res, next) {
    // 重写图片名称
    fs.rename(req.file.path, "./public/uploads/" + req.file.filename + '.jpg', function (err) {
        if (err) {
            throw err;
        }
        console.log('上传成功!');
    });
    res.send({filename: req.file.filename + '.jpg'});
});

//新增话题  接口
router.post('/', async (req, res, next) => {
    let message = req.body,
        createAt = new Date(),
        topicID = Date.now(),
        // 新增sql语句
        sql = `INSERT INTO ${TOPICS_TABLE}(id, topicID, topicName, topicSum, topicImg, topicTitle, createAt) VALUES(?,?,?,?,?,?,?) `,
        params = [0, topicID, message.topicName, 0, message.topicImg, message.topicTitle, createAt],
        result = await db.query(sql, params);
    // 如果result存在，返回结果,不存在返回404
    if(result) {
        res.send({code: "200", message: "新增话题成功", result: result})
    } else {
        res.send({code: "404", message: "添加失败"})
    }
});

// 查询所有话题、按标题查询 接口
router.get("/", async (req, res, next) => {
    let sql = `SELECT * FROM ${TOPICS_TABLE}`,
        params = [],
        result,
        condition = req.query.condition;
    if(condition) {
        sql += " WHERE topicName LIKE ?";
        params = ["%" + condition + "%"];
    }
    // 查询结果
    result = await db.query(sql, params);
    // 返回结果
    res.send({code: "200", message: "查询成功", result: result})
});

// 删除话题  接口
router.get("/del_topic", async (req, res, next) => {
    // 删除sql语句
    let sql = `DELETE FROM ${TOPICS_TABLE} WHERE id = ?`,
        id = req.query.id,
        params = [id],
        result = await db.query(sql, params);
    // 如果result存在，返回结果,不存在返回404
    if (result) {
        res.send({code: "200", message: "删除成功", result: result})
    } else {
        res.send({code: "404", message: "删除失败"})
    }
});

module.exports = router;