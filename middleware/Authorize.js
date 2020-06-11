const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    var token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'No token provided.' });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        
        req.jwtPayload = decoded;
        next()
    });
}
