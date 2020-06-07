const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/register', function (req, res) {
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) {
            return res.status(403).send(err);
        }
        var userModel = {
            name: req.body.name,
            email: req.body.email,
            password: hash
        }

        User.create(userModel, function (err, user) {
            if (err) {
                return res.sendStatus(403);
            }
            // Create a token
            var token = jwt.sign(userModel, process.env.SECRET, {
                expiresIn: 86400 // in seconds
            });
            res.status(200).send({ auth: true, token: token });
        });
    });
});

router.get('/me', function (req, res) {
    var token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }

        res.status(200).send(decoded);
    });
});

router.post('/login', function(req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.sendStatus(500);
        if (!user) return res.sendStatus(404);

        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordValid) return res.sendStatus(401);

        const token = jwt.sign({id: user._id, email: user.email }, process.env.SECRET, { expiresIn: 86400 });

        res.status(200).send({token});
    })
});

module.exports = router;