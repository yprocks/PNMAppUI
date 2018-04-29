const express = require('express');
const router = express.Router();
const authsvc = require('../access_auth');
const patientController = require('../controllers/patient.controller');

router.use('/', function (req, res, next) {
    if (authsvc.verifyToken(req.query.token)) {
        next();
    } else {
        return res.status(401).json({
            title: 'Not Authenticated',
            error: err
        });
    }
});

router.get('/:patientId', patientController.find);

router.get('/remove/:patientId', patientController.remove);

router.get('/history/:patientId', patientController.getPatientHistory);

router.post('/update/:patientId', patientController.update);

router.post('/add-to-medication/:patientId', patientController.addToMedication);

router.post('/complete-medication/:patientId', patientController.completeMedication);

router.post('/add-daily-update/:patientId', patientController.addDailyUpdates);

module.exports = router;