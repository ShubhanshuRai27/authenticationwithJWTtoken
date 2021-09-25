const router = require("express").Router();
const User = require("../models/User");

//Validate
const Joi = require("@hapi/joi");

const schema = {
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
};

router.post("/register", async (req, res) => {
  //validate data
  const { error } = Joi.validate(req.body, schema);
  if (error) return res.status(400).send(error.details[0].message);

  const registerUser = await new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await registerUser.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err.message || err);
  }
});

router.post("/login", (req, res) => {
  res.send("Login");
});

module.exports = router;
