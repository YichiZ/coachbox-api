const User = require('../models/User');

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