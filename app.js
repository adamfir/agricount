var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var moment = require('moment-timezone');
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
let CronJob = require('./crons/CronJob');
let cron = require('node-cron');

var app = express();
moment().tz("Asia/Tokyo").format();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// cronJob
let cronJob = new CronJob();
cron.schedule('0 0 * * *', async()=>{
    await cronJob.createLaporan();
},null,true,"Asia/Jakarta");

module.exports = app;
