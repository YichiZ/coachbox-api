const router = require('express').Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    const users = await User.find()
        .exec()
        .then()

    res.status(200).json(users);
});

router.get('/:id', async (req, res) => {
    const email = req.params['id'];

    const user = await User.findOne({email})
        .exec()
        .catch(err => console.log(err));

    user ? res.status(200).json(user) : res.sendStatus(404);    
});

router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email
    });

    const response = await user.save()
        .catch(err => console.log(err));

    res.status(201).json(response);
});

module.exports = router;
