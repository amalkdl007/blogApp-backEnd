const express = require('express');
const ArticleInfo = require('./src/model/BlogDB')
const postRouter = require("./src/routes/postRouter");
// const cors = require("cors");

const app = express();

// const PORT = process.env.PORT || 5001

app.use(express.urlencoded({extended:true}));
app.use(express.json());
// app.use(cors());

const path = require('path');
app.use(express.static('./build/'));
app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.use("/api/posts",postRouter);


// Basic Article Fetch Route
app.get('/api/article/:id', (req, res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    try {
        const articleId = req.params.id;
        ArticleInfo.findOne({_id: articleId })
            .then(function (article) {
                res.status(200).json(article);
            })
    }
    catch (error) {
        res.status(500).json({ message: 'Error', error });
    }
});

// Upvotes Routing
app.post('/api/article/:id/upvotes', (req, res) => {
    const articleId = req.params.id;
    const filter = { _id: articleId };
    const update = { $inc: { upvotes: 1 } };
    ArticleInfo.findOneAndUpdate(filter, update, { new: true })
        .then(function (article) {
            res.json(article);
        })
})

// Comments Routing
app.post('/api/article/:id/comments', (req, res) => {
    const articleId = req.params.id;
    const { username, text } = req.body;
    const filter = { _id: articleId };
    const update = { $push: { comments: { username, text } } };
    ArticleInfo.findOneAndUpdate(filter, update, { new: true })
        .then(function (article) {
            res.json(article);
        })
})

// Port number
app.listen(5001, () => {
    console.log("Server Listening on port 5001");
})