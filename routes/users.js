const router = require('express').Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.getItems);

router.get('/:id', usersController.getItem);

router.post('/', usersController.createItem);

module.exports = router;