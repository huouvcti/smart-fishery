"use strict";

const express = require("express");
const router = express.Router();
const loginCtrl = require("../controller/loginCtrl");


router.post("/process", loginCtrl.loginProcess);

router.get("/logout_process", loginCtrl.logout);


module.exports = router;



