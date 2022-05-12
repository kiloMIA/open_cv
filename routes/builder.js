const express = require("express");
const router = express.Router();
const path = require("path");
const app = express();


router
    .route("/")
    .get((req, res) => res.render(path.resolve('views/builder.ejs')))
    .post((req, res) => res.send("POST"));
module.exports = router;