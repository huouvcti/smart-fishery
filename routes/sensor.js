"use strict";

const express = require("express");
const router = express.Router();


const sensorCtrl = require("../controller/sensorCtrl");

router.get("/", sensorCtrl.main);

router.get("/send", sensorCtrl.send);

// ?page=
router.get("/log", sensorCtrl.log);


module.exports = router;


