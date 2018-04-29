// const nurse = require("../model/nurse");
const patient = require("../model/patient.model");
const medication = require("../model/medication.model");

const find = function (req, res) {
    patient.findById(req.params.patientId, function (err, patient) {
        if (err) {
            res.status(500).json({
                message: err.message
            });
        }
        res.status(200).json(patient);
    });
};

const remove = function (req, res) {
    patient.findByIdAndRemove(req.params.patientId, function (err, patient) {
        if (err) {
            res.status(500).json({
                message: err.message
            });
        }
        res.status(200).json(patient);
    });
};

const update = function (req, res) {
    patient.findByIdAndUpdate(req.params.patientId, req.body, {new: true},
        function (err, patient) {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
            }
            res.status(200).json(patient);
        });
};

const getPatientHistory = function (req, res) {
    medication.find({patientId: req.params.patientId}, function (err, medications) {
        if (err) {
            res.status(500).json({
                message: err.message
            });
        }

        // medications.checkups.sort(function (a, b) {
        //     return a.date_added.getTime() - b.date_added.getTime()
        // });

        res.status(200).json(medications);
    });
};


const addToMedication = function (req, res) {
    // make isOnMedication of patient to true
    // add medication data
    patient.findOneAndUpdate({
        _id: req.params.patientId,
        isOnMedication: false
    }, {isOnMedication: true}, function (err, patient) {
        if (err) {
            res.status(500).json({
                message: err.message
            });
            return;
        }
        if (!patient) {
            res.status(500).json({'message': 'Patient not found or already on medication'});
            return;
        }
        req.body.end_date = null;
        req.body.checkups[0].date_added = new Date();
        medication.create(req.body, function (err, medicationObj) {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
                return;
            }
            res.status(200).json(medicationObj);
        });
    });
};

const completeMedication = function (req, res) {
    // make isOnMedication false
    // add end date to ongoing medication

    patient.findByIdAndUpdate(req.params.patientId, {isOnMedication: req.body.isOnMedication}, {new: true}, function (err, patient) {
        if (err) {
            res.status(500).json({
                message: err.message
            });
            return;
        }
        medication.findById(req.body.medicationId, function (err, medicationObj) {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
                return;
            }

            if (!medicationObj) {
                res.status(500).json({
                    message: 'Medication Not Found'
                });
                return;
            }

            if (req.body.isOnMedication)
                medicationObj.end_date = null;
            else if (!medicationObj.end_date)
                medicationObj.end_date = new Date();

            medicationObj.save(function (err) {
                if (err) {
                    res.status(500).json({
                        message: err.message
                    });
                    return;
                }

                res.status(200).json(medicationObj);

            });
        })

    });

};

const addDailyUpdates = function (req, res) {
    // add updates to ongoing medications

    medication.findOne({patientId: req.params.patientId, end_date: null}).sort({created_at: -1})
        .exec(function (err, medicationObj) {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
                return;
            }
            req.body.date_added = new Date();
            medicationObj.checkups.push(req.body);
            medicationObj.save(function (err) {
                if (err) {
                    res.status(500).json({
                        message: err.message
                    });
                    return;
                }
                res.status(200).json(medicationObj);
            });
        })

};

module.exports = {
    "find": find,
    "remove": remove,
    "update": update,
    "addToMedication": addToMedication,
    "completeMedication": completeMedication,
    "addDailyUpdates": addDailyUpdates,
    "getPatientHistory": getPatientHistory
};