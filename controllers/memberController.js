"use strict";

const Member = require("../models/member"),
jsonWebToken = require("jsonwebtoken");

module.exports = {
    test: (req, res, next) => {
        let data = req.body;
        console.log(data);
        res.send("Success");
    }
};