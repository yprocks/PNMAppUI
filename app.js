const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const env = process.env.DEPLOY || "dev";
const conf = require('./config/' + env + ".json");

mongoose.connect(conf.dburl, {
    connectTimeoutMS: 3000
}).then(
    function () {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
        // mongoose.connection.db.dropDatabase();
    },
    function (err) {
        console.log("Error!!  Mongoose failed to connect. " + err)
    }
);

let userlogin = require('./model/user.login.model');
let nurse = require('./model/nurse.model');
let patient = require('./model/patient.model');
let medication = require('./model/medication.model');
let quote = require('./model/quote.model');
let alert = require('./model/alert.model');

// userlogin.remove().exec();
// nurse.remove().exec();
// patient.remove().exec();
// medication.remove().exec();
// quote.remove().exec();
// alert.remove().exec();

const app = express();
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, responseType");
    next();
});

const authRoutes = require('./routes/auth.route');
const patientRoute = require('./routes/patient.route');
const nurseRoute = require('./routes/nurse.route');
const quoteRoute = require('./routes/quote.route');
const alertRoute = require('./routes/alert.route');
const symptomsAIRoute = require('./routes/symptoms.ai.route');

app.use('/auth', authRoutes);
app.use('/patient', patientRoute);
app.use('/nurse', nurseRoute);
app.use('/quotes', quoteRoute);
app.use('/alert', alertRoute);
app.use('/symptoms', symptomsAIRoute);

// app.use(function (req, res, next) {
//     let err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// app.use(function (err, req, res, next) {
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     res.status(err.status || 500);
//     res.json(err.message);
// });

app.listen(conf.port, function () {
    console.log("app started on port ", 3000);
});