"use strict"

const main = async (req, res) => {
    let user_info = {}
    if(req.session.user_key){
        user_info.user_key = req.session.user_key;
        const parameters = {
            user_key: req.session.user_key,
            url: process.env.HOST + ":" + process.env.S_PORT
        }
        res.render('../views/main', {parameters})
    } else{
        res.render('../views/intro')
    }
}



module.exports = {
    main
}