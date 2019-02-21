const mysql = require('mysql');
const mysqlConfig = require('./mysql.config')

//向外暴露方法
module.exports = {
    query: function(sql, options, callback) {
        const pool = mysql.createPool(mysqlConfig.mysql);
        pool.getConnection(function(err, conn) {
            if (err) {
                console.log('数据库链接失败');
                throw err;
            } else {
                conn.query(sql, options, function(err, results, fields) {
                    if (err) {
                        console.log('数据库操作失败')
                        throw err
                    }
                    //释放连接  
                    conn.release();
                    //事件驱动回调  
                    callback(results, fields);
                });
            }
        });
    }

};