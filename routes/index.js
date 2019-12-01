"use strict"

const router = require("express").Router(),
loginRoutes = require("./loginRoutes"),
errorRoutes = require("./errorRoutes");

router.use("/login", loginRoutes);
router.use("/", errorRoutes);

module.exports = router;