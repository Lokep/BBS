const mysql = require('mysql');
const mysqlConfig = require('./mysql.config')

//向外暴露方法
var pool = mysql.createPool(mysqlConfig.mysql);

// 向前台返回JSON方法的简单封装
var jsonWrite = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    add: function(sql, params, res) {
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(`数据库连接失败:${err}`)
                throw err
            }

            // 建立连接，向表中插入值
            // 'INSERT INTO user(...keys) VALUES(?,?,?)',

            connection.query(sql, params, function(err, result) {
                console.log(result)
                if (result) {
                    result = {
                        code: 200,
                        msg: '增加成功'
                    };
                }

                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);

                // 释放连接 
                connection.release();
            });
        });
    },
    delete: function(sql, params, res) {
        // delete by params
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(`数据库连接失败:${err}`)
                throw err
            }
            connection.query(sql, params, function(err, result) {
                if (result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg: '删除成功'
                    };
                } else {
                    result = void 0;
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    update: function(sql, params, res) {
        // update by params
        for (let i in params) {
            if (param[i] == null) {
                jsonWrite(res, undefined);
                break
            }
        }


        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(`数据库连接失败:${err}`)
                throw err
            }
            connection.query(sql, params, function(err, result) {
                // 使用页面进行跳转提示
                if (result.affectedRows > 0) {
                    res.render('success', {
                        result: result
                    }); // 第二个参数可以直接在jade中使用
                } else {
                    res.render('failed', {
                        result: result
                    });
                }

                connection.release();
            });
        });

    },
    query: function(sql, params, res) {

        pool.getConnection(function(err, connection) {
            connection.query(sql, params, function(err, result) {
                if (err) {
                    console.log(`查询失败:${err}`)
                    return false
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    }

};