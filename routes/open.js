const express = require("express");
const router = express.Router();
const path = require("path");
const app = express();

app.get('/open',(req, res, next) => {
    res.render(__dirname+'/views/open')
})

router
    .route("/")
    .get((req, res) => res.render(path.resolve('views/open.ejs')))
    .post((req, res) => res.send("POST"));
module.exports = router;