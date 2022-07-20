"use strict"


const intro = async (req, res) => {

    if(req.session.user_key){
        res.send("<script>location.href='/';</script>");
    } else{
        res.render('../views/intro.ejs');
    }
}

module.exports = {
    intro
}