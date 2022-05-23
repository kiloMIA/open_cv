const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")
const path = require('path');

router
    .route("/")
    .get((req, res) => res.render(path.resolve("views/login.ejs")))
    .post(userController.logout)
module.exports = router;