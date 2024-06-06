const passport = require("passport");
const Users = require("./models/Users");
const localStrategy = require("passport-local").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user._id);
});
passport.deserializeUser(async function (id, done) {
  try {
    const userFound = await Users.findOne({ _id: id });
    done(null, userFound);
  } catch (err) {
    done(err);
  }
});
passport.use(
  new localStrategy(
    { usernameField: "email" },
    async (emailFromBody, passwordFromBody, done) => {
      try {
        const userFound = await Users.findOne(
          { email: emailFromBody },
          (err, user) => user
        );
        if (!userFound) throw new Error("user not found");

        if (userFound.password != passwordFromBody)
          throw new Error("wrong password");

        done(null, userFound);
      } catch (err) {
        done(err, null);
      }

      // Users.findOne({ email: username }, (err, user) => {
      //   if (err) {
      //     return done(err);
      //   }
      //   if (!user) {
      //     return done(null, false);
      //   }
      //   if (user.password != password) {
      //     return done(null, false);
      //   }
      //   return done(null, user);
      // });
    }
  )
);
