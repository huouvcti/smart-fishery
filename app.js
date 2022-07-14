"use strict";

require('dotenv').config({ path: 'f.env'});

const express = require('express');
const app = express();

const session = require('express-session');

const {sessionStore} = require('./config/dbconn');

const path = require('path');

const main = require("./routes/main");
const loginRouter = require("./routes/login");
const sensorRouter = require("./routes/sensor");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/public', express.static(__dirname +'/public'));






app.use(session({
    secret: process.env.SECRET_KEY, // 암호화
    resave: false,                  // 세션을 언제자 저장
    saveUninitialized: true,        // 세션이 저장되기 전 uninitialized 상태로 미리 만들어 저장
    store: sessionStore,
    cookie: {
        maxAgeL: 1000 * 60 * 60
    }
}));



app.use("/", main);

app.use("/login", loginRouter);

app.use("/sensor", sensorRouter);

app.use('/live_resource', (req, res) =>{
    cpu = 1;
    data = [time() * 1000, cpu]
    

    res.send(json.dumps(data))
})







// ERROR 잘못된 경로
app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
  });
  
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});





module.exports = app;

