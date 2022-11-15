const express = require("express");
const router = express.Router();
const mysql = require("../connection");

router.get( "/search/:title", (req, res) => {

    const { title } = req.params;

    let query = "SELECT * FROM tag WHERE title LIKE ?";
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

        let query = "SELECT * FROM tag";
        mysql.query( query, (err, results) => {
            if(err)
                throw err;

            res.status(200);
            res.send(results);
        } );
        
    } )
    .post( (req, res) => {

        const { title } = req.body;

        let query = "INSERT INTO tag(title) VALUES (?)";
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

        let query = "SELECT * FROM tag WHERE id=?";
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
            let query = "UPDATE tag SET title=? WHERE id=?";
            mysql.query( query, [ title, id ], (err, results) => {
                if(err)
                    throw err;

                res.status(200);
                res.send(results);
            } );
        } else {
            res.status(404).send(`Tag with Id = ${id} does not exist.`);
        }
        
    } )
    .delete( (req, res) => {

        const { id } = req.params;

        const confirm = false;

        if(confirm) {
            let query = "DELETE FROM tag WHERE id=?";
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