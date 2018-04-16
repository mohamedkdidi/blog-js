const express = require('express');

const mongoose = require( 'mongoose' );
const Category = require('../models/category');


// update a post
exports.edit = function(req, res, next){
    Category.findById(req.params.id, function(err, post){
        if(err) res.send(err);

        post.title = req.body.title;
        post.description = req.body.description,

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
    const description = req.body.description;

    if (!title || !description) {
        return res.status(422).send({ 
            success: false, 
            message: 'Posted data is not correct or incompleted.'
         });
    } 
    else {
        
        let newCategory = new Category({
            title: title,
            description: description,
        })

        newCategory.save((err, Category) =>{
            if(err){ 
                res.status(400).json({ 
                    success: false, 
                    message: 'Error processing request '+ err 
                }); 
            }
            else{
                res.status(200).json({
                    success: true,
                    message: 'Category saved successfully'
                });
            }
        });
    }
}

// Delete category
exports.delete = function(req, res, next) {
	Category.remove({_id: req.params.id}, function(err){
        if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err }); }
        res.status(200).json({
		success: true,
		message: 'Category removed successfully'
	});
    });
}

// Get all categories
exports.getall = function(req, res, next){
	Category.find(function(err, categories){
        res.send(categories);
    });
}
