require("dotenv").config();
const router = require("express").Router();
const User = require("../models/User");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation.js");

router.post("/register", async (req, res) => {
  //validate user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if user(email) pre-present
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const registerUser = await new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await registerUser.save();
    res.send({
      user: registerUser._id,
    });
  } catch (err) {
    res.status(400).send(err.message || err);
  }
});

router.post("/login", async (req, res) => {
  //validate user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userExist = await User.findOne({ email: req.body.email });
  if (!userExist) return res.status(400).send("Email doesn't exists");

  //Password verfication
  const validPass = await bcrypt.compare(req.body.password, userExist.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //create and assign JWT
  const token = JWT.sign(
    {
      _id: userExist._id,
    },
    `${process.env.TOKEN_SECRET}`
  );

  //identifier followed by the token we made
  res.header("auth-token", token).send(token);
});

module.exports = router;
