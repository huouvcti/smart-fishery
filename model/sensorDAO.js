const {db} = require('../config/dbconn');

const insert = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`INSERT INTO sensor (user_key, PH, RTD, EC, DO) values(?, ?, ?, ?, ?);`, [parameters.user_key, parameters.PH, parameters.RTD, parameters.EC, parameters.DO], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const update = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT *, DATE_FORMAT(date, '%Y-%m-%d %T') as date FROM sensor WHERE sensor_key=?`, [parameters.sensor_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const log = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT *, DATE_FORMAT(date, '%Y-%m-%d %T') as date FROM sensor WHERE (user_key=? AND date > ? AND  date < ?) ORDER BY date DESC LIMIT ?, ?`, [parameters.user_key, parameters.start_date, parameters.end_date, parameters.offset, parameters.limit], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const log_page_cnt = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT COUNT(*) as cnt FROM sensor WHERE (user_key=? AND date > ? AND  date < ?)`, [parameters.user_key, parameters.start_date, parameters.end_date], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}


module.exports = {
    insert,
    update,
    log,
    log_page_cnt
}