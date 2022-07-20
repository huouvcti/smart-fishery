"use strict"

const { paging } = require('./tool/paging');

const sensorDAO = require('../model/sensorDAO');

const location_login = "<script>alert(`로그인페이지로 이동`); location.href='/login';</script>";

const main = async (req, res) => {
    if(req.session.user_key){
        const parameters = {
            user_key: req.session.user_key,
            url: process.env.HOST + ":" + process.env.S_PORT
        }
        
        res.render('../views/sensor11111', {parameters});
    } else{
        res.send(location_login);
    }
}



const send = async (req, res) => {
    if(req.session.user_key){
        const parameters = {
            user_key: req.session.user_key,
            url: process.env.HOST + ":" + process.env.S_PORT
        }
        res.render('../views/sensorSend', {parameters})
    } else{
        res.send(location_login);
    }
}


const log = async (req, res) => {
    if(req.session.user_key){
        // 페이징
        // 출처: 해양 ITRC 코드
        let currentPage = req.query.page;
        const pageSize = 20;
        const page = paging(currentPage, pageSize);

        const user_key = req.session.user_key;

        const parameters = {
            user_key: user_key,
            offset: page.offset,
            limit: page.limit,
        }

        currentPage = page.currentPage;

        const pageCnt = await sensorDAO.log_PH_cnt(parameters);
        const cnt = parseInt(pageCnt[0].cnt / pageSize) + 1;

        const db_data =  await sensorDAO.log_PH(parameters);
        
        console.log(cnt);

        res.render('../views/log_PH', {user_key, db_data, currentPage, cnt})
    } else{
        res.send(location_login);
    }
}



module.exports = {
    main,
    send,
    log
}

