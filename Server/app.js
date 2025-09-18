var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

// ROUTES
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const authRouter = require("./Authentication/Auth");
const hotelBookingRouter = require("./Authentication/AddHotel");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// middlewares
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/Hotel", authRouter);          // /Hotel/CreateAccountUser
app.use("/Hotel/booking", hotelBookingRouter); // /Hotel/booking/addBooking

console.log("=== SERVER RELOADED ==="); // confirm nodemon reload

// catch 404
app.use(function (req, res, next) {
  res.status(404).send("Not Found");
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
