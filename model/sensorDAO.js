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

const list = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT *, DATE_FORMAT(date, '%Y-%m-%d %T') as date FROM sensor WHERE user_key=? ORDER BY date ASC;`, [parameters.user_key], (err, db_data) => {
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
    list
}