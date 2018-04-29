const express = require('express');
const router = express.Router();
const passport = require('passport');
const authsvc = require('../access_auth');

const userController = require('../controllers/user.controller');

router.post('/register', userController.register);

router.post('/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            console.log(err);
            return res.status(400).json({
                message: 'Either username or password is wrong!',
                user: user
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                return res.json(err.message);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = authsvc.createToken({user: user.username});
            user.password = '';
            let nurseId = {};
            let patientId = {};

            fullname = info.name;

            if (info.nurseId) {
                nurseId = info.nurseId;
                return res.json({user, token, nurseId, fullname});
            } else {
                patientId = info.patientId;
                return res.json({user, token, patientId, fullname});
            }
        });
    })(req, res);
});

module.exports = router;