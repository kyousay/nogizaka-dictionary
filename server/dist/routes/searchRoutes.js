"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var searchController_1 = __importDefault(require("../controllers/searchController"));
var router = express_1.default.Router();
router.post("/select", searchController_1.default.searchSegment);
router.post("/freeword", searchController_1.default.searchFreeword);
exports.default = router;
