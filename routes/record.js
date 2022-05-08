const express = require("express");
const router = express.Router();
const userStatus = require("../middleware/userStatus");
const authAccess = require("../middleware/authAccess");
const Record = require("../models/Record");

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
         res.redirect("/staff/record/addRecord");
      } else {
         res.redirect("/staff/record/viewRecord");
      }
   });
   console.log("New record is", newRecord);
});

// GET display record info page
router.get("/viewRecord", authAccess, userStatus, (req, res) => {
   res.render("viewRecord", {
      title: "View Record Info",
      isLoggedIn: req.isLoggedIn,
   });
});

// GET display record info by recordId page
router.get("/recordDetails", authAccess, userStatus, async (req, res) => {
   const recordId = req.query.recordId;
   console.log(recordId);
   const record = await Record.findOne({ recordId: recordId }).lean();
   res.render("recordDetails", {
      title: "Record Details",
      isLoggedIn: req.isLoggedIn,
      record,
   });
});

// GET edit record page
router.get("/editRecord:id", authAccess, userStatus, async (req, res) => {
   const id = req.params.id;
   const record = await Record.findOne({ _id: id }).lean();
   res.render("editRecord", {
      title: "Edit Record",
      isLoggedIn: req.isLoggedIn,
      record,
   });
});

// POST edit record page
router.post("/editRecord:id", authAccess, userStatus, async (req, res) => {
   const id = req.params.id;
   const editRecord = {
      recordId: req.body.recordId,
      title: req.body.title,
      author: req.body.author,
      subject: req.body.subject,
      format: req.body.format,
      classification: req.body.classification,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      checkoutStatus: req.body.checkoutStatus,
   };
   Record.findByIdAndUpdate(id, editRecord, () => {
      console.log("the record has been edited");
   }).lean();
   res.redirect("/staff/record/viewRecord");
});

// GET delete record page
router.get("/deleteRecord:id", authAccess, userStatus, async (req, res) => {
   const id = req.params.id;
   const record = await Record.findOne({ _id: id }).lean();
   res.render("deleteRecord", {
      title: "Delete Record",
      isLoggedIn: req.isLoggedIn,
      record,
   });
});

// POST delete record page
router.post("/deleteRecord:id", authAccess, userStatus, async (req, res) => {
   const id = req.params.id;
   Record.findByIdAndDelete(id, () => {
      console.log("the record has been deleted");
   }).lean();

   res.redirect("/staff/record/viewRecord");
});

module.exports = router;
