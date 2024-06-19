import { validationResult } from "express-validator";
import Users from "../models/Users";
import { Request,Response,NextFunction } from "express";
import bcrypt from "bcrypt";


export const signUp_firstPage = function (req:Request, res:Response, next:NextFunction) {
  res.render("signUp", {
    title: "Sign Up Page",
    errors: null,
  });
};

export const signUp_Checking = async (req:Request, res:Response, next:NextFunction) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;
  const saltRounds=10;

  

  try {
    const hashedPassword=await bcrypt.hash(password, saltRounds);

    const newUser = await new Users({
      fullName: fullName,
      email: email,
      password: hashedPassword,
      membership: false,
      isAdmin: false,
    });

    await newUser.save();
    req.login(newUser, function (err:any) {
      if (err) next(err);
      res.redirect("dashboard");
    });
    return;
  } catch (erorr:any) {
    res.render("signUp", { title:"Sign Up",errors: { msg: erorr.message } });
  }
};

export const checkIfFieldsAreCorrect = (req:Request, res:Response, next:NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("logIn", { errors: errors.array() });
  }

  next();
};
