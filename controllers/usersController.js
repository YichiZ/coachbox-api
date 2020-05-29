const User = require('../models/User');

exports.getItems = async (req, res) => {
    const users = await User.find()
        .exec()
        .then()

    res.status(200).json(users);
}

exports.getItem = async (req, res) => {
    const email = req.params['id'];

    const user = await User.findOne({email})
        .exec()
        .catch(err => console.log(err));

    user ? res.status(200).json(user) : res.sendStatus(404);    
}

exports.createItem = async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email
    });

    const response = await user.save()
        .catch(err => console.log(err));

    res.status(201).json(response);
}