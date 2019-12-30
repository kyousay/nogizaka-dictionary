"use strict"

const router = require("express").Router(),
loginRoutes = require("./loginRoutes"),
userRoutes = require("./userRoutes"),
errorRoutes = require("./errorRoutes"),
loginController = require("../controllers/loginController");

router.use("/login", loginRoutes);

router.use("/", loginController.verifyJWT)

router.use("/user", userRoutes);
router.use("/", errorRoutes);

module.exports = router;