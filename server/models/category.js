const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
	title: { type: String, required: true},
	description: { type: String, required: false},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

categorySchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

const Category = module.exports = mongoose.model('Category', categorySchema);