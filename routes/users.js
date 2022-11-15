const express = require("express");
const router = express.Router();
const mysql = require("../connection");

router.get( "/search/firstname/:firstname", (req, res) => {

    const { firstname } = req.params;

    let query = "SELECT * FROM user WHERE firstname LIKE ?";
    mysql.query( query, ['%'+firstname+'%'], (err, results) => {
        if(err)
            throw err;

        res.status(200);
        res.send(results);
    } );
    
} );

router.get( "/search/lastname/:lastname", (req, res) => {

    const { lastname } = req.params;

    let query = "SELECT * FROM user WHERE lastname LIKE ?";
    mysql.query( query, ['%'+lastname+'%'], (err, results) => {
        if(err)
            throw err;

        res.status(200);
        res.send(results);
    } );
    
} );

router.get( "/search/email/:email", (req, res) => {

    const { email } = req.params;

    let query = "SELECT * FROM user WHERE email=?";
    mysql.query( query, [email], (err, results) => {
        if(err)
            throw err;

        res.status(200);
        res.send(results);
    } );
    
} );

router.get( "/search/phone/:phone", (req, res) => {

    const { phone } = req.params;

    let query = "SELECT * FROM user WHERE phone=?";
    mysql.query( query, [phone], (err, results) => {
        if(err)
            throw err;

        res.status(200);
        res.send(results);
    } );
    
} );

router.get( "/search/address/:address", (req, res) => {

    const { address } = req.params;

    let query = "SELECT * FROM user WHERE address LIKE ?";
    mysql.query( query, ['%'+address+'%'], (err, results) => {
        if(err)
            throw err;

        res.status(200);
        res.send(results);
    } );
    
} );

router.get( "/search/date/:date", (req, res) => {

    const { date } = req.params;

    let query = "SELECT * FROM user WHERE membersince=?";
    mysql.query( query, [date], (err, results) => {
        if(err)
            throw err;

        res.status(200);
        res.send(results);
    } );
    
} );

router.get( "/search/verified/:status", (req, res) => {

    const { status } = req.params;

    let query = "SELECT * FROM user WHERE verified=?";
    mysql.query( query, [status], (err, results) => {
        if(err)
            throw err;

        res.status(200);
        res.send(results);
    } );
    
} );

router.get( "/search/enabled/:status", (req, res) => {

    const { status } = req.params;

    let query = "SELECT * FROM user WHERE enabled=?";
    mysql.query( query, [status], (err, results) => {
        if(err)
            throw err;

        res.status(200);
        res.send(results);
    } );
    
} );

router.get( "/search/membership/:membership", (req, res) => {

    const { membership } = req.params;

    let query = "SELECT * FROM user WHERE membership LIKE ?";
    mysql.query( query, ['%'+membership+'%'], (err, results) => {
        if(err)
            throw err;

        res.status(200);
        res.send(results);
    } );
    
} );

router.put( "/passcode/:username", (req, res) => {

    const { username } = req.params;

    const { oldpasscode, newpasscode } = req.body;

    const found = true;

    if( found ) {
        let query = "UPDATE user SET passcode=? WHERE username=? AND passcode=?";
        mysql.query( query, [ newpasscode, username, oldpasscode ], (err, results) => {
            if(err)
                throw err;

            res.status(200);
            res.send(results);
        } );
    } else {
        res.status(404).send(`Error resetting password`);
    }

} );

router.put( "/profile/:username", (req, res) => {

    const { username } = req.params;

    const { picture } = req.body;

    const found = true;

    if( found ) {
        let query = "UPDATE user SET picture=? WHERE username=?";
        mysql.query( query, [ picture, username ], (err, results) => {
            if(err)
                throw err;

            res.status(200);
            res.send(results);
        } );
    } else {
        res.status(404).send(`Error resetting picture`);
    }

} );

router.put( "/enabled/:username", (req, res) => {

    const { username } = req.params;

    const { status } = req.body;

    const found = true;

    if( found ) {
        let query = "UPDATE user SET enabled=? WHERE username=?";
        mysql.query( query, [ status, username ], (err, results) => {
            if(err)
                throw err;

            res.status(200);
            res.send(results);
        } );
    } else {
        res.status(404).send(`Error resetting enabled`);
    }

} );

router.put( "/verified/:username", (req, res) => {

    const { username } = req.params;

    const { status } = req.body;

    const found = true;

    if( found ) {
        let query = "UPDATE user SET verified=? WHERE username=?";
        mysql.query( query, [ status, username ], (err, results) => {
            if(err)
                throw err;

            res.status(200);
            res.send(results);
        } );
    } else {
        res.status(404).send(`Error resetting verified`);
    }

} );

router.put( "/membership/:username", (req, res) => {

    const { username } = req.params;

    const { membership } = req.body;

    const found = true;

    if( found ) {
        let query = "UPDATE user SET membership=? WHERE username=?";
        mysql.query( query, [ membership, username ], (err, results) => {
            if(err)
                throw err;

            res.status(200);
            res.send(results);
        } );
    } else {
        res.status(404).send(`Error resetting membership`);
    }

} );

router
    .route("/")
    .get( (req, res) => {

        let query = "SELECT * FROM user";
        mysql.query( query, (err, results) => {
            if(err)
                throw err;

            res.status(200);
            res.send(results);
        } );
        
    } )
    .post( (req, res) => {

        const { 
            firstname, 
            lastname, 
            username, 
            email, 
            phone, 
            passcode, 
            address, 
            picture, 
            enabled, 
            state
        } = req.body;

        let query = "INSERT INTO user(firstname, lastname, username, email, phone, passcode, address, picture, enabled, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        mysql.query( query, [ firstname, lastname, username, email, phone, passcode, address, picture, enabled, state ],(err, results) => {
            if(err)
                throw err;

            res.status(200);
            res.send(results);
        } );
        
    } );

router
    .route("/:username")
    .get( (req, res) => {

        const { username } = req.params;

        let query = "SELECT * FROM user WHERE username=?";
        mysql.query( query, [username], (err, results) => {
            if(err)
                throw err;

            res.status(200);
            res.send(results);
        } );
        
    } )
    .put( (req, res) => {

        const { username } = req.params;

        const { 
            firstname, 
            lastname, 
            email, 
            phone, 
            address
        } = req.body;

        const found = true;

        if( found ) {
            let query = "UPDATE user SET firstname=?, lastname=?, email=?, phone=?, address=? WHERE username=?";
            mysql.query( query, [ firstname, lastname, email, phone, address, username ], (err, results) => {
                if(err)
                    throw err;

                res.status(200);
                res.send(results);
            } );
        } else {
            res.status(404).send(`User with Username = ${username} does not exist.`);
        }
        
    } )
    .delete( (req, res) => {

        const { username } = req.params;

        const confirm = false;

        if(confirm) {
            let query = "DELETE FROM user WHERE username=?";
            mysql.query( query, [username], (err, results) => {
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