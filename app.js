const express = require("express");
var cors = require('cors');
const app = express();

// configuration
const PORT = 3004;
const mysql = require("./connection");

app.set( "view engine", "ejs" );
app.set( "views", "./views" );

app.use( express.urlencoded({ extended: true }) );
app.use( express.json() );

const path = require('path')
app.use("/static", express.static( path.join(__dirname, 'public') ) );

const corsOptions = {
    origin: 'http://localhost:*',
    optionsSuccessStatus: 200
}
app.use( cors(corsOptions) );

// Routes
app.get( "/", (req, res) => {
    let query = "SELECT * FROM app_setting";
    mysql.query( query, (err, results) => {
        if(err)
            throw err;

        let { value } = results[0];
        res.status(200)
            .render("index", { title: value });  
    } );
} );

// Settings Routes
const settingsRouter = require("./routes/settings");
app.use( '/settings', settingsRouter );

// Blogposts Routes
const blogpostsRouter = require("./routes/blogposts");
app.use( '/blogposts', blogpostsRouter );

// Categories Routes
const categoriesRouter = require("./routes/categories");
app.use( '/categories', categoriesRouter );

// Tags Routes
const tagsRouter = require("./routes/tags");
app.use( '/tags', tagsRouter );

// Users Routes
const usersRouter = require("./routes/users");
app.use( '/users', usersRouter );

// listening server
app.listen( PORT, (err) => {
    if(err)
        throw err;
    
    console.log( `Server is running at port: ${PORT}.` );
});