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
exports.dashboard_deleteMessage = exports.dashboard_logOut = exports.dashboard_createNewMessage = exports.dashboard_firstPage = void 0;
const Messages_1 = __importDefault(require("../models/Messages"));
const date_fns_1 = require("date-fns");
const dashboard_firstPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //author firstname can be accessed by msg.author.fullName
    const allMessages = yield Messages_1.default.find({}, "timeStamp description author _id").populate("author");
    console.log(allMessages);
    if (req.user == undefined)
        return res.redirect("/logIn");
    return res.render("dashboard", {
        user: req.user,
        msg: allMessages,
        error: null,
    });
});
exports.dashboard_firstPage = dashboard_firstPage;
const dashboard_createNewMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.isAuthenticated())
        return res.redirect("/login");
    try {
        const message = req.body.messageValue;
        const formatedCurrentDate = (0, date_fns_1.format)(new Date(), "dd/mm/yy");
        console.log("here: ", formatedCurrentDate, message);
        const newMessageCreated = yield new Messages_1.default({
            timeStamp: formatedCurrentDate,
            description: message,
            author: req.user.id,
        });
        yield newMessageCreated.save();
        return res.redirect("/dashboard");
    }
    catch (err) {
        return res.render("error", { locals: { message: err } });
    }
});
exports.dashboard_createNewMessage = dashboard_createNewMessage;
const dashboard_logOut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.logOut(err => {
        if (err)
            return next(err);
        res.redirect("/");
    });
});
exports.dashboard_logOut = dashboard_logOut;
const dashboard_deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = req.body.msg;
    try {
        console.log("god so far", message);
        const allMessages = yield Messages_1.default.deleteOne({ description: message.trim() });
        if (allMessages.deletedCount === 1) {
            // Document was successfully deleted
            // Handle further logic if needed
            console.log('Document deleted successfully');
            return res.json({ success: true });
        }
        else {
            // Handle case where no document was deleted (not found)
            console.log('Document not found or not deleted');
        }
    }
    catch (err) {
        return res.render("error", { locals: { message: err } });
    }
});
exports.dashboard_deleteMessage = dashboard_deleteMessage;
