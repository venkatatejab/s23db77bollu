var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



require('dotenv').config();
const connectionString =
process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
{useNewUrlParser: true,
useUnifiedTopology: true});

var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});

var goat = require("./models/goat");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goatRouter = require('./routes/goat');
var boardRouter = require('./routes/board');
var chooseRouter = require('./routes/choose');
var resourceRouter = require('./routes/resource');

var app = express();

async function recreateDB(){
  // Delete everything
  await goat.deleteMany();
  let instance1 = new
  goat({goat_color:"grey",goat_breed:"Eastern Gray goat",goat_price:6000});
  let instance2 = new
  goat({goat_color:"red",goat_breed:"American Red goat",goat_price:6500});
  let instance3 = new
  goat({goat_color:"brown",goat_breed:"Fox goat",goat_price:7000});
  let instance4 = new
  goat({goat_color:"black",goat_breed:"Jain goat",goat_price:5000});
  instance1.save().then(doc=>{
    console.log("First object saved")}
    ).catch(err=>{
    console.error(err)
    });
    instance2.save().then(doc=>{
      console.log("Second object saved")}
      ).catch(err=>{
      console.error(err)
      });
      instance3.save().then(doc=>{
        console.log("Third object saved")}
        ).catch(err=>{
        console.error(err)
        });
        instance4.save().then(doc=>{
          console.log("Fourth object saved")}
          ).catch(err=>{
          console.error(err)
          });
 }
 let reseed = true;
 if (reseed) { recreateDB();}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goat', goatRouter);
app.use('/board', boardRouter);
app.use('/choose', chooseRouter);
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
