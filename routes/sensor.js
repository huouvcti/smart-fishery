"use strict";

const express = require("express");
const router = express.Router();


const sensorCtrl = require("../controller/sensorCtrl");

router.get("/", sensorCtrl.main);

router.get("/send", sensorCtrl.send);

// 수온 water temperature
router.get("/wt", sensorCtrl.WT);

// 용존 산소량 DO
router.get("/do", sensorCtrl.DO);

// 산성도 pH
router.get("/ph", sensorCtrl.PH);


// 염도 salinity
router.get("/sa", sensorCtrl.SA);


module.exports = router;