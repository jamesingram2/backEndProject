const express = require("express");
const router = express.Router();
const userStatus = require("../middleware/userStatus");
const authAccess = require("../middleware/authAccess");

// GET staff page
router.get("/", authAccess, userStatus, (req, res) => {
   res.render("staff", { title: "Staff", isLoggedIn: req.isLoggedIn });
});

// GET register borrower page
router.get("/register", authAccess, userStatus, (req, res) => {
   res.render("registerBorrower", {
      title: "Register Borrower",
      isLoggedIn: req.isLoggedIn,
   });
});

router.post("/register", (req, res) => {
   res.send("Borrower Registered");
});

module.exports = router;
