// imports
const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator");
const Users = require("../models/Users");
const bodyValidator = expressValidator.body;
const validator = expressValidator.validationResult;
const passport = require("passport");
const {
  logIn_firstPage,
  logIn_auth,
  checkIfFieldsAreCorrect,
} = require("../controller/logInController");

router.get("/", logIn_firstPage);

router.post(
  "/",
  [
    bodyValidator("email", "Email Is Empty").not().isEmpty(),
    bodyValidator("password", "Password Is Empty").not().isEmpty(),
    bodyValidator("confirmPassword", "Confirm Password Is Empty")
      .not()
      .isEmpty(),
  ],
  checkIfFieldsAreCorrect,
  logIn_auth
);

module.exports = router;
