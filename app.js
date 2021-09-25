require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");

PORT = process.env.PORT || 5000;

//middleware
app.use(cors());

//default route
app.get("/", (req, res) => {
  res.send("Homepage is live");
});

//server
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
