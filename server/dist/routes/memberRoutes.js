"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var memberController_1 = __importDefault(require("../controllers/memberController"));
var router = express_1.default.Router();
router.post("/upload", memberController_1.default.checkPermission, memberController_1.default.upload);
router.put("/update", memberController_1.default.checkPermission, memberController_1.default.update);
router.delete("/delete", memberController_1.default.checkPermission, memberController_1.default.delete);
router.get("/members", memberController_1.default.getAllMembers);
exports.default = router;
