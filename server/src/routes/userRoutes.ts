"use strict"

const router = require("express").Router(),
userController = require("../controllers/userController");

router.put("/update", userController.update);
router.put("/favorite", userController.favorite);
router.put("/unfavorite", userController.unfavorite);

export {router};