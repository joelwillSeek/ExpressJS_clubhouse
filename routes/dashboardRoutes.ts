import express from "express"
import {dashboard_firstPage,dashboard_createNewMessage, dashboard_deleteMessage, dashboard_logOut} from "../controller/dashboardController";

const router = express.Router();

router.get("/", dashboard_firstPage);
router.post("/createNewMessage",dashboard_createNewMessage)
router.post("/deleteMessageAdmin",dashboard_deleteMessage)
router.get("/logOut",dashboard_logOut)

export default router;