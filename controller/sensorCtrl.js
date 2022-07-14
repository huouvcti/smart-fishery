"use strict"

const { paging } = require('./tool/paging');

const sensorDAO = require('../model/sensorDAO');

const main = async (req, res) => {
   
    if(req.session.user_key){
        const parameters = {
            user_key: req.session.user_key,
            url: process.env.HOST + ":" + process.env.S_PORT
        }
        
        res.render('../views/sensor', {parameters});
    } else{
        res.send("<script>alert(`로그인페이지로 이동`); location.href='/login';</script>");
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
        res.send("<script>alert(`로그인페이지로 이동`); location.href='/login';</script>");
    }
}


const log = async (req, res) => {
    if(req.session.user_key){
        // 페이징
        let currentPage = req.query.page;
        const pageSize = 20;
        const page = paging(currentPage, pageSize);

        const parameters = {
            user_key: req.session.user_key,
            offset: page.offset,
            limit: page.limit,

            // 검색
            start_date: (req.query.start == undefined) ? "1970-01-01" : req.query.start,
            end_date: (req.query.end == undefined) ? "3000-01-01" : req.query.end
        }
        currentPage = page.currentPage;

        const pageCnt = await sensorDAO.log_page_cnt(parameters);
        const cnt = parseInt(pageCnt[0].cnt / pageSize) + 1;

        const db_data =  await sensorDAO.log(parameters);
        
        console.log(cnt);

        res.render('../views/log', {db_data, currentPage, cnt})
    } else{
        res.send("<script>alert(`로그인페이지로 이동`); location.href='/login';</script>");
    }
}



module.exports = {
    main,
    send,
    log
}

