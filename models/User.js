const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   fname: {
      type: String,
      required: true,
   },
   lname: {
      type: String,
      required: true,
   },
   title: {
      type: String,
      required: true,
   },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
