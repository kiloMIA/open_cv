const express = require("express");
const router = express.Router();
const path = require('path');
// const createUser = require('../controllers/userController')

router
    .route("/")
    .get((req, res) => res.render(path.resolve("views/register.ejs")))
    .post((req, res) => res.send("POST"))
module.exports = router;