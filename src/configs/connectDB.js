// get the client
//const mysql = require('mysql2');
import mysql from 'mysql2/promise'
//const mysql = require('mysql2/promise');
// create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'nodejs'
// });
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejs'

});

// simple query


//export default connection
export default pool