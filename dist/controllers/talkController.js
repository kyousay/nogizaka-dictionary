"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var talk_1 = __importDefault(require("../models/talk"));
var member_1 = __importDefault(require("../models/member"));
var getTalkRoomParams = function (talkRoom, image) {
    return {
        _id: talkRoom._id,
        roomName: talkRoom.roomName,
        description: talkRoom.description,
        isRock: talkRoom.isRock,
        image: image
    };
}, getParam = function (data) {
    return new Promise(function (resolve) {
        if (!data.image) {
            member_1.default.find({}).then(function (members) {
                var imageIndex = Math.floor(Math.random() * members.length);
                var imageId = members[imageIndex]._id;
                data.image = imageId;
                resolve(data);
            });
        }
        else {
            resolve(data);
        }
    });
};
module.exports = {
    getAllRooms: function (req, res, next) {
        talk_1.default.find({})
            .populate("image")
            .then(function (rooms) {
            if (rooms.length > 0) {
                var newRooms_1 = [];
                rooms.forEach(function (room) {
                    var image = room.image[0].image;
                    var newRoom = getTalkRoomParams(room, image);
                    newRooms_1.unshift(newRoom);
                });
                res.send({
                    isSuccess: true,
                    data: newRooms_1
                });
            }
            else {
                res.send({
                    isSuccess: true,
                    data: rooms
                });
            }
        })
            .catch(function (error) {
            res.send({
                isSuccess: false,
                message: error.name + ": " + error.message
            });
        });
    },
    checkPassword: function (req, res, next) {
        var data = req.body;
        talk_1.default.findById(data._id)
            .populate("image")
            .populate("chat")
            .then(function (room) {
            if (room !== null) {
                if (room.isRock) {
                    var roomPassword = room.password;
                    if (roomPassword === data.password) {
                        res.locals.roomInfo = room;
                        next();
                    }
                    else {
                        res.send({
                            isSuccess: false,
                            message: "パスワードが違います。"
                        });
                    }
                }
                else {
                    res.locals.roomInfo = room;
                    next();
                }
            }
            else {
                res.send({
                    isSuccess: false,
                    message: "エラーが発生しました。お手数ですが、時間が経ってから再度試してみてください。"
                });
            }
        });
    },
    getRoom: function (req, res, next) {
        var room = res.locals.roomInfo;
        var newChat = room.chat.map(function (chat) {
            var date = new Date(chat.createdAt);
            return {
                userId: chat.userId[0],
                userName: chat.userName,
                chat: chat.chat,
                date: date.getHours() + ":" + date.getMinutes()
            };
        });
        var returnData = {
            _id: room._id,
            roomName: room.roomName,
            description: room.description,
            image: room.image[0].image,
            chat: newChat
        };
        res.send({
            isSuccess: true,
            data: returnData
        });
    },
    createRoom: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getParam(req.body)];
                case 1:
                    data = _a.sent();
                    talk_1.default.create(data)
                        .then(function () {
                        talk_1.default.find({})
                            .populate("image")
                            .sort({ createdAt: -1 })
                            .limit(46)
                            .then(function (rooms) {
                            var newRooms = [];
                            rooms.forEach(function (room) {
                                var image = room.image[0].image;
                                var newRoom = getTalkRoomParams(room, image);
                                newRooms.push(newRoom);
                            });
                            res.send({
                                isSuccess: true,
                                data: newRooms
                            });
                        })
                            .catch(function (error) {
                            res.send({
                                isSuccess: false,
                                message: error.name + ": " + error.message
                            });
                        });
                    })
                        .catch(function (error) {
                        res.send({
                            isSuccess: false,
                            message: error.name + ": " + error.message
                        });
                    });
                    return [2 /*return*/];
            }
        });
    }); }
};
