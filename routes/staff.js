const express = require("express");
const router = express.Router();
const userStatus = require("../middleware/userStatus");
const authAccess = require("../middleware/authAccess");
const Borrower = require("../models/Borrower");
const Record = require("../models/Record");

// GET staff page
router.get("/", authAccess, userStatus, (req, res) => {
   res.render("staff", { title: "Staff", isLoggedIn: req.isLoggedIn });
});

// GET display borrower info page
router.get("/viewBorrower", authAccess, userStatus, (req, res) => {
   res.render("viewBorrower", {
      title: "View Borrower Info",
      isLoggedIn: req.isLoggedIn,
   });
});

// GET display borrower info by cardNumber page
router.get("/borrowerDetails", authAccess, userStatus, async (req, res) => {
   const borrowers = await Borrower.find().lean();
   res.render("borrowerDetails", {
      title: "Borrower Details",
      isLoggedIn: req.isLoggedIn,
      borrowers,
   });
});

// GET register borrower page
router.get("/register", authAccess, userStatus, (req, res) => {
   res.render("registerBorrower", {
      title: "Register Borrower",
      isLoggedIn: req.isLoggedIn,
   });
});

// POST register borrower page
router.post("/register", authAccess, userStatus, async (req, res) => {
   const {
      cardNumber,
      pin,
      fname,
      minit,
      lname,
      dob,
      add1,
      add2,
      city,
      state,
      zip,
      phone,
      email,
   } = req.body;
   const newBorrower = new Borrower({
      cardNumber: req.body.cardNumber,
      pin: req.body.pin,
      fname: req.body.fname,
      minit: req.body.minit,
      lname: req.body.lname,
      dob: req.body.dob,
      add1: req.body.add1,
      add2: req.body.add2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      phone: req.body.phone,
      email: req.body.email,
      records: [],
   });
   await newBorrower.save((err) => {
      if (err) {
         console.log(err);
      } else {
         res.redirect("/staff");
      }
   });
   console.log("New borrower is", newBorrower);
});

// GET Add a record page
router.get("/addRecord", authAccess, userStatus, async (req, res) => {
   res.render("addRecord", {
      title: "Add a Record",
      isLoggedIn: req.isLoggedIn,
   });
});

// POST Add a record page
router.post("/addRecord", authAccess, userStatus, async (req, res) => {
   const {
      recordId,
      title,
      author,
      subject,
      format,
      classification,
      description,
      imageUrl,
      checkoutStatus,
   } = req.body;
   const newRecord = new Record({
      recordId: req.body.recordId,
      title: req.body.title,
      author: req.body.author,
      subject: req.body.subject,
      format: req.body.format,
      classification: req.body.classification,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      checkoutStatus: req.body.checkoutStatus,
   });
   await newRecord.save((err) => {
      if (err) {
         console.log(err);
         res.redirect("/addRecord");
      } else {
         res.redirect("/staff");
      }
   });
   console.log("New record is", newRecord);
});

module.exports = router;
