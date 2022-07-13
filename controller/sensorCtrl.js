"use strict"

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


const WT = async (req, res) => {
    const user_key = req.session.user_key;

    const io = req.app.get("io");
}

const DO = async (req, res) => {
    
}

const PH = async (req, res) => {
    
}

const SA = async (req, res) => {
    
}

module.exports = {
    main,
    send,

    WT,
    DO,
    PH,
    SA
}

