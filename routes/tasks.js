const express = require("express");
const router = express.Router();
const userStatus = require("../middleware/userStatus");
const authAccess = require("../middleware/authAccess");
const Borrower = require("../models/Borrower");
const Record = require("../models/Record");

// GET checkout page
router.get("/checkout", authAccess, userStatus, (req, res) => {
   res.render("checkout", {
      title: "Checkout Item",
      isLoggedIn: req.isLoggedIn,
   });
});

// POST checkout page
router.post("/checkout", authAccess, userStatus, async (req, res) => {
   let dueDate = new Date();
   const dd = String(dueDate.getDate()).padStart(2, "0");
   const mm = String(dueDate.getMonth() + 2).padStart(2, "0");
   const yyyy = dueDate.getFullYear();
   dueDate = mm + "/" + dd + "/" + yyyy;
   const cardNumber = req.body.cardNumber;
   const recordId = req.body.recordId;
   const user = await Borrower.findOne({ cardNumber: cardNumber });
   const item = await Record.findOne({ recordId: recordId });
   await Record.findByIdAndUpdate(item._id, {
      checkoutStatus: true,
      dueDate: dueDate,
   }).lean();
   await Borrower.findByIdAndUpdate(user._id, {
      $addToSet: {
         records: item._id,
      },
   })
      .populate("records")
      .exec();

   res.redirect("/");
});

// GET discharge page
router.get("/discharge", authAccess, userStatus, (req, res) => {
   res.render("discharge", {
      title: "Discharge Item",
      isLoggedIn: req.isLoggedIn,
   });
});

// POST dischage page
router.post("/discharge", authAccess, userStatus, async (req, res) => {
   const cardNumber = req.body.cardNumber;
   const recordId = req.body.recordId;
   const user = await Borrower.findOne({ cardNumber: cardNumber });
   const item = await Record.findOne({ recordId: recordId });
   await Record.findByIdAndUpdate(item._id, {
      checkoutStatus: false,
      dueDate: null,
   }).lean();
   await Borrower.findByIdAndUpdate(user._id, {
      $pull: {
         records: item._id,
      },
   })
      .populate("records")
      .lean();

   res.redirect("/");
});

module.exports = router;
