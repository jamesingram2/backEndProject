const express = require("express");
const router = express.Router();
const userStatus = require("../middleware/userStatus");
const authAccess = require("../middleware/authAccess");
const Borrower = require("../models/Borrower");
const Record = require("../models/Record");

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
      fname,
      minit,
      lname,
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
      fname: req.body.fname,
      minit: req.body.minit,
      lname: req.body.lname,
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
         res.redirect("/staff/borrower/viewBorrower");
      }
   });
   console.log("New borrower is", newBorrower);
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
   const cardNumber = req.query.cardNumber;
   console.log(cardNumber);
   const borrower = await Borrower.findOne({ cardNumber: cardNumber }).lean();
   console.log(borrower.records);
   res.render("borrowerDetails", {
      title: "Borrower Details",
      isLoggedIn: req.isLoggedIn,
      borrower,
   });
});

// GET edit borrower page
router.get("/editBorrower:id", authAccess, userStatus, async (req, res) => {
   const id = req.params.id;
   const borrower = await Borrower.findOne({ _id: id }).lean();
   res.render("editBorrower", {
      title: "Edit Borrower",
      isLoggedIn: req.isLoggedIn,
      borrower,
   });
});

// POST edit borrower page
router.post("/editBorrower:id", authAccess, userStatus, async (req, res) => {
   const id = req.params.id;
   const editBorrower = {
      cardNumber: req.body.cardNumber,
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
   };
   Borrower.findByIdAndUpdate(id, editBorrower, () => {
      console.log("the borrower has been edited");
   }).lean();
   res.redirect("/staff/borrower/viewBorrower");
});

// GET delete borrower page
router.get("/deleteBorrower:id", authAccess, userStatus, async (req, res) => {
   const id = req.params.id;
   const borrower = await Borrower.findOne({ _id: id }).lean();
   res.render("deleteBorrower", {
      title: "Delete Borrower",
      isLoggedIn: req.isLoggedIn,
      borrower,
   });
});

// POST delete borrower page
router.post("/deleteBorrower:id", authAccess, userStatus, async (req, res) => {
   const id = req.params.id;
   Borrower.findByIdAndDelete(id, () => {
      console.log("the borrower has been deleted");
   }).lean();

   res.redirect("/staff/borrower/viewBorrower");
});

module.exports = router;
