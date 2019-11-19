const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { validateLogin } = require("../utilities/validators");

router.post("/", async (req, res) => {
  //validate input
  const { valid, errors } = validateLogin(req.body);
  if (!valid) return res.status(400).json(errors);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ errorMsg: "Wrong credentials." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ errorMsg: "Wrong credentials." });

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
          success: `You have succesfully logged in, ${user.name}!`
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      errorMsg: "Something went wrong. Please try again.",
      error
    });
  }
});

module.exports = router;
