const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

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

app.use("/mail", mail);

app.get("/", (req, res) => {
   res.header( 'Access-Control-Allow-Origin', '*')
  res.header( 'Access-Control-Allow-Credentials', true)
  res.header( 'Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header ('Access-Control-Allow-Headers', 'Content-Type')
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