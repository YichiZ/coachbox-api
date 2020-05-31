const router = require('express').Router();

router.get('/', (req, res) => res.send('This api is running'));

module.exports = router;
