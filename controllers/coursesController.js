const connection = require('../models/dbConncet');

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

module.exports = {
    getCourseData
};
