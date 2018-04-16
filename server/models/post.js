const mongoose = require('mongoose');
const Category = require('./category');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema({
	title: { type: String, required: '{PATH} is required!'},
	auther: {type:String, required: false},
	category: {type:String, required: false},
/*	category: {type: Schema.ObjectId, ref: 'Category', required: true},*/
	body: { type: String, required: '{PATH} is required!'},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

postSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
})
.plugin(mongoosePaginate);

const Post = module.exports = mongoose.model('Post', postSchema);