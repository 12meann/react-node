const express = require("express");
const router = express.Router();
const User = require("../model/User");
const { validate } = require("../utilities/validators");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  const { valid, errors } = validate(req.body);
  if (!valid) return res.status(400).json(errors);
  const { password, email, name } = req.body;
  try {
    //check if already registered in DB
    const oldUser = await User.findOne({ email });
    if (oldUser) res.status(400).json({ email: "User already exists" });
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      password: hashedPassword,
      email,
      name
    });

    //save user in db
    const user = await newUser.save();

    jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          },
          success: `You have succesfully registered. Welcome, ${user.name}!`
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong. Please try again.",
      error
    });
  }
});

module.exports = router;
