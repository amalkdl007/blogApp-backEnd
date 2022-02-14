const mongoose = require('mongoose');
// mongoose.connect('');
// mongoose.connect('mongodb://localhost:27017/blogApp');
const Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: String,
    description: String,
    name: String,
    upvotes: Number,
    comments: Array
});

var ArticleInfo = mongoose.model('articles', articleSchema);

module.exports = ArticleInfo;
