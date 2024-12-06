const express = require("express");
const app = express();
const port = 9000;
const web = require("./route/web");

// database connect
const connectdb = require("./db/connectDb");
connectdb();

// file uploder
const fileUpload = require('express-fileupload')
// temp file upload
app.use(fileUpload({useTempFiles:true}));

// connect flash ans session
const session = require('express-session')
const flash = require('connect-flash');

// cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser())

// message
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false,
}));

// google precess
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const session = require('express-session');


// flsh message
app.use(flash());


// data fatch
app.use(express.urlencoded({ extended: true }));


// temperary engine set
app.set("view engine", "ejs");

// static file
app.use(express.static("public"));

// router load
app.use("/", web);

// server create

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
