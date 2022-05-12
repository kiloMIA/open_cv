const express = require('express');
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const port = 3000
app.set('view engine','ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", require("./routes/root"));
app.use("/personal",require("./routes/personal"));
app.use("/builder",require("./routes/builder"));
app.use("/open",require("./routes/open"));
app.use("/personal",require("./routes/personal"));
app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});

