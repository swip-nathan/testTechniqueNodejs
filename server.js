//imports
var express = require('express');
var bodyParser = require ('body-parser');
var apiRouter = require ('./routes/apiRouter').router;

//instanciate server
var server = express();

// Body parser config
server.use(bodyParser.urlencoded({ extended: true}));
server.use(bodyParser.json());

//config routes
server.get('/',(req, res) => {
    res.status(200).end();
});
server.use('/api/', apiRouter);

//launch server
server.listen(8080, () => {
    console.log('Server en écoute =0)');
});