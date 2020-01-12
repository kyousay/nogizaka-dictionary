"use strict"

const router = require("express").Router(),
loginRoutes = require("./loginRoutes"),
userRoutes = require("./userRoutes"),
errorRoutes = require("./errorRoutes"),
memberRoutes = require("./memberRoutes"),
searchRoutes = require("./searchRoutes"),
loginController = require("../controllers/loginController");

router.use("/login", loginRoutes);

router.use("/", loginController.verifyJWT)

router.use("/user", userRoutes);
router.use("/member", memberRoutes);
router.use("/search", searchRoutes);
router.use("/", errorRoutes);

module.exports = router;