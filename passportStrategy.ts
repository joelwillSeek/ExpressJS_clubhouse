import passport from "passport"
import { Strategy } from "passport-local";
import Users from "./models/Users";
import bcryptMe from "bcrypt"

passport.serializeUser(function (user:any, done) {
  done(null, user._id);
});

passport.deserializeUser(async function (id:string, done) {
  try {
    const userFound = await Users.findOne({ _id: id });
    done(null, userFound);
  } catch (err) {
    done(err);
  }
});

passport.use("local",
  new Strategy(
    { usernameField: "email" },
    async (emailFromBody, passwordFromBody, done) => { 
      try {
        const userFound = await Users.findOne(
          { email: emailFromBody }
        );
        if (!userFound) throw new Error("user not found");

        
        const didItMatch =await bcryptMe.compare(passwordFromBody,userFound.password.toString())
        if (!didItMatch)
          throw new Error("wrong password");

        done(null, userFound);
      } catch (err) {
        done(err,undefined);
      }
    }
  )
);
