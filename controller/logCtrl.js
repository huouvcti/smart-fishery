
const sensorDAO = require('../model/sensorDAO');

const { paging } = require('./tool/paging');

const dayjs = require("dayjs");
const fastcsv = require('fast-csv');
const fs = require('fs');
const { clearScreenDown } = require('readline');

const log = async (req, res) => {
    // 페이징
    // 출처: 해양 ITRC 코드
    let currentPage = req.query.page;
    const pageSize = 10;
    const page = paging(currentPage, pageSize);

    const parameters = {
        user_key: req.session.user_key,
        date_start: (req.query.start == undefined) ? "1970:01:01" : req.query.start,
        date_end: (req.query.end == undefined) ? "3000:01:01" : req.query.end,
        offset: page.offset,
        limit: page.limit,

        table: 'sensor_' + req.params.sensor
    }
    const pageCnt = await sensorDAO.log_cnt(parameters);
    const cnt = parseInt(pageCnt[0].cnt / pageSize);

    const db_data =  await sensorDAO.log(parameters);

    res.send({result:db_data, cnt});
}

const log_down = async (req, res) => {
    
    const parameters = {
        user_key: req.session.user_key,
        date_start: (req.query.start == undefined) ? "1970:01:01" : req.query.start,
        date_end: (req.query.end == undefined) ? "3000:01:01" : req.query.end,

        sensor: req.params.sensor,
        table: 'sensor_' + req.params.sensor
    }

    const time = dayjs().format('YYYY-MM-DD-HHmmss');

    // csv 파일로 다운로드
    // 출처: 오동협 선배 2주차 세미나 ppt
    try{
        const db_data = await sensorDAO.log_down(parameters);

        const ws = await fs.createWriteStream(__dirname + '/../public/csv/' + time + '.csv');
        
        fastcsv.write(db_data, {headers: true})
            .on("finish", () => {
                console.log("file write success");
            })
            .pipe(ws);

        setTimeout(() => {
            res.download(__dirname + '/../public/csv/' + time + '.csv');
        }, 500)

    } catch (err){
        console.log(err);
        res.sendStatus(500);
    }
}

const log_del = async (req, res) => {
    const parameters = {
        user_key: req.session.user_key,
        date_start: (req.query.start == undefined) ? "1970:01:01" : req.query.start,
        date_end: (req.query.end == undefined) ? "3000:01:01" : req.query.end,
        table: 'sensor_' + req.params.sensor
    }

    await sensorDAO.log_del(parameters);
    res.send(`<script>location.href='/#page3/${req.params.sensor}';</script>`)
}

module.exports = {
    log,
    log_down,
    log_del
}