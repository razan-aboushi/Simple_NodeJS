const express = require("express");
const router = express.Router();
const getPostsController = require('../controllers/coursesController');


router.get(`/courses/:courseId`, getPostsController.getCourseData);

router.get('/filtered-courses', getPostsController.getCoursesBasedOnFilter);

module.exports = router;
