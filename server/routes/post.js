const express = require('express');

const mongoose = require( 'mongoose' );
const Post = require('../models/post');


// update a post
exports.edit = function(req, res, next){
    Post.findById(req.params.id, function(err, post){
        if(err) res.send(err);

        post.title = req.body.title;
        post.category = req.body.category,
        post.body = req.body.body;

        post.save(function(err){
            if(err){ 
                res.status(400).json({ 
                    success: false, 
                    message: 'Error processing request '+ err 
                }); 
            }
            else{
                res.status(200).json({
                    success: true,
                    message: 'Post updated successfully'
                });
            }
        })
    });
};
    


exports.save = function(req, res, next){
    const title = req.body.title;
    const category = req.body.category;
    const body = req.body.body;

    if (!title || !category || !body) {
        return res.status(422).send({ 
            success: false, 
            message: 'Posted data is not correct or incompleted.'
         });
    } 
    else {
        
        let newPost = new Post({
            title: title,
            category: category,
            body: body
        })

        newPost.save((err, Post) =>{
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

// Delete post
exports.delete = function(req, res, next) {
	Post.remove({_id: req.params.id}, function(err){
        if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err }); }
        res.status(200).json({
		success: true,
		message: 'Post removed successfully'
	});
    });
}

// Get all posts
exports.getall = function(req, res, next){
	Post.find(function(err, posts){
        res.send(posts);
    });
}
