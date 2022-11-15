const express = require("express");
const router = express.Router();
const mysql = require("../connection");

router.get( "/search/:title", (req, res) => {

    const { title } = req.params;

    let query = "SELECT * FROM category WHERE title LIKE ?";
    mysql.query( query, ['%'+title+'%'], (err, results) => {
        if(err)
            throw err;

        res.status(200);
        res.send(results);
    } );
    
} );

router
    .route("/")
    .get( (req, res) => {

        let query = "SELECT * FROM category";
        mysql.query( query, (err, results) => {
            if(err)
                throw err;

            res.status(200);
            res.send(results);
        } );
        
    } )
    .post( (req, res) => {

        const { title } = req.body;

        let query = "INSERT INTO category(title) VALUES (?)";
        mysql.query( query, [ title ],(err, results) => {
            if(err)
                throw err;

            res.status(200);
            res.send(results);
        } );
        
    } );

router
    .route("/:id")
    .get( (req, res) => {

        const { id } = req.params;

        let query = "SELECT * FROM category WHERE id=?";
        mysql.query( query, [id], (err, results) => {
            if(err)
                throw err;

            res.status(200);
            res.send(results);
        } );
        
    } )
    .put( (req, res) => {

        const { id } = req.params;
        const { title } = req.body;

        const found = true;

        if( found ) {
            let query = "UPDATE category SET title=? WHERE id=?";
            mysql.query( query, [ title, id ], (err, results) => {
                if(err)
                    throw err;

                res.status(200);
                res.send(results);
            } );
        } else {
            res.status(404).send(`Category with Id = ${id} does not exist.`);
        }
        
    } )
    .delete( (req, res) => {

        const { id } = req.params;

        const confirm = true;

        if(confirm) {
            let query = "DELETE FROM category WHERE id=?";
            mysql.query( query, [id], (err, results) => {
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