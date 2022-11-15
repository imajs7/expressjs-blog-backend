require('dotenv').config();

const mysql = require("mysql");

const conn = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT

});

conn.connect( (err) => {
    if(err)
        throw err;

    console.log( "Connection established" );
} );

module.exports = conn;