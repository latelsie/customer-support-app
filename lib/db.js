// lib/db.js
import mysql from 'mysql2/promise';

// Create the connection to MySQL
const db = mysql.createPool({
    host: 'localhost', // Replace with your MySQL server host
    user: 'root',      // Replace with your MySQL username
    password: '',      // Replace with your MySQL password
    database: 'faq_app' // The database we created above
});

export default db;
