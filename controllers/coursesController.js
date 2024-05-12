const connection = require('../models/dbConncet');

// Get all course data based on it's ID
const getCourseData = (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const courseQuery = 'SELECT * FROM courses WHERE course_id = ?';

    connection.query(courseQuery, [courseId], (courseError, courseResults) => {
        if (courseError) {
            console.error(courseError.message);
            return res.status(500).send("Internal server error: " + courseError.message);
        }

        if (courseResults.length === 0) {
            return res.status(404).send("Course not found in the database");
        }

        const courseData = courseResults[0];
        const userId = courseData.user_id;

        const userQuery = 'SELECT * FROM users WHERE user_id = ?';

        connection.query(userQuery, [userId], (userError, userResults) => {
            if (userError) {
                console.error(userError.message);
                return res.status(500).send("Internal error: " + userError.message);
            }

            const userData = userResults[0];

            const userCoursesQuery = 'SELECT * FROM courses WHERE user_id = ?';

            connection.query(userCoursesQuery, [userId], (coursesError, coursesResults) => {
                if (coursesError) {
                    console.error(coursesError.message);
                    return res.status(500).send("Internal error: " + coursesError.message);
                }

                const allData = {
                    courseData: courseData,
                    userData: userData,
                    userCoursesData: coursesResults
                };

                return res.status(200).send(allData);
            });
        });
    });
};


// Make the filter on the courses based on university or category
const getCoursesBasedOnFilter = (req, res) => {
    const {searchTerm, universityFilter, categoryFilter} = req.query;

    let query = `
        SELECT courses.*,
               universities.university_name,
               categories.category_name,
               users.name AS publisher_name
        FROM courses
                 INNER JOIN universities ON courses.university_id = universities.university_id
                 INNER JOIN categories ON courses.category_id = categories.category_id
                 INNER JOIN users ON courses.user_id = users.user_id
        WHERE courses.course_status = 'مقبول'
    `;

    const queryParams = [];

    if (searchTerm) {
        query += ` AND (courses.course_title LIKE ? OR users.name LIKE ?)`;
        queryParams.push(`%${searchTerm}%`);
        queryParams.push(`%${searchTerm}%`);
    }

    if (universityFilter) {
        query += ` AND courses.university_id = ?`;
        queryParams.push(universityFilter);
    }

    if (categoryFilter) {
        query += ` AND categories.category_name LIKE ?`;
        queryParams.push(`%${categoryFilter}%`);
    }

    query += ` ORDER BY courses.course_id DESC`;

    connection.query(query, queryParams, (error, filteredResults) => {
        if (error) {
            console.error('Error fetching filtered courses:', error);
            return res.status(500).json({error: 'Failed to fetch filtered courses from the database'});
        }
        res.json(filteredResults);
    });
};


module.exports = {
    getCourseData, getCoursesBasedOnFilter
};
