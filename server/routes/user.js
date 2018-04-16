const mongoose = require( 'mongoose' );
const jwt = require('jsonwebtoken'); 

const User = require('../models/user');
const config = require('../config');


exports.signup = function(req, res, next){
   // Check for registration errors
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    console.log('signup');
    if (!firstname || !lastname || !email || !username || !password) {
        return res.status(422).json({ 
            success: false, 
            message: 'Posted data is not correct or incomplete.'
        });
    }

    User.findOne({ username: username }, function(err, existingUser) {
        if(err){ res.status(400).json({ 
            success: false,
            message:'Error processing request '+ err
            }); 
        }

        // If user is not unique, return error
        if (existingUser) {
            return res.status(201).json({
                success: false,
		        message: 'Username already exists.'
            });
        }

        // If no error, create account
        let oUser = new User({
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: password
        });

        oUser.save(function(err, oUser) {
            if(err){ res.status(400).json({ 
                success: false, 
                message:'Error processing request '+ err
            });
            }
        
            res.status(201).json({
                success: true,
		        message: 'User created successfully, please login to access your account.'
            });
        });
    });
}

exports.login = function(req, res, next){
    // find the user
    User.findOne({
        username: req.body.username
      }, function(err, user) {
        if (err) throw err;
    
        if (!user) {
          res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          // check if password matches
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              var token = jwt.sign(user.toJSON(), config.secret);
              // return the information including token as JSON
              res.json({success: true, token: 'JWT ' + token});
            } else {
              res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
          });
        }
      });
}

exports.authenticate = function(req, res, next){
    // check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['authorization'];
    console.log(token);
	if (token) {
		jwt.verify(token, config.secret, function(err, decoded) {			
			if (err) {
				return res.status(201).json({ 
                    success: false, 
                    message: 'Authenticate token expired, please login again.', 
                    errcode: 'exp-token'
                });		
            } 
            else {
				req.decoded = decoded;	
				next();
			}
		});
	} else {
		return res.status(201).json({ 
			success: false, 
			message: 'Fatal error, Authenticate token not available.',
            errcode: 'no-token'
		});
	}
}

exports.getuserDetails = function(req, res, next){
    User.find({_id:req.params.id}).exec(function(err, user){
        if(err){ 
            res.status(400).json({ 
                success: false, 
                message: 'Error processing request '+ err
            }); 
        }
        res.status(201).json({
		success: true, 
		data: user
	});
    });
}

exports.updateUser = function(req, res, next){
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
	const userid = req.params.id;

    if (!firstname || !lastname || !email || !userid) {
        return res.status(422).json({ 
            success: false, 
            message: 'Posted data is not correct or incompleted.'
        });
    } 
    else {
	User.findById(userid).exec(function(err, user){
		if(err){ res.status(400).json({ 
            success: false, 
            message: 'Error processing request '+ err 
            });
        }
			
		if(user){
			user.firstname = firstname;
			user.lastname = lastname;
			user.email = email;
		}
		user.save(function(err){
			if(err){ res.status(400).json({ 
                success: false,
                message:'Error processing request '+ err 
                }); 
            }
			res.status(201).json({
				success: true,
				message: 'User details updated successfully'
			});
		});
	});
   }
}

exports.updatePassword = function(req, res, next){
    const userid = req.params.id;
    const oldpassword = req.body.oldpassword;
    const password = req.body.password;

    if (!oldpassword || !password || !userid) {
        return res.status(422).json({ 
            success: false, 
            message: 'Posted data is not correct or incompleted.'
        });
    } 
    else {
	User.findOne({ _id: userid }, function(err, user) {
            if(err){ res.status(400).json({ 
                success: false, 
                message:'Error processing request '+ err
                }); 
            }
            if (user) {
                user.comparePassword(oldpassword, function (err, isMatch) {
                    if (isMatch && !err) {
                        
                        user.password = password;

                        user.save(function(err) {
                            if(err){ res.status(400).json({ 
                                success: false,
                                message:'Error processing request '+ err
                            }); }

                            res.status(201).json({
                                success: true,
                                message: 'Password updated successfully'
                            });
                        });
                    } else {
                        res.status(201).json({ 
                            success: false,
                            message: 'Incorrect old password.'
                        });
                    }
                });	
            }
        });
    }
}

exports.getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
};


// update a user
exports.edit = function(req, res, next){
    User.findById(req.params.id, function(err, user){
        if(err) res.send(err);

        user.username = req.body.username;
        user.firstname = req.body.firstname,

        user.save(function(err){
            if(err){ 
                res.status(400).json({ 
                    success: false, 
                    message: 'Error processing request '+ err 
                }); 
            }
            else{
                res.status(200).json({
                    success: true,
                    message: 'User updated successfully'
                });
            }
        })
    });
};
    


exports.save = function(req, res, next){
    const username = req.body.username;
    const firstname = req.body.firstname;

    if (!username || !firstname) {
        return res.status(422).send({ 
            success: false, 
            message: 'Posted data is not correct or incompleted.'
         });
    } 
    else {
        
        let newUser = new User({
            username: username,
            firstname: firstname,
        })

        newUser.save((err, Post) =>{
            if(err){ 
                res.status(400).json({ 
                    success: false, 
                    message: 'Error processing request '+ err 
                }); 
            }
            else{
                res.status(200).json({
                    success: true,
                    message: 'Post saved successfully'
                });
            }
        });
    }
}

// Delete user
exports.delete = function(req, res, next) {
	User.remove({_id: req.params.id}, function(err){
        if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err }); }
        res.status(200).json({
		success: true,
		message: 'User removed successfully'
	});
    });
}

// Get all users
exports.getall = function(req, res, next){
	User.find(function(err, users){
        res.send(users);
    });
}
