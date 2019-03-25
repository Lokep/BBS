var express = require('express');
var router = express.Router();
const db = require('../../model/mysql.operation');

const ADMIN_TABLE = 'admin';
/* GET home page. */

// 新增管理员
router.post("/", async (req, res, next) => {
    let sql = `INSERT INTO ${ADMIN_TABLE} (_id, power, admin, password) VALUES(0, 0, ?, ?)`,
        params = [req.body.admin, req.body.password],
        result = await db.query(sql, params);
    if(result) {
        res.send({code: "200", message: "添加管理员成功", result: result})
    }
});

// 查询所有管理员、按管理员名称
router.get('/', async (req, res, next) => {
    let sql = `SELECT * FROM ${ADMIN_TABLE}`,
        params = [],
        result;
    if(req.query.admin) {
        sql += `WHERE admin = ?`;
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
    let sql = `UPDATE ${ADMIN_TABLE} SET password = ? WHERE _id = ?`,
        params = [req.body.password, req.body._id],
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
