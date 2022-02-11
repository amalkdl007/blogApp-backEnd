const express = require("express"); 
const postRouter = express.Router();
const ArticleInfo = require("../model/BlogDB")

//get all posts
postRouter.get("/", (req, res) => {
    ArticleInfo.find({})
        .sort({ title: 1 })
        .then((posts) => {
            res.json(posts);
        })
});

//get postrouter
postRouter.get("/:id", (req, res) => {
    const articleId = req.params.id;
   
    ArticleInfo.findOne({ _id: articleId })
        .then((post) => {
            res.json(post);
        })
        .catch(() =>
            res.json({ status: "Error" }));
});

//posting router
postRouter.post("/post", (req, res) => {
    var item = {
        title: req.body.title,
        description: req.body.description,
        name: req.body.name,
        upvoters: [],
        comments: []
    }
    const blogPost = new ArticleInfo(item);
    blogPost.save()
        .then(() => res.json({status: "Success"}))
        .catch((err) => {
            console.log(err)
            res.sendStatus(500).json({ status: "Error" });
        });
});

// update Router
postRouter.post("/api/:id/update", (req, res) => {
    const postId = req.params.id;
    var updateItem = {
        title: req.body.title,
        description: req.body.description
    };
    ArticleInfo.findByIdAndUpdate(postId, updateItem)
        .then((post) => res.json(post))
        .catch((err) => {
            console.log(err)
            res.sendStatus(500).json({ status: "Error" });
        });
})

//delete router
postRouter.post("/api/:id/delete", (req, res) => {
    const postId = req.params.id;
    ArticleInfo.findByIdAndDelete(postId)
        .then(() =>  res.json({status: "Success"}))
        .catch((err) => {
            console.log(err)
            res.sendStatus(500).json({ status: "Error" });
        });
});

module.exports = postRouter;