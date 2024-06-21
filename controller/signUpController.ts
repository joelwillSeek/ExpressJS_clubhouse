import { validationResult } from "express-validator";
import Users from "../models/Users";
import { Request,Response,NextFunction } from "express";
import bcrypt from "bcrypt";

const MEMBERSHIP_KEY="please"
const ADMIN_CODE="admin"


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
  const membershipSecretKey:string=req.body.secretKey;
  const adminSecretCode:string=req.body.adminCode;
  const saltRounds=10;

  try {
    const hashedPassword=await bcrypt.hash(password, saltRounds);

    const newUser = await new Users({
      fullName: fullName,
      email: email,
      password: hashedPassword,
      membership: membershipSecretKey.toString().trim()==MEMBERSHIP_KEY||adminSecretCode==ADMIN_CODE? true:false,
      isAdmin: adminSecretCode==ADMIN_CODE?true:false,
    });

    await newUser.save();
    req.login(newUser, function (err:any) {
      if (err) next(err);
      console.log("when to dashboard")
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
