"use strict";

const express = require("express");
const router = express.Router();
const introCtrl = require("../controller/introCtrl");


router.get("/", introCtrl.intro);


module.exports = router;



