const express = require("express");
const router = express.Router();
const userStatus = require("../middleware/userStatus");
const Record = require("../models/Record");

// GET home page
router.get("/", userStatus, async (req, res) => {
   const records = await Record.find().lean().sort({ recordId: "asc" });
   res.render("index", { title: "Home", isLoggedIn: req.isLoggedIn, records });
});

// GET search page
router.get("/search", userStatus, async (req, res) => {
   if (!req.query.search) {
      records = await Record.find().lean().sort({ recordId: "asc" });
   } else {
      let searchStr = req.query.search;
      const regex = new RegExp(searchStr, "i");
      records = await Record.find({
         $or: [
            { title: { $regex: regex } },
            { author: { $regex: regex } },
            { subject: { $regex: regex } },
            { format: { $regex: regex } },
            { classification: { $regex: regex } },
            { description: { $regex: regex } },
         ],
      }).lean();
   }
   res.render("index", { isLoggedIn: req.isLoggedIn, records });
});

// GET about page
router.get("/about", userStatus, (req, res) => {
   res.render("about", { title: "About", isLoggedIn: req.isLoggedIn });
});

// GET logout page
router.get("/logout", (req, res) => {
   res.clearCookie("access_token");
   res.redirect("/");
});

module.exports = router;
