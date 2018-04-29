const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const user = require("../model/user.login.model");
const patient = require("../model/patient.model");
const nurse = require("../model/nurse.model");

passport.use(new LocalStrategy(
    function (username, password, done) {
        //find user name in DB and if found then compare pass
        user.findByName(username, function (err, userobj) {
            if (err) {
                return done(null, false, {message: 'Internal error'});
            }
            if (!userobj) {
                return done(null, false, {message: 'Incorrect credentials.'});
            }
            //user found, now check password match
            userobj.checkPassword(password, function (err, isMatch) {
                if (err) {
                    return done(null, false, {message: 'Internal error'});
                }
                if (isMatch) {
                    if (userobj.isNurse) {
                        nurse.findOne({userLoginId: userobj._id}, function (err, nurseObj) {

                            if (err) {
                                return done(null, false, {message: 'Internal error'});
                            }
                            return done(null, userobj, {message: 'Login ok', nurseId : nurseObj._id, name: nurseObj.name});
                        });
                    }
                    else {
                        patient.findOne({userLoginId: userobj._id}, function (err, patientObj) {

                            if (err) {
                                return done(null, false, {message: 'Internal error'});
                            }
                            return done(null, userobj, {message: 'Login ok', patientId: patientObj._id, name: patientObj.name});
                        });
                    }
                } else {
                    return done(null, false, {message: 'Incorrect credentials.'});
                }
            });
        });
    }));

module.exports = passport;