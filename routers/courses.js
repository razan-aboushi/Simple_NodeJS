const express = require("express");
const router = express.Router();
const getPostsController = require('../controllers/coursesController');


router.get(`/courses/:courseId`, getPostsController.getCourseData);

module.exports = router;
