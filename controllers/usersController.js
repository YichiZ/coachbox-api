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
        .then()
        .catch(err => console.log(err));

    user ? res.status(200).json(user) : res.sendStatus(404);    
}

const createItem = async (req) => {
    return new Promise((resolve, reject) => {
        const user = new User({
            name: 'Yichi',
            email: 'yichi@mail.com'
        });
        user.save((err, item) => {
            if (err) {
                reject({code: 422, message: err.message})
            }
            resolve(item.toObject());
        })
    });
};

exports.createItem = async (req, res) => {
    const item = await createItem(req);
    console.log(item);
    res.status(201).json(item);
}