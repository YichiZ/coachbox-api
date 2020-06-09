const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    const saltRounds = 10;
    const password = await bcrypt.hash(req.body.password, saltRounds);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password
    })

    const response = await user.save()
        .catch(err => res.status(500).send(err));

    var token = jwt.sign({ email: response.email, name: user.name }, process.env.SECRET, { expiresIn: 86400 });

    res.send({token});
});

router.get('/me', (req, res) => {
    var token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }

        res.status(200).send(decoded);
    });
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email})
        .exec()
        .catch(err => res.send(500).send(err));

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) return res.send(401).send({ error: "Password does not match" });

    const token = jwt.sign({ email: user.email, name: user.name }, process.env.SECRET, { expiresIn: 86400 });

    res.status(200).send({ token });    
});

module.exports = router;