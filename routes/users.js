const router = require('express').Router();

router.get('/', (req, res) => res.send('Hello World from User'));

module.exports = router;