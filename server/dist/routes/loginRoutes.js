"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var loginController_1 = __importDefault(require("../controllers/loginController"));
var router = express_1.default.Router();
router.post("/create", loginController_1.default.create);
router.post("/authenticate", loginController_1.default.login);
exports.default = router;
