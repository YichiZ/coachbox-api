const router = require('express').Router();
const Authorize = require('../middleware/Authorize');

router.get('/', (req, res) => res.send('This api is running'));

router.get('/isAuthorized', Authorize, (req, res) =>
    res.send({ message: "The Api is authorized", ...req.jwtPayload }));

module.exports = router;
