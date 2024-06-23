"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfFieldsAreCorrect = exports.logIn_firstPage = exports.logIn_auth = void 0;
const express_validator_1 = require("express-validator");
const passport_1 = __importDefault(require("passport"));
const logIn_auth = function (req, res, next) {
    passport_1.default.authenticate("local", function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render("logIn", { errors: { msg: info.message } });
        }
        req.login(user, function (err) {
            if (err) {
                return next(err);
            }
            console.log("going to dashboard");
            return res.redirect("/dashboard");
        });
    })(req, res, next);
};
exports.logIn_auth = logIn_auth;
const logIn_firstPage = (req, res) => {
    res.render("logIn", { errors: null });
};
exports.logIn_firstPage = logIn_firstPage;
const checkIfFieldsAreCorrect = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.render("logIn", { errors: errors.array() });
    }
    next();
};
exports.checkIfFieldsAreCorrect = checkIfFieldsAreCorrect;
