const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecordSchema = new mongoose.Schema({
   recordId: {
      type: String,
      required: true,
      unique: true,
   },
   title: {
      type: String,
      required: true,
   },
   author: {
      type: String,
      required: true,
   },
   subject: {
      type: String,
      required: true,
   },
   format: {
      type: String,
      required: true,
   },
   classification: {
      type: String,
      required: true,
   },
   description: {
      type: String,
   },
   imageUrl: {
      type: String,
   },
   checkoutStatus: {
      type: Boolean,
      required: true,
   },
   dueDate: {
      type: String,
   },
   borrower: { type: Schema.Types.ObjectId, ref: "Borrower" },
});

const Record = mongoose.model("Record", RecordSchema);
module.exports = Record;
