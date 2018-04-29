const express = require('express');
const router = express.Router();
const authsvc = require('../access_auth');
const nurseController = require('../controllers/nurse.controller');

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

router.get('/:nurseId/patients', nurseController.findPatients);

router.get('/:nurseId/patients-on-medication', nurseController.findPatientsOnMedication);

module.exports = router;