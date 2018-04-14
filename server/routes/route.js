const express = require('express');
const router = express.Router();

const Post = require('../models/post');

// List of post
router.get('/post', (req, res, next) => {
    Post.find(function(err, posts){
        res.send(posts);
    });
   
});

// Add post
router.post('/post', (req, res, next) => {
    let newPost = new Post({
        title: req.body.title,
        category: req.body.category,
        body: req.body.body
    })

    newPost.save((err, Post) =>{
        if(err){
            res.json({msg: 'failed to add post'});
        }
        else{
            res.json({msg: 'post added successfully'});
        }
    });
});

// update a post
router.put('/post/:id', function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err) res.send(err);

        post.title = req.body.title;
        category: req.body.category,
        post.body = req.body.body;

        post.save(function(err){
            if(err) res.send(err);

            res.json({ message: 'Post updated!' });
        })
    });
});
    
// Delete post
router.delete('/post/:id', (req, res, next) => {
    Post.remove({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    })
});

module.exports = router;