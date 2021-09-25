const router = require("express").Router();
const User = require("../models/User");

router.post("/register", (req, res) => {
  const registerUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
});

router.post("/login", (req, res) => {
  res.send("Login");
});

module.exports = router;
