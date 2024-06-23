// imports
import path from "path";
import cookieParser from "cookie-parser";
import express from "express";
import connectDb from "./mongoDbConnection";
import createHttpError from "http-errors"
import Session from "express-session";
import passport from "passport";
import morgan from "morgan";

//passport things
require("./passportStrategy");

// routes imports 
import logInRouter from "./routes/logInRoutes";
import signUpRouter from "./routes/signUpRoutes";
import dashboardRouter from "./routes/dashboardRoutes";
 
const app = express();

//connecting to mongodb
connectDb();

// view engine setup   
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(morgan("dev"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(Session({ secret: "cat", resave: true, saveUninitialized: true }));
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
  next(createHttpError(404)); 
});
 
// error handler
app.use(function (err:any, req:any, res:any, next:any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);  
  res.render("error");
});

export default app;
