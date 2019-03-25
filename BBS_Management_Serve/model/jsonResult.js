// 向前台返回JSON方法的简单封装
const jsonResult = function(res, result) {
    if (typeof result === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else if (result.constructor === Object) {
        res.send(result)
    } else {
        res.json(result);
    }
};

module.exports = jsonResult