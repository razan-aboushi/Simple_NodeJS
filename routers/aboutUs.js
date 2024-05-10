const express = require('express');
const router = express.Router();
const aboutUsController = require("../controllers/aboutUsController");



router.get("/aboutUs" , aboutUsController.aboutUsGet)


module.exports = router;