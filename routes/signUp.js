var express = require("express");
const Users = require("../models/Users");
var router = express.Router();

/* GET signUp page. */
router.get("/", function (req, res, next) {
  res.render("signUp", {
    title: "Sign Up Page",
    wrongPassword: false,
    fieldNotFilled: false,
  });
});

router.post("/", async (req, res, next) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  const checkFieldFilled = (fullName, email, password, confirmPassword) =>
    fullName === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === "";

  if (password !== confirmPassword) {
    res.render("signUp", returnJsonObject("Sign Up Page", true, false));
  } else if (checkFieldFilled(fullName, email, password, confirmPassword)) {
    res.render("signUp", returnJsonObject("Sign Up Page", false, true));
  } else {
    try {
      const newUser = await new Users({
        fullName: fullName,
        email: email,
        password: password,
        membership: false,
        isAdmin: false,
      });

      await newUser.save();
      res.send("success");
    } catch (err) {
      console.log("error: ", err);
    }
  }
});

const returnJsonObject = (title, wrongPassword, fieldNotFilled) => ({
  title,
  wrongPassword,
  fieldNotFilled,
});

//

module.exports = router;
