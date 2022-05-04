const express = require("express");
const router = express.Router();
const userStatus = require("../middleware/userStatus");
const Record = require("../models/Record");

// GET home page
router.get("/", userStatus, async (req, res) => {
   const records = await Record.find().lean();
   res.render("index", { title: "Home", isLoggedIn: req.isLoggedIn, records });
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
