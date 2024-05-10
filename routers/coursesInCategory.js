const express = require('express');
const router = express.Router();
const coursesCatContainer = require("../controllers/categoriesController");


router.get("/categoriesCourses/:categoryId", coursesCatContainer.getCourseInCategory);


module.exports = router;
