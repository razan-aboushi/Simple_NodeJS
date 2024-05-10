const connection = require("../models/dbConncet");


const getAllArticles = (req, res) => {
    const query = 'select * from articles';

    connection.query(query, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else if (results.length <= 0) {
            res.status(404).send("There are no articles available");
        } else {

            res.status(200).send(results)
        }
    })
}

const getOneArticle = (req, res) => {
    const articleId = req.params.articleId;
    const query = 'SELECT * FROM articles WHERE article_id = ?';

    connection.query(query, [articleId], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else if (results.length <= 0) {
            res.status(404).send("There are no articles available");
        } else {
            res.status(200).send(results[0]);
        }
    });
};

const addNewArticle = (req, res) => {
    const {article_title, article_brief, article_content, article_image, article_content2} = req.body;
    const query = 'INSERT INTO articles (article_title, article_brief, article_content, article_image, article_content2) VALUES (?, ?, ?, ?, ?)';
    const values = [article_title, article_brief, article_content, article_image, article_content2];

    connection.query(query, values, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send("Article inserted successfully");
        }
    });
};


module.exports = {
    getAllArticles, getOneArticle, addNewArticle
}