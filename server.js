const port = 3001,
express = require("express"),
app = express(),
path = require("path"),
router = require("./routes/index"),
mongoose = require("mongoose"),
methodOverride = require("method-override")

mongoose.connect(
    "mongodb://localhost:27017/Dictionary",
    { useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true, 
    }, 
)

app.set("port", process.env.PORT || 3001);

app.use(
    methodOverride("_method", {
            methods: ["POST", "GET"]
        })
);

app.use(express.static(path.join(__dirname, "client/build")));

app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`The Express.js server has started and is litstening on port number:${app.get("port")}`);
});