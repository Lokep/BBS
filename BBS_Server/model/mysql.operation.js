const mysql = require('mysql');
const mysqlConfig = require('./mysql.config')
const jsonResult = require('../model/jsonResult')

//向外暴露方法
var pool = mysql.createPool(mysqlConfig.mysql);

/* 
 * 其实操作数据库怎删改查只需要暴露一个方法即可
 * 返回结果的操作就留给jsonResult来
 * module.exports={
 *   query(sql,params,cb){
 *     if(err){
 *       console.log(`数据库连接失败:${err}`)
 *       throw err
 *     }else{
 *       connection.query(sql, params, cb);
 *       connection.release();
 *     }    
 *   }
 * }
 */

module.exports = {
    add: function(sql, params, cb) {
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(`数据库连接失败:${err}`)
                throw err
            }
            // 建立连接，向表中插入值
            // 'INSERT INTO user(...keys) VALUES(?,?,?)',
            connection.query(sql, params, cb);
            // 释放连接 
            connection.release();
        });
    },
    delete: function(sql, params, res) {
        // delete by params
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(`数据库连接失败:${err}`)
                throw err
            }
            connection.query(sql, params, cb);
            connection.release();
        });
    },
    update: function(sql, params, res) {
        // update by params
        for (let i in params) {
            if (param[i] == null) {
                jsonResult(res, undefined);
                break
            }
        }
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(`数据库连接失败:${err}`)
                throw err
            }
            connection.query(sql, params, cb);
            connection.release();
        });

    },
    query: function(sql, params, cb) {

        // pool.getConnection(function(err, connection) {
        //     connection.query(sql, params, cb)
        //     connection.release();
        // })


        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(`数据库连接失败:${err}`)
                throw err
            }
            // 建立连接，向表中插入值
            // 'INSERT INTO user(...keys) VALUES(?,?,?)',
            connection.query(sql, params, cb);
            // 释放连接 
            connection.release();
        });
    }
}