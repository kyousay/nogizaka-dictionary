"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_1 = __importDefault(require("../controllers/userController"));
var router = express_1.default.Router();
router.put("/update", userController_1.default.update);
router.put("/favorite", userController_1.default.favorite);
router.put("/unfavorite", userController_1.default.unfavorite);
exports.default = router;
