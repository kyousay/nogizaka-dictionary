"use strict";

const router = require("express").Router(),
loginController = require("../controllers/loginController");

router.post("/create", loginController.create)
// router.post("/", loginController.login)

module.exports = router;