const express = require("express");
const router = express.Router();
const userStatus = require("../middleware/userStatus");
const authAccess = require("../middleware/authAccess");
const Borrower = require("../models/Borrower");
const Record = require("../models/Record");

// GET records reports page
router.get("/records", authAccess, userStatus, async (req, res) => {
   const report = await Record.find().lean().sort({ recordId: "asc" });
   res.render("recordReport", {
      title: "Record Report",
      isLoggedIn: req.isLoggedIn,
      report,
   });
});

// GET checkout reports page
router.get("/checkouts", authAccess, userStatus, async (req, res) => {
   const report = await Record.find({ checkoutStatus: true })
      .lean()
      .sort({ dueDate: "asc", recordId: "asc" });
   res.render("checkoutReport", {
      title: "Checkout Report",
      isLoggedIn: req.isLoggedIn,
      report,
   });
});

// GET borrowers reports page
router.get("/borrowers", authAccess, userStatus, async (req, res) => {
   const report = await Borrower.find().lean().sort({ cardNumber: "asc" });
   res.render("borrowerReport", {
      title: "Borrower Report",
      isLoggedIn: req.isLoggedIn,
      report,
   });
});

module.exports = router;
