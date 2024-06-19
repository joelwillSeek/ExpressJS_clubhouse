import {Router} from "express"
import {signUp_firstPage,signUp_Checking,checkIfFieldsAreCorrect} from "../controller/signUpController"
import { body } from "express-validator";

const router = Router();

/* GET signUp page. */
router.get("/", signUp_firstPage);

router.post(
  "/",
  [
    body("fullName", "Full Name Is Empty").not().isEmpty(),
    body("email", "Email Is Empty").not().isEmpty(),
    body("password", "Password Is Empty").not().isEmpty(),
    body("confirmPassword", "Confirm Password Is Empty")
      .not()
      .isEmpty(),
  ],
  checkIfFieldsAreCorrect,
  signUp_Checking
);

export default router;
