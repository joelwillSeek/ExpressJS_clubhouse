const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator");
const bodyValidator = expressValidator.body;
const passport = require("passport");

const {
  signUp_firstPage,
  signUp_Checking,
  checkIfFieldsAreCorrect,
} = require("../controller/signUpController");

/* GET signUp page. */
router.get("/", signUp_firstPage);

router.post(
  "/",
  [
    bodyValidator("fullName", "Full Name Is Empty").not().isEmpty(),
    bodyValidator("email", "Email Is Empty").not().isEmpty(),
    bodyValidator("password", "Password Is Empty").not().isEmpty(),
    bodyValidator("confirmPassword", "Confirm Password Is Empty")
      .not()
      .isEmpty(),
  ],
  checkIfFieldsAreCorrect,
  signUp_Checking
);

module.exports = router;
