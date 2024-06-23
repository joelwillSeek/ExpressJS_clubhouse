"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signUpController_1 = require("../controller/signUpController");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
/* GET signUp page. */
router.get("/", signUpController_1.signUp_firstPage);
router.post("/", [
    (0, express_validator_1.body)("fullName", "Full Name Is Empty").not().isEmpty(),
    (0, express_validator_1.body)("email", "Email Is Empty").not().isEmpty(),
    (0, express_validator_1.body)("password", "Password Is Empty").not().isEmpty(),
    (0, express_validator_1.body)("confirmPassword", "Confirm Password Is Empty")
        .not()
        .isEmpty(),
], signUpController_1.checkIfFieldsAreCorrect, signUpController_1.signUp_Checking);
exports.default = router;
