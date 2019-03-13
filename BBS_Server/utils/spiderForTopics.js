const superagent = require('superagent');
const cheerio = require('cheerio');
const request = require('request');

const db = require('../model/mysql.operation')
const jsonResult = require('../model/jsonResult')

const TOPICS_TABLE = 'topics'
const tagetURL = 'https://juejin.im/topics'
const date = new Date()

request(tagetURL, (err, res, body) => {
    if (!err && res.statusCode == 200) {

        let $ = cheerio.load(body);
        let targetTopic = $('.topic-item')
        let topicSum = targetTopic.length
        let sumFilter = /[0-9]+/g
        let imgFilter = /\"(.*?)\"/
        if (topicSum > 0) {
            for (let i = 0; i < topicSum; i++) {
                let topicName = targetTopic.eq(i).find('div.content>a').text()
                let topicID = Date.parse(date).toString()
                if (!topicName) {
                    continue
                }
                let topicTitle = targetTopic.eq(i).find('a.icon').attr('title')

                let topicImg = targetTopic.eq(i).find('a.icon').html().match(imgFilter)[1]

                let topicSum = targetTopic.eq(i).find('div.content>span').eq(0).text().match(sumFilter)[0]

                let sql = `INSERT INTO ${TOPICS_TABLE} (topicID,topicName,topicSum,topicImg,topicTitle) VALUES(?,?,?,?,?)`
                let params = [topicID, topicName, topicSum, topicImg, topicTitle]
                db.add(sql, params, (err, result) => {
                    if (err) {
                        console.log({ err: 'failed' })
                        continue
                    } else {
                        console.log({ msg: 'success' })
                    }
                })

            }
        }
    }
})