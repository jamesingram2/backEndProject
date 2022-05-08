const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Record = require("./Record");

const BorrowerSchema = new mongoose.Schema({
   cardNumber: {
      type: String,
      required: true,
      unique: true,
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
   records: [{ type: Schema.Types.ObjectId, ref: "Record" }],
});

const Borrower = mongoose.model("Borrower", BorrowerSchema);
module.exports = Borrower;
