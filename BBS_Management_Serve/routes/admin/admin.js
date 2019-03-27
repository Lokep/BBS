const express = require('express');
const router = express.Router();
const db = require('../../model/mysql.operation');

const ADMIN_TABLE = 'admin';
/* GET home page. */

// 登录
router.post("/login", async(req, res, next) => {
    let sql = `SELECT * FROM ${ADMIN_TABLE} WHERE admin = ? and password = ?`,
        params = [req.body.admin, req.body.password],
        result = await db.query(sql, params);
    if(result.length !== 0) {
        res.send({code: "200", message: "登陆成功", result: result})
    } else {
        res.send({code: "404", message: "登录失败，用户名或密码输入有误"})
    }
});

// 新增管理员
router.post("/", async (req, res, next) => {
    let sql = `INSERT INTO ${ADMIN_TABLE} (id, power, admin, password) VALUES(?, ?, ?, ?)`,
        params = [0, 0, req.body.admin, req.body.password],
        result = await db.query(sql, params);
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
   if(result) {
       res.send({code: "200", message: "删除成功", result: result})
   } else {
       res.send({code: "404", message: "未查询到该用户的相关信息"})
    }
});

// 修改管理员权限

router.get("/update_power", async (req, res, next) => {
    let sql = `UPDATE ${ADMIN_TABLE} SET power = ? WHERE _id = ?`,
        params = [req.body.power],
        result= await db.query(sql, params);
    if(result) {
        res.send({code: "200", message: "修改成功", result: result})
    }
});

module.exports = router;
