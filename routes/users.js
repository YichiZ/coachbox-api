const router = require('express').Router();

router.get('/', (req, res) => res.send('Hello World from User'));

router.post('/', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

module.exports = router;