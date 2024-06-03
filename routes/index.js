var express = require("express");
var router = express.Router();

/* GET signUp page. */
router.get("/", function (req, res, next) {
  res.render("signUp", { title: "Sign Up Page" });
});

router.post("/", (req, res, next) => {});

//

module.exports = router;
