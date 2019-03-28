const express = require('express');
const router = express.Router();
const db = require('../../model/mysql.operation');

// 用户表
const USERINFO_TABLE = 'userinfo';

/* apis with handler '/users' */

// 查询所有用户、按条件查询 接口
router.get("/", async (req, res, next) => {
    let sql = `SELECT * FROM ${USERINFO_TABLE}`,
        params = [],
        result, //查询结果
        condition = req.query.condition;    // 查询条件
    if(condition) {
        // 模糊查询语句
        sql += " WHERE phone LIKE ? OR email LIKE ? OR userName LIKE ?";
        params = ["%" + condition + "%", "%" + condition + "%", "%" + condition + "%"];
    }
    // 查询结果
    result = await db.query(sql, params);
    // 返回结果
    res.send({code: "200", message: "查询成功", result: result});
});

// 冻结、解冻接口
router.post("/frozen", async (req, res, next) => {
    let sql = `UPDATE ${USERINFO_TABLE} set state= ? where id = ?`, // 更新sql语句
        state = req.body.state, // 获取用户状态值
        id = req.body.id,// 获取用户对应id
        params = [state, id],
        result = await db.query(sql, params);
    // 返回结果
    res.send({code: "200", message: "操作成功", result: result})
});

// 删除用户 接口
router.get("/logoff", async (req, res, next) => {
    let sql = `DELETE FROM ${USERINFO_TABLE} WHERE id = ?`, // 删除sql语句
        params = [req.query.id],
        result = await db.query(sql, params);
    // 如果result存在，返回结果,不存在返回404
    if(result) {
        res.send({code: "200", message: "删除成功", result: result})
    } else {
        res.send({code: "404", message: "未查询到该用户"})
    }
});

module.exports = router;