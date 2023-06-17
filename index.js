const express = require("express");
const cookieParser = require("cookie-parser");
var expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv").config();
// const port = process.env.PORT || 9000;
const port = 8000;


const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");

const passportGoogle = require("./config/passport-google-oauth2-strategy");

const flash = require("connect-flash");
const customMware = require("./config/middleware");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("assets"));
app.use(cookieParser());
app.use(expressLayouts);

// setup view engin
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "authentication_system",
    secret: "idontknow",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        // mongoUrl: process.env.MONGODB_URL,
        mongoUrl: "mongodb://localhost/Authentication_System_CN",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "error in connect - mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
// app.use(expressLayouts);

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
// extract style and script from subpages to layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is Up and Running on Port: ${port} `);
});
