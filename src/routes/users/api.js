const express = require('express');
const router = express.Router();
const userController = require('./control');

// CRUD routes

router.post('/create', userController.createUser);
router.post('/login', userController.userLogin); 
router.get('/all', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
module.exports = router;
