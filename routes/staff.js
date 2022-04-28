const express = require("express");
const router = express.Router();
const userStatus = require("../middleware/userStatus");
const authAccess = require("../middleware/authAccess");

// GET staff page
router.get("/staff", authAccess, userStatus, (req, res) => {
   res.render("staff", { title: "Staff", isLoggedIn: req.isLoggedIn });
});

module.exports = router;
