"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const express_1 = require("express");
const logInController_1 = require("../controller/logInController");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get("/", logInController_1.logIn_firstPage);
router.post("/", [
    (0, express_validator_1.body)("email", "Email Is Empty").not().isEmpty(),
    (0, express_validator_1.body)("password", "Password Is Empty").not().isEmpty(),
    (0, express_validator_1.body)("confirmPassword", "Confirm Password Is Empty")
        .not()
        .isEmpty(),
], logInController_1.checkIfFieldsAreCorrect, logInController_1.logIn_auth);
exports.default = router;
