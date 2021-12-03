const express = require("express");
const router = express.Router();
const Post = require("../models/Post")

router.post("/newpost", (req, res) => {
    console.log(req.body);
    const newPost = new Post({
            title: req.body.title, 
            content : req.body.content
        });
    newPost.save((err) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: {
                    msgBody: "An error occurd while saving post",
                    msgError: true,
                },
                });
        }else {
            res.status(201).json({message: {
                msgBody: "Post successfully created", msgError: false
            }
            })
        }
    })
});

// Här slutade jag senast

router.get("/getposts", (req, res) => {
    Post.find({}, (err, documents) => {
        if(err){
            res.status(500).json({message: {msgBody: "An error occord , getting posts", msgError: true}})
        } else {
            res.status(200).json({posts: documents});
        }
    });
});

router.put("/updatepost/:id", (req, res) => {
    Post.findByIdAndUpdate(req.paraom.id, { title: req.body.title, content: req.body.content}, (err) => {
        if(err) {
            res.status(500).json({message: {msgBody: "An error occord , updating posts", msgError: true}})
            
        }else{
            res.status(200).json({message: {msgBody: "Post successfully updated", msgError: false},
        })
        }
    })
})

router.delete("/deletepost/:id", (req, res) => {
    Post.findByIdAndDelete(req.params.id, (err) => {
        if(err) {
            res.status(500).json({message: {msgBody: "An error occord , did not delete posts", msgError: true}})
            
        }else{
            res.status(200).json({message: {msgBody: "Post successfully deleted", msgError: false},
        })
        }
    })
})


module.exports = router;
