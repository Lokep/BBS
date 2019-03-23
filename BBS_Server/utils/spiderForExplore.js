const request = require('request')
const targetURL = 'https://segmentfault.com/events'
const EXPLORE_TABLE = 'explore'
const date = new Date()
const db = require('../model/mysql.operation')
const cheerio = require('cheerio');

request(targetURL, (err, res, body) => {
    if (!err && res.statusCode == 200) {
        let $ = cheerio.load(body);
        let targetNode = $('.widget-event')
        let targetSum = targetNode.length

        if (targetSum > 0) {
            for (let i = 0; i < targetSum; i++) {

                let targetImg = targetNode.eq(i).find('.widget-event__banner').attr('data-original')
                let targetTitle = targetNode.eq(i).find('.widget-event__info h2.title').text()
                let targetTime = targetNode.eq(i).find('.widget-event__meta li').eq(0).text().replace(/时间：/g, '')
                let targetAddress = targetNode.eq(i).find('.widget-event__meta li').eq(1).text().replace(/城市：/g, '')
                let targetLink = targetNode.eq(i).find('.btn.btn-primary.btn-sm').attr('href')


                let sql = `INSERT INTO ${EXPLORE_TABLE} (title,time,city,cityCode,imgSrc,link,type) VALUES(?,?,?,?,?,?,?)`
                let params = [targetTitle, targetTime, targetAddress, 1, targetImg, targetLink, 1]
                db.query(sql, params, (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log({ msg: 'success' })
                    }
                })
                console.log(params)

            }
        }

    }
})