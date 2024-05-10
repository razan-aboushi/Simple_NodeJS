const connection = require("../models/dbConncet");

const getCourseInCategory = (req, res) => {
    const categoryId = req.params.categoryId;
    const catQuery = `SELECT * FROM categories WHERE category_id = ?`;

    connection.query(catQuery, [categoryId], (error, queryResult) => {
        if (error) {
            console.log(error.message);
            return res.status(500).send("Internal server error");
        }

        if (queryResult.length === 0) {
            return res.status(404).send("There is no category in the database");
        }

        const categoryData = queryResult[0];
        const category_id = categoryData.category_id;

        const courseQuery = `SELECT * FROM courses WHERE category_id = ?`;

        connection.query(courseQuery, [category_id], (error, courseQueryResult) => {
            if (error) {
                console.error(error.message);
                return res.status(500).send("Internal server error");
            } else if (courseQueryResult.length === 0) {
                return res.status(404).send("There are no courses in this category");
            }

            const coursesInCategory = {
                categoryData: categoryData,
                courseData: courseQueryResult
            };

            res.send(coursesInCategory);
        });
    });
};

module.exports = {
    getCourseInCategory
};
