const Users = require("../models/Users");
const validator = require("express-validator").validationResult;

exports.signUp_firstPage = function (req, res, next) {
  res.render("signUp", {
    title: "Sign Up Page",
    errors: null,
  });
};

exports.signUp_Checking = async (req, res, next) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const newUser = await new Users({
      fullName: fullName,
      email: email,
      password: password,
      membership: false,
      isAdmin: false,
    });

    await newUser.save();
    req.login(newUser, function (err) {
      if (err) next(err);
      res.redirect("dashboard");
    });
    return;
  } catch (err) {
    res.render("signUp", { errors: { msg: err.message } });
  }
};

exports.checkIfFieldsAreCorrect = (req, res, next) => {
  const errors = validator(req);
  const forDebugging = req.body.confirmPassword;

  if (!errors.isEmpty()) {
    console.log(
      password + " " + forDebugging,
      "There is an error on the way you filed the fields",
      errors.array()
    );
    return res.render("logIn", { errors: errors.array() });
  }

  next();
};
