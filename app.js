const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

//cors middleware
app.use(cors({
    origin: '*'
}));
app.use(
    express.urlencoded({
        extended: false,
        limit: "20mb",
    })
);
app.use(
    express.json({
        limit: "20mb",
    })
);


const mail = require('./Routes/mail-router');

//cors middleware
app.use(cors({
    origin: '*'
}));
app.use("/mail", mail);

app.get("/", (req, res) => {
    res.send("ok");
});

//error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({
        error: true,
        message: "Internal Server Error",
        details: err,
    });
});


app.listen(port, () => {
    console.log(`App is Running on port ${port}`)
})