import express from "express"
import {dashboard_firstPage,dashboard_createNewMessage} from "../controller/dashboardController";

const router = express.Router();

router.get("/", dashboard_firstPage);
router.post("/createNewMessage",dashboard_createNewMessage)

export default router;