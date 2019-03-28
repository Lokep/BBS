const express = require('express');
const router = express.Router();
const db = require('../../model/mysql.operation');

// 管理员表
const ADMIN_TABLE = 'admin';

// 登录
router.post("/login", async(req, res, next) => {
    // 查询管理员表中是否存在该用户，以及验证密码是否正确
    let sql = `SELECT * FROM ${ADMIN_TABLE} WHERE admin = ? and password = ?`,
        params = [req.body.admin, req.body.password],
        result = await db.query(sql, params);
    // 如果result长度不为0，返回结果,不存在返回404
    if(result.length !== 0) {
        res.send({code: "200", message: "登陆成功", result: result})
    } else {
        res.send({code: "404", message: "登录失败，用户名或密码输入有误"})
    }
});

// 新增管理员
router.post("/", async (req, res, next) => {
    // 新增管理员sql语句
    let sql = `INSERT INTO ${ADMIN_TABLE} (id, power, admin, password) VALUES(?, ?, ?, ?)`,
        params = [0, 0, req.body.admin, req.body.password],
        result = await db.query(sql, params);
    // 如果result存在，返回结果,不存在返回404
    if(result) {
        res.send({code: "200", message: "添加管理员成功", result: result})
    } else {
        res.send({code: "404", message: "参数填写有误，请重新填写"})
    }
});

// 查询所有管理员、按管理员名称
router.get('/', async (req, res, next) => {
    let sql = `SELECT * FROM ${ADMIN_TABLE}`,
        params = [],
        result;
    if(req.query.admin) {
        sql += ` WHERE admin = ?`;
        params = [req.query.admin];
    }
    result = await db.query(sql, params);
    // 如果result存在，返回结果,不存在返回404
    if(result) {
        res.send({code: "200", message: "查询成功", result: result})
    }else {
        res.send({code: "404", message: "没有查询到该管理员的相关信息"})
    }

});

// 修改用户名密码 接口
router.post('/update_info', async (req, res, next) => {
    let sql = `UPDATE ${ADMIN_TABLE} SET admin = ?, password = ? WHERE id = ?`,
        params = [req.body.admin, req.body.password, req.body.id],
        result= await db.query(sql, params);
    // 如果result存在，返回结果,不存在返回404
    if(result) {
        res.send({code: "200", message: "修改成功", result: result})
    }else {
        res.send({code: "404", message: "没有查询到该管理员的相关信息"})
    }
});

// 删除管理员 接口
router.get("/del_admin", async (req, res, next) => {
   let sql = `DELETE FROM ${ADMIN_TABLE} WHERE _id = ?`,
       params = [req.query._id],
       result = await db.query(sql, params);
    // 如果result存在，返回结果,不存在返回404
   if(result) {
       res.send({code: "200", message: "删除成功", result: result})
   } else {
       res.send({code: "404", message: "未查询到该用户的相关信息"})
    }
});


module.exports = router;
