"use strict"

async function main(req, res, next) {

    if(req.session.user_key){
        const user_info = {
            user_key: req.session.user_key
        }
        res.render('../views/main', {user_info})
    } else{
        res.send("<script>alert(`로그인페이지로 이동`); location.href='/login';</script>");
    }
}

module.exports = {
    main
}