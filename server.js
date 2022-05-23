const express = require('express');
const path = require("path");
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser")
const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json')


//  require("dotenv").config();
/*
// DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED")
}).catch(() => {
    console.log("UNABLE to connect to DB")
})
*/
const port = process.env.PORT || 3000
const dbConfig = require('./config/database.config.js');


// Use parsing middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.set('view engine','ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.use("/", require("./routes/root"));
app.use("/personal",require("./routes/personal"));
app.use("/builder",require("./routes/builder"));
app.use("/open",require("./routes/open"));
app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));
app.use("/logout",require("./routes/logout"))

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

// Starting a server
app.listen(port, () => {
    console.log(`App is running at ${port}`)
})

