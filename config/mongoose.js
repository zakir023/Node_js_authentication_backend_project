const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose.connect("mongodb://127.0.0.1/AuthenticationSystem");


// mongoose.connect(process.env.MONGODB_URL);

//accuire the connectiontion
const db = mongoose.connection;

//error
db.on("error", console.error.bind(console, "error in connecting to db"));

//up and runnning
db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});
