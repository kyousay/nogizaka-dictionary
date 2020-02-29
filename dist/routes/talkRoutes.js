"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var talkController_1 = __importDefault(require("../controllers/talkController"));
var router = express_1.default.Router();
router.get("/getTalkRooms", talkController_1.default.getAllRooms);
router.post("/getTalkRoom", talkController_1.default.checkPassword, talkController_1.default.getRoom);
router.post("/create", talkController_1.default.createRoom);
exports.default = router;
