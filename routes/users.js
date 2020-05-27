const router = require('express').Router();
const usersController = require('../controllers/usersController');

router.get('/', (req, res) => res.send('Hello World from User'));

router.post('/', usersController.createItem);

module.exports = router;