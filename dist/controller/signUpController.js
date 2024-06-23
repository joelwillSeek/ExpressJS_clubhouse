"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfFieldsAreCorrect = exports.signUp_Checking = exports.signUp_firstPage = void 0;
const express_validator_1 = require("express-validator");
const Users_1 = __importDefault(require("../models/Users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const MEMBERSHIP_KEY = "please";
const ADMIN_CODE = "admin";
const signUp_firstPage = function (req, res, next) {
    res.render("signUp", {
        title: "Sign Up Page",
        errors: null,
    });
};
exports.signUp_firstPage = signUp_firstPage;
const signUp_Checking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;
    const membershipSecretKey = req.body.secretKey;
    const adminSecretCode = req.body.adminCode;
    const saltRounds = 10;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const newUser = yield new Users_1.default({
            fullName: fullName,
            email: email,
            password: hashedPassword,
            membership: membershipSecretKey.toString().trim() == MEMBERSHIP_KEY || adminSecretCode == ADMIN_CODE ? true : false,
            isAdmin: adminSecretCode == ADMIN_CODE ? true : false,
        });
        yield newUser.save();
        req.login(newUser, function (err) {
            if (err)
                next(err);
            console.log("when to dashboard");
            res.redirect("dashboard");
        });
        return;
    }
    catch (erorr) {
        res.render("signUp", { title: "Sign Up", errors: { msg: erorr.message } });
    }
});
exports.signUp_Checking = signUp_Checking;
const checkIfFieldsAreCorrect = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.render("logIn", { errors: errors.array() });
    }
    next();
};
exports.checkIfFieldsAreCorrect = checkIfFieldsAreCorrect;
