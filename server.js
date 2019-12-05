const port = 3001,
express = require("express"),
app = express(),
path = require("path"),
router = require("./routes/index"),
mongoose = require("mongoose"),
cookieParser = require("cookie-parser"),
expressSession = require("express-session"),
expressValidator = require("express-validator"),
passport = require("passport"),
methodOverride = require("method-override"),
User = require("./models/user")

mongoose.Promise = global.Promise;

mongoose.connect(
    "mongodb://localhost:27017/Dictionary",
    { useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true, 
    }, 
)

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

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

//version 1.5.0からcookie-parserいらない
// app.use(cookieParser("nogizaka46_2011_8_21"));
app.use(
    expressSession({
        secret:"nogizaka46_2011_8_21",
        cookie: {
            maxAge: 4000000
        },
        //セッションストアにアクセスするたびに新しいセッションを作成するか
        resave: false,
        //セッションが初期化されずにストアに保存してもいいか
        //デフォルトではtrueに設定されているが、将来のバージョンでfalseをデフォルトにするように変更予定
        saveUninitialized: false,
    })
)

app.use(passport.initialize());
//sessionでアクセス認証を行っています。
app.use(passport.session());
passport.use(User.createStrategy());
/*
これらの行は、セッションに格納されたユーザーデータを直列化・暗号化し、
それをまた複合する処理を指定するものです。
シリアライズで直列化・暗号化されたデータがクッキーを通してユーザーに送られる。
クッキーを通して、サーバーに送られてきたデータをデシリアライズで複合し、セッションに保存されたデータと照合する
*/
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//secure属性があると、httpsのときだけやりとりされます。
//HttpOnly属性があると、jsから読み取れないようにできます。

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`The Express.js server has started and is litstening on port number:${app.get("port")}`);
});