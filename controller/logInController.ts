import { NextFunction,Request,Response } from "express";
import { validationResult } from "express-validator";
import passport from "passport";

export const logIn_auth =function (req:Request,res:Response,next:NextFunction){
  passport.authenticate("local", function (err:any, user:any, info:any) {
  if (err) {
    return next(err);
  }
  if (!user) {
    return res.render("logIn", { errors: { msg: info.message } });
  }
  req.login(user, function (err:any) {
    if (err) {
      return next(err);
    }
    console.log("going to dashboard")
    return res.redirect("/dashboard");
  });
})(req,res,next);
};

export const logIn_firstPage = (req:Request, res:Response) => {
  res.render("logIn", { errors: null });
};

export const checkIfFieldsAreCorrect = (req:Request, res:Response, next:NextFunction) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.render("logIn", { errors: errors.array() });
  }

  next();
};
