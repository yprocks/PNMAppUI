const userlogin = require("../model/user.login.model");
const nurse = require("../model/nurse.model");
const patient = require("../model/patient.model");

require('./user.passport.local.controller');

const register = function (req, res) {

    //create an instance of the model
    let newUser = new userlogin({
        username: req.body.email,
        password: req.body.password,
        isNurse: req.body.isNurse
    });

    userlogin.register(newUser, function (err, user) {
        if (err) {

            if (err.code === 11000) {
                return res.status(500).json({
                    message: "User Already Exists",
                    obj: null,
                    token: null
                });
            }
            return  res.status(500).json({
                message: err.message,
                obj: null,
                token: null
            });
        }

        if (user.isNurse) {
            nurse.create({
                name: req.body.name,
                address: req.body.address,
                email: req.body.email,
                phone: req.body.phone,
                userLoginId: user._id
            }, function (err, nurse) {
                if (err) {
                    removeUserLogin(user._id, err, res);
                    return;
                }
                res.status(201).json({
                    message: 'User registered',
                    obj: nurse
                });
            });
        }
        else {
            patient.create({
                name: req.body.name,
                address: req.body.address,
                email: req.body.email,
                phone: req.body.phone,
                userLoginId: user._id,
                nurseId: req.body.nurseId,
                isOnMedication: false
            }, function (err, patient) {
                if (err) {
                    removeUserLogin(user._id, err, res);
                    return;
                }
                res.status(201).json({
                    message: 'User registered',
                    obj: patient
                });
            });
        }
    });
};

function removeUserLogin(userLoginId, err, res) {

    userlogin.findByIdAndRemove(userLoginId, function (er, obj) {

        return res.status(500).json({
            message: err.message,
            obj: null,
            token: null
        });
    });
}

module.exports = {"register": register};