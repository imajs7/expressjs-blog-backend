const express = require("express");
const router = express.Router();
const mysql = require("../connection");

router.get( "/title/:title", (req, res) => {

    const { title } = req.params;

    let query = "SELECT * FROM blogpost WHERE title LIKE ?";
    mysql.query( query, ['%'+title+'%'], (err, results) => {
        if(err)
            throw err;

        res.status(200);
        res.send(results);
    } );
    
} );

router.get( "/content/:content", (req, res) => {

    const { content } = req.params;

    let query = "SELECT * FROM blogpost WHERE content LIKE ?";
    mysql.query( query, ['%'+content+'%'], (err, results) => {
        if(err)
            throw err;

        res.status(200);
        res.send(results);
    } );
    
} );

router.get( "/date/:date", (req, res) => {

    const { date } = req.params;

    let query = "SELECT * FROM blogpost WHERE postedon=?";
    mysql.query( query, [date], (err, results) => {
        if(err)
            throw err;

        res.status(200);
        res.send(results);
    } );
    
} );

router.get( "/user/:username", (req, res) => {

    const { username } = req.params;

    let query = "SELECT * FROM blogpost WHERE user_id=(SELECT id FROM user WHERE username=?)";
    mysql.query( query, [username], (err, results) => {
        if(err)
            throw err;

        res.status(200);
        res.send(results);
    } );
    
} );

router.get( "/category/:category", (req, res) => {

    const { category } = req.params;

    let query = "SELECT * FROM blogpost WHERE cat_id=(SELECT id FROM category WHERE title=?)";
    mysql.query( query, [category], (err, results) => {
        if(err)
            throw err;

        res.status(200);
        res.send(results);
    } );
    
} );

router
    .route("/")
    .get( (req, res) => {

        let query = "SELECT * FROM blogpost";
        mysql.query( query, (err, results) => {
            if(err)
                throw err;

            res.status(200);
            res.send(results);
        } );
        
    } )
    .post( (req, res) => {

        const { title, excerpt, content, user_id, cat_id, published, state } = req.body;

        let query = "INSERT INTO blogpost(title, excerpt, content, user_id, cat_id, published, state) VALUES (?, ?, ?, ?, ?, ?, ?)";
        mysql.query( query, [ title, excerpt, content, user_id, cat_id, published, state ],(err, results) => {
            if(err)
                throw err;

            res.status(200);
            res.send(results);
        } );
        
    } );

router
    .route("/:postId")
    .get( (req, res) => {

        const { postId } = req.params;

        let query = "SELECT * FROM blogpost WHERE id=?";
        mysql.query( query, [postId], (err, results) => {
            if(err)
                throw err;

            res.status(200);
            res.send(results);
        } );
        
    } )
    .put( (req, res) => {

        const { postId } = req.params;

        const { title, excerpt, content, user_id, cat_id, published, state } = req.body;

        const found = true;

        if( found ) {
            let query = "UPDATE blogpost SET title=?, excerpt=?, content=?, user_id=?, cat_id=?, published=?, state=? WHERE id=?";
            mysql.query( query, [ title, excerpt, content, user_id, cat_id, published, state, postId ], (err, results) => {
                if(err)
                    throw err;

                res.status(200);
                res.send(results);
            } );
        } else {
            res.status(404).send(`Blogpost with postId = ${postId} does not exist.`);
        }
        
    } )
    .delete( (req, res) => {

        const { postId } = req.params;

        const confirm = false;

        if(confirm) {
            let query = "DELETE FROM blogpost WHERE id=?";
            mysql.query( query, [postId], (err, results) => {
                if(err)
                    throw err;

                res.status(204);
                res.send(results);
            } );
        } else {
            res.status(200).send('Not deleted');
        }
        
    } );

module.exports = router;