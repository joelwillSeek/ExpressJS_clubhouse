const express = require("express");
const { dashboard_firstPage } = require("../controller/dashboardController");
const router = express.Router();

router.get("/", dashboard_firstPage);

module.exports = router;
