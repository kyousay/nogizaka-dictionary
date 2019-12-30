"use strict"

const router = require("express").Router(),
userController = require("../controllers/userController");

router.put("/update", userController.update);

module.exports = router;