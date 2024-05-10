const express = require('express');
const router = express.Router();
const articlesController = require("../controllers/articlesController");

router.get('/articles' , articlesController.getAllArticles);

router.get('/articles/:articleId', articlesController.getOneArticle);

router.post('/addArticle' , articlesController.addNewArticle);

module.exports = router;