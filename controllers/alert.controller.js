const patient = require("../model/patient.model");
const alert = require("../model/alert.model");

const getAlerts = function (req, res) {
    let now = new Date();
    let date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2);
    alert.find({
        nurseId: req.params.nurseId,
        $or: [{created_on: {$gte: date}}, {hasViewed: false}]
    })
        .populate({path: 'patientId', model: patient, select: ['_id', 'name', 'email', 'phone', 'isOnMedication']})
        .exec(function (err, alert) {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
            }
            res.status(200).json(alert);
        });
};

const addAlerts = function (req, res) {

    patient.findById(req.body.patientId, function (err, patient) {
        if (err) {
            res.status(500).json({
                message: err.message
            });
        }
        req.body.nurseId = patient.nurseId;

        alert.create(req.body, function (err, alert) {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
            }
            res.status(200).json(alert);
        });
    });
};

module.exports = {
    "getAlerts": getAlerts,
    "addAlerts": addAlerts
};