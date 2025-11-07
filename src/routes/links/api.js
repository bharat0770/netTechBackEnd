const express = require('express');
const router = express.Router();
const linkController = require('./control');
const adminCheck = require("../../middlware/auth");

// CRUD routes
router.post('/create',  linkController.createLink);

router.get('/all', linkController.getAllLinks);
router.get('/:id', linkController.getLinkById);
router.put('/:id', linkController.updateLink);
router.delete('/:id', linkController.deleteLink);

module.exports = router;
