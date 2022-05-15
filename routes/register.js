const express = require("express");
const router = express.Router();
var path = require('path');
const createUser = require('../controllers/userController')
router
    .route("/")
    .get((req, res) => res.render(path.resolve("views/register.ejs")))
    .post(createUser.create)
module.exports = router;