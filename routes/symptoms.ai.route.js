const express = require('express');
const router = express.Router();
const authsvc = require('../access_auth');
const symptomsAi = require('../controllers/symptoms.ai.controller');

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

router.post('/ai/diagnose', symptomsAi.diagnoseSymptoms);
router.get('/list', symptomsAi.symptoms);

module.exports = router;