const express = require('express');
const router = express.Router();
const db = require('../../model/mysql.operation');

const EXPLORE_TABLE = 'explore';

/* apis with handler '/users' */

//新增活动  接口
router.post('/', async (req, res, next) => {
    let createAt = new Date();
    let message = req.body;
    let sql = `INSERT INTO ${EXPLORE_TABLE}(id, title,time,city,cityCode,imgSRc, link, type, createAt) VALUES(0,?,?,?,?,?,?,?,?) `;
    let params = [message.title, message.time, message.city, message.cityCode, message.imgSRc, message.link, message.type, createAt]
    let  result = await db.query(sql, params);
    if(result) {
        res.send({code: "200", message: "新增活动成功", result: result})
    } else {
        res.send({code: "405", message: "添加失败"})
    }
});

// 查询所有活动、按名称查询  接口
router.get("/", async (req, res, next) => {
    let sql = `SELECT * FROM ${EXPLORE_TABLE}`, params = [], result;
    let condition = req.query.condition;
    if(condition) {
        sql += " WHERE phone LIKE ? OR email LIKE ? OR userName LIKE ?";
        params = ["%" + condition + "%", "%" + condition + "%", "%" + condition + "%"];
        result = await db.query(sql, params);
    } else {
        result = await db.query(sql, params)
    }
    res.send({code: "200", message: "查询成功", result: result})
});

// 更改上架状态 接口
router.post("/uppershelf", async (req, res, next) => {
    let sql = `UPDATE ${EXPLORE_TABLE} SET state = ? WHERE id = ?`,
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

// 删除活动  接口
router.get("/del_activity", async (req, res, next) => {
    let sql = `DELETE FROM ${EXPLORE_TABLE} WHERE id = ?`,
        id = req.query.id,
        params = [id],
        result = await db.query(sql, params);
    if (result) {
        res.send({code: "200", message: "删除成功", result: result})
    }
});


module.exports = router;