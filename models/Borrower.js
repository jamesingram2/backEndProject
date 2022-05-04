const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Record = require("./Record");

const BorrowerSchema = new mongoose.Schema({
   cardNumber: {
      type: String,
      required: true,
      unique: true,
   },
   pin: {
      type: String,
      required: true,
   },
   fname: {
      type: String,
      required: true,
   },
   minit: {
      type: String,
   },
   lname: {
      type: String,
      required: true,
   },
   dob: {
      type: Date,
      required: true,
   },
   add1: {
      type: String,
      required: true,
   },
   add2: {
      type: String,
   },
   city: {
      type: String,
      required: true,
   },
   state: {
      type: String,
      required: true,
   },
   zip: {
      type: String,
      required: true,
   },
   phone: {
      type: String,
      required: true,
   },
   email: {
      type: String,
   },
   records: [{ type: "ObjectId", ref: "Record" }],
});

const Borrower = mongoose.model("Borrower", BorrowerSchema);
module.exports = Borrower;
