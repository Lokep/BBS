const mysql = require('mysql');
const mysqlConfig = require('./mysql.config');

//向外暴露方法
var pool = mysql.createPool(mysqlConfig.mysql);

module.exports = {
    query: (sql, params) => {
        return new Promise((resolve, reject) =>{
            pool.getConnection(function(err, connection) {
                if(err) {
                    reject(err);
                    return;
                }
                connection.query(sql, params, function(error, result) {
                    connection.release();
                    if(error) {
                        reject(error);
                        return;
                    }
                    resolve(result)
                });
            });
        })
    }
};