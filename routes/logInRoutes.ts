// imports
import  {Router} from "express";
import {logIn_firstPage,logIn_auth,checkIfFieldsAreCorrect} from "../controller/logInController"
import { body } from "express-validator";

const router = Router();

router.get("/", logIn_firstPage);

router.post(
  "/",
  [
    body("email", "Email Is Empty").not().isEmpty(),
    body("password", "Password Is Empty").not().isEmpty(),
    body("confirmPassword", "Confirm Password Is Empty")
      .not()
      .isEmpty(),
  ],
  checkIfFieldsAreCorrect,
  logIn_auth
);

export default router;