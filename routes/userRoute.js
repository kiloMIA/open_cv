const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router();
router

    .get("/", userController.find)
    .get('/:id', userController.findOne)
    .patch('/:id', userController.update)
    .delete('/:id', userController.destroy);
module.exports = router