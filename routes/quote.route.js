const express = require('express');
const router = express.Router();
const authsvc = require('../access_auth');
const quoteController = require('../controllers/quote.controller');

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

router.get('/patient/:patientId', quoteController.getTodaysPatientQuote);

router.get('/:nurseId', quoteController.getTodaysNurseQuote);

router.post('/add', quoteController.updateTodaysQuote);

router.get('/remove/:quoteId', quoteController.removeQuote);

module.exports = router;