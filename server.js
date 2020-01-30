const express = require("express"),
app = express(),
cors = require("cors"),
path = require("path"),
router = require("./routes/index"),
mongoose = require("mongoose");

mongoose.Promise = global.Promise;

//mongoose'sのfindOneAndUpdateはmongoDBのfindOneAndUpdateより圧倒的に前に出来上がったものなので、
//何も指定していないと勝手に最新のmongoDBの方を使うので、ここで使わないように設定する
mongoose.connect(
    "mongodb://heroku_3vtkd4wf:p1sqtmo7636rf0t4695qpq1df0@ds019076.mlab.com:19076/heroku_3vtkd4wf",
    { 
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true, 
        useFindAndModify: false
    }, 
)

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3001);

app.use(cors())

app.use(express.static(path.join(__dirname, "client/build")));

app.use(
    express.urlencoded({
        extended: false,
        limit: '10mb'
    })
);

app.use(express.json({limit: '10mb'}));

app.use("/", router);

const server =app.listen(app.get("port"), () => {
    console.log(`The Express.js server has started and is litstening on port number:${app.get("port")}`);
}),
io = require("socket.io")(server);
require("./controllers/chatController")(io);