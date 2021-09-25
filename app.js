require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// Import route
const authRoute = require("./routes/auth");

PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());

app.use(cors());
app.use("/api/user", authRoute);

//connect Database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connection established");
  } catch (error) {
    console.error("MongoDB connection failed");
    process.exit(1);
  }
};

connectDB();

//default route
app.get("/", (req, res) => {
  res.send("Homepage is live");
});

//server
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
