const express = require("express");
const router = express.Router();
const User = require("../model/User");
const isAuth = require("../middleware/isAuth");

//get currently logged in user data

router.get("/", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ fail: "Something went wrong.Please try again later.", error });
  }
});

module.exports = router;
