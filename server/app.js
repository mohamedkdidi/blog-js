// get dependencies
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const morgan = require('morgan'); // node console log
const jwt = require('jsonwebtoken');  // web token

const app = express();

// get our API routes
const post = require('./routes/post');
const category = require('./routes/category');
const user = require('./routes/user');

// port number
const port = 3000;

// use morgan to log requests to the console
app.use(morgan('dev'));

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/blog-js');

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

// basic routes
app.get('/', function(req, res) {
	res.send('Expense Watch API is running at http://localhost:' + port + '/api');
});


// express router
var apiRoutes = express.Router();

app.use('/api', apiRoutes);

apiRoutes.post('/login', user.login);

apiRoutes.post('/register', user.signup); // API user register


apiRoutes.get('/user/:id', user.getuserDetails); // API returns user details 

apiRoutes.put('/user/:id', user.updateUser); // API updates user details

apiRoutes.put('/password/:id', user.updatePassword); // API updates user password


apiRoutes.get('/post/', post.getall); // API returns all posts

apiRoutes.delete('/post/:id', post.delete); // API delete post

apiRoutes.post('/post/', post.save); // API save post

apiRoutes.put('/post/:id', post.edit); // API edit post


apiRoutes.get('/category/', category.getall); // API returns all category

apiRoutes.delete('/category/:id', category.delete); // API delete category

apiRoutes.post('/category/', category.save); // API save category

apiRoutes.put('/category/:id', category.edit); // API edit category


apiRoutes.get('/user/', user.getall); // API returns all category

apiRoutes.delete('/user/:id', user.delete); // API delete category

apiRoutes.post('/user/', user.save); // API save category

apiRoutes.put('/user/:id', user.edit); // API edit category


// listen on provided port, on all network interfaces.
app.listen(port, () => {
    console.log('server started at port:' + port);
});