"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboardController_1 = require("../controller/dashboardController");
const router = express_1.default.Router();
router.get("/", dashboardController_1.dashboard_firstPage);
router.post("/createNewMessage", dashboardController_1.dashboard_createNewMessage);
router.post("/deleteMessageAdmin", dashboardController_1.dashboard_deleteMessage);
router.get("/logOut", dashboardController_1.dashboard_logOut);
exports.default = router;
