const medicationModel = require("../model/medication.model");
const patient = require("../model/patient.model");

const findPatients = function (req, res) {
    patient.find({nurseId: req.params.nurseId}, function (err, patients) {
        if (err) {
            res.status(500).json({
                message: err.message
            });
            return;
        }
        res.status(200).json(patients);
    });
};

const findPatientsOnMedication = function (req, res) {

    let now = new Date();
    let date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2);
    medicationModel.find({
        nurseId: req.params.nurseId,
        $or: [{end_date: {$gte: date}}, {end_date: null}]
    }, ['_id', 'name', 'end_date', 'createdAt'])
        .populate({path: 'patientId', model: patient, select: ['_id', 'name', 'email', 'phone', 'isOnMedication']})
        .exec(function (err, medications) {

            if (err || !medications) {
                res.status(500).json({
                    message: err.message
                });
                return;
            }
            res.status(200).json(medications);
        });
};

module.exports = {
    "findPatients": findPatients,
    "findPatientsOnMedication": findPatientsOnMedication
};