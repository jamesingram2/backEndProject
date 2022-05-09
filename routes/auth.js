const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = +process.env.SALT;
const jwt = require("jsonwebtoken");
const userStatus = require("../middleware/userStatus");
const User = require("../models/User");
const authAccess = require("../middleware/authAccess");

// GET registration page
router.get("/register", userStatus, (req, res) => {
   res.render("register", { title: "Register", isLoggedIn: req.isLoggedIn });
});

// POST registration page
router.post("/register", async (req, res) => {
   const { username, password, repeatPassword, fname, lname, title } = req.body;
   if (password !== repeatPassword) {
      res.send("Passwords do not match");
   } else {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = new User({
         username,
         password: hash,
         fname,
         lname,
         title,
      });
      newUser.save((err) => {
         if (err) {
            console.log(err);
            res.redirect("/register");
         } else {
            res.redirect("/login");
         }
      });
   }
});

// GET Login Page
router.get("/login", userStatus, (req, res) => {
   res.render("login", { title: "Login", isLoggedIn: req.isLoggedIn });
});

// POST login page
router.post("/login", async (req, res) => {
   const { username, password } = req.body;
   const user = await User.findOne({ username });
   const status = await bcrypt.compare(password, user.password);
   console.log("Status is:", status);

   if (status) {
      // generate token
      const token = jwt.sign(
         { id: user._id, username: user.username },
         process.env.SECRET
      );
      res.cookie("access_token", token);
   } else {
      console.log("Invalid Login");
   }
   res.redirect("/");
});

// GET Account page
router.get("/account", authAccess, userStatus, async (req, res) => {
   res.render("account", { title: "Account", isLoggedIn: req.isLoggedIn });
});

module.exports = router;
