const express = require('express');
const router = express.Router();
const authsvc = require('../access_auth');
const alertController = require('../controllers/alert.controller');

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

router.get('/:nurseId', alertController.getAlerts);

router.post('/add', alertController.addAlerts);

module.exports = router;