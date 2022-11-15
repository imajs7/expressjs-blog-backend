const express = require("express");
const router = express.Router();
const mysql = require("../connection");

router.get( "/search/:keyname", (req, res) => {

    const { keyname } = req.params;

    let query = "SELECT * FROM app_setting WHERE keyname LIKE ?";
    mysql.query( query, ['%'+keyname+'%'], (err, results) => {
        if(err)
            throw err;

        res.status(200);
        res.send(results);
    } );
    
} );

router
    .route("/")
    .get( (req, res) => {

        let query = "SELECT * FROM app_setting";
        mysql.query( query, (err, results) => {
            if(err)
                throw err;

            res.status(200);
            res.send(results);
        } );
        
    } )
    .post( (req, res) => {

        const { keyname, description, value } = req.body;

        let query = "INSERT INTO app_setting(keyname, description, value) VALUES (?, ?, ?)";
        mysql.query( query, [ keyname, description, value ],(err, results) => {
            if(err)
                throw err;

            res.status(200);
            res.send(results);
        } );
        
    } );

router
    .route("/:keyname")
    .get( (req, res) => {

        const { keyname } = req.params;

        let query = "SELECT * FROM app_setting WHERE keyname=?";
        mysql.query( query, [keyname], (err, results) => {
            if(err)
                throw err;

            res.status(200);
            res.send(results);
        } );
        
    } )
    .put( (req, res) => {

        const { keyname } = req.params;
        const { description, value } = req.body;

        const found = true;

        if( found ) {
            let query = "UPDATE app_setting SET description=?, value=? WHERE keyname=?";
            mysql.query( query, [ description, value, keyname ], (err, results) => {
                if(err)
                    throw err;

                res.status(200);
                res.send(results);
            } );
        } else {
            res.status(404).send(`App Setting with Keyname = ${keyname} does not exist.`);
        }
        
    } )
    .delete( (req, res) => {

        const { keyname } = req.params;

        const confirm = true;

        if(confirm) {
            let query = "DELETE FROM app_setting WHERE keyname=?";
            mysql.query( query, [keyname], (err, results) => {
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