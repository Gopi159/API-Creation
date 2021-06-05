const express = require("express");
require("dotenv/config");
require("mongoose");
const productRoute = require("./src/API/Product");
require("./src/Database");
const app = express();
const port = process.env.PORT;

//Parsing data from Body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Import Routes
app.use("/api/v1", productRoute);

app.all("**", (req, res) => {
  res.status(404).json({
    message: "Invalid Route",
    status: 404,
  });
});

//Server Listening
app.listen(port);
