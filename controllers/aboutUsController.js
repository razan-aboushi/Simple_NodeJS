const connection = require("../models/dbConncet");


const aboutUsGet = (req, res) => {
    const query = 'SELECT * FROM about_us';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.json(results);
        }
    });
}






module.exports = {
    aboutUsGet
}