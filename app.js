const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*'
}));
var allowedOrigins = ['http://localhost:3000',
                      'https://zany-plum-millipede-gown.cyclic.app'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
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