'use strict';

var http = require( "http" ),
    pathUtils = require( "path" ),
    express = require( "express" ),
    bodyParser = require('body-parser'),
    app = express(),
    PORT = process.env.PORT || 5000,
    appDir = pathUtils.resolve( __dirname, "view" );

app.set('views', './view');
app.set('view engine', 'pug');

app.use( express.static( appDir ) );
app.use(bodyParser());

app.get( "*", function( req, res ) {
    res.render('login', {} );
} );

var messages = {
    super: "you're a super user. Be cautious\n",
    admin: "you're an admin. Beware!\n",
    regular: "you're a regular user. Ask your admin for more.\n"
};

app.post("*", function (req, res) {
    var buf = "";
    switch (req.body.user) {
        case "super": buf += messages.super;
        case "admin": buf += messages.admin;
        case "regular": buf += messages.regular; break;
        default: return;
    }
    console.log(buf);
});

http.createServer( app ).listen( PORT, function() {
    console.log( "Express server listening on port " + PORT );
    console.log( "http://localhost:" + PORT );
} );