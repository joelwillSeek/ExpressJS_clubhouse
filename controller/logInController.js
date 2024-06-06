const validator = require("express-validator").validationResult;
const passport = require("passport");

exports.logIn_auth = passport.authenticate("local", function (err, user, info) {
  if (err) {
    return next(err);
  }
  if (!user) {
    return res.render("logIn", { errors: { msg: info.message } });
  }
  req.login(user, function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect("/dashboard");
  });
});

exports.logIn_firstPage = (req, res) => {
  res.render("logIn", { errors: null });
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
