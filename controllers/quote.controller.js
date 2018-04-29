const patient = require("../model/patient.model");
const quotes = require("../model/quote.model");

const getTodaysPatientQuote = function (req, res) {
    let now = new Date();
    let startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    patient.findById(req.params.patientId, function (err, patient) {
        if (err) {
            res.status(500).json({
                message: err.message
            });
            return;
        }

        if (!patient) {
            res.status(500).json({
                message: err.message
            });
            return;
        }

        quotes.findOne({createdAt: {$gte: startOfToday}, nurseId: patient.nurseId}, function (err, quote) {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
            }
            res.status(200).json(quote);
        });
    });
};

const updateTodaysQuote = function (req, res) {
    let now = new Date();
    let startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    quotes.findOneAndUpdate({createdAt: {$gte: startOfToday}, nurseId: req.body.nurseId}, req.body,
        {upsert: true, new: true}, function (err, quote) {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
            }
            res.status(200).json(quote);
        });
};

const removeQuote = function (req, res) {
    quotes.findByIdAndRemove(req.params.quoteId, function (err, quote) {
        if (err) {
            res.status(500).json({
                message: err.message
            });
        }
        res.status(200).json(quote);
    });
};

const getTodaysNurseQuote = function (req, res) {
    let now = new Date();
    let startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    quotes.findOne({createdAt: {$gte: startOfToday}, nurseId: req.params.nurseId}, function (err, quote) {
        if (err) {
            res.status(500).json({
                message: err.message
            });
        }
        res.status(200).json(quote);
    });
};

module.exports = {
    "getTodaysPatientQuote": getTodaysPatientQuote,
    "getTodaysNurseQuote": getTodaysNurseQuote,
    "updateTodaysQuote": updateTodaysQuote,
    "removeQuote": removeQuote
};