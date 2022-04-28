const express = require("express");
const router = express.Router();
const userStatus = require("../middleware/userStatus");

// GET home page
router.get("/", userStatus, (req, res) => {
   res.render("index", { title: "Home", isLoggedIn: req.isLoggedIn });
});

// GET about page
router.get("/about", userStatus, (req, res) => {
   res.render("about", { title: "About", isLoggedIn: req.isLoggedIn });
});

// GET logout page
router.get("/logout", (req, res) => {
   res.clearCookie("access_token");
   res.redirect("/");
});

module.exports = router;
