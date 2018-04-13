const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
	title: { type: String, required: '{PATH} is required!'},
	body: { type: String, required: '{PATH} is required!'},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

postSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

const Post = module.exports = mongoose.model('Post', postSchema);