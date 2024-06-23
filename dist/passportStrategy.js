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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const Users_1 = __importDefault(require("./models/Users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
passport_1.default.serializeUser(function (user, done) {
    done(null, user._id);
});
passport_1.default.deserializeUser(function (id, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userFound = yield Users_1.default.findOne({ _id: id });
            done(null, userFound);
        }
        catch (err) {
            done(err);
        }
    });
});
passport_1.default.use("local", new passport_local_1.Strategy({ usernameField: "email" }, (emailFromBody, passwordFromBody, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFound = yield Users_1.default.findOne({ email: emailFromBody });
        if (!userFound)
            throw new Error("user not found");
        const didItMatch = yield bcrypt_1.default.compare(passwordFromBody, userFound.password.toString());
        if (!didItMatch)
            throw new Error("wrong password");
        done(null, userFound);
    }
    catch (err) {
        done(err, undefined);
    }
})));
