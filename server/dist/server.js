"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = require("./routes/index");
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var mongoose_1 = __importDefault(require("mongoose"));
var app = express_1.default();
mongoose_1.default.Promise = global.Promise;
//mongoose'sのfindOneAndUpdateはmongoDBのfindOneAndUpdateより圧倒的に前に出来上がったものなので、
//何も指定していないと勝手に最新のmongoDBの方を使うので、ここで使わないように設定する
mongoose_1.default.connect("mongodb://localhost:27017/Dictionary", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
var db = mongoose_1.default.connection;
db.once("open", function () {
    console.log("Successfully connected to MongoDB using Mongoose!");
});
app.set("port", process.env.PORT || 3001);
app.use(cors_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, "client/build")));
app.use(express_1.default.urlencoded({
    extended: false,
    limit: '10mb'
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use("/", index_1.router);
var server = app.listen(app.get("port"), function () {
    console.log("The Express.js server has started and is litstening on port number:" + app.get("port"));
}), io = require("socket.io")(server);
require("./controllers/chatController")(io);
