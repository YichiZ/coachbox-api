const router = require('express').Router();
const Authorize = require('../middleware/Authorize');

router.get('/', (req, res) => res.send('This api is running'));

router.get('/isAuthorized', Authorize, (req, res) => res.send('This api is authorized'));

module.exports = router;
