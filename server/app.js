// get dependencies
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');

var app = express();

// get our API routes
const route = require('./routes/route');

// port number
const port = 3000;

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/postlist');

// on connection
mongoose.connection.on('connected',() =>{
    console.log('connected');
});

mongoose.connection.on('error',(err) =>{
    if(err){
    console.log('error');
    }
});
// adding middleware - cors
app.use(cors());

// body - parser
app.use(bodyParser.json());

// static files
app.use(express.static(path.join(__dirname, 'public')));

// route
app.use('/api', route);

// catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// create HTTP server.
const server = http.createServer(app);

// listen on provided port, on all network interfaces.
app.listen(port, () => {
    console.log('server started at port:' + port);
});