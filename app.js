const express = require("express");
const cors = require("cors");
const app = express();

const mail = require('./Routes/mail-router');
require("dotenv").config();
const port = process.env.PORT || 3000;

//cors middleware
    // global cors policy
    app.UseCors(builder => builder
        .AllowAnyHeader()
        .AllowAnyMethod()
        .SetIsOriginAllowed((host) => true)
        .AllowCredentials()
    );
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


// const client =require('./routes/client');


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