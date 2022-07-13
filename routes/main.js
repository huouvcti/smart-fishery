"use strict";

const express = require("express");
const router = express.Router();


const mainCtrl = require("../controller/mainCtrl");

router.get("/", mainCtrl.main);

router.get("/test", mainCtrl.test);


module.exports = router;