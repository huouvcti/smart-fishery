"use strict";

const express = require("express");
const router = express.Router();
const logCtrl = require("../controller/logCtrl");


router.get("/:sensor", logCtrl.log);


router.get("/down/:sensor", logCtrl.log_down);

router.get("/del/:sensor", logCtrl.log_del);



// router.get("/del/PH", logCtrl.del_PH);



module.exports = router;



