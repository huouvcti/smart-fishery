"use strict"
const sensorDAO = require('../model/sensorDAO');

const { paging } = require('./tool/paging');


const intro = async (req, res) => {

    if(req.session.user_key){
        res.send("<script>location.href='/';</script>");
    } else{
        res.render('../views/intro.ejs');
    }
}

const main = async (req, res) => {
    let user_info = {}
    if(req.session.user_key){
        user_info.user_key = req.session.user_key;
        const parameters = {
            user_key: req.session.user_key,
            url: process.env.HOST + ":" + process.env.S_PORT
        }

        
        // const db_data =  await sensorDAO.log_PH(parameters);

        res.render('../views/main', {parameters})
    } else{
        res.render('../views/intro')
    }
}





module.exports = {
    intro,
    main
}