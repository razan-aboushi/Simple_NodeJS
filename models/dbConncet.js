const mysql = require("mysql2");

const connection = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'razanaboushi',
    password: 'RazanAboushi',
    database: 'LearnNodeJS',
});

// Check if the database connection is successful
connection.getConnection((error, connection) => {
    if (error) {
        console.error('Error connecting to the database:', error);
        return;
    }
    console.log('Connected to the database!');
    connection.release();
});


module.exports = connection;