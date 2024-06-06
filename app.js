// imports
const connectDb = require("./mongoDbConnection");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session");

//passport things
require("./passportStrategy");

// routes imports
const signUpRouter = require("./routes/signUp");
const logInRouter = require("./routes/logIn");
const dashboardRouter = require("./routes/dashboard");

const app = express();

//connecting to mongodb
connectDb();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/signUp", signUpRouter);
app.use("/logIn", logInRouter);
app.use("/dashboard", dashboardRouter);

//the default path is / so im redirecting it to /signUp
app.use("/", async (req, res) => {
  res.redirect("/logIn");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
