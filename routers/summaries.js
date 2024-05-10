const express = require('express');
const router = express.Router();
const summaryController = require("../controllers/summariesController");

router.get("/summaries/:summaryId", summaryController.getSummariesForUser);


module.exports = router;