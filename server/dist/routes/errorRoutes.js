"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var errorController_1 = __importDefault(require("../controllers/errorController"));
var router = express_1.default.Router();
router.use(errorController_1.default.pageNotFoundError);
router.use(errorController_1.default.internalServerError);
exports.default = router;
