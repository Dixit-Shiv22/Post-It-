const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");


let posts = [
    {
        id: uuidv4(),
        username: "shivansh",
        content: "Hello everyone, I hope you are all doing well."
    },
    {
        id: uuidv4(),
        username: "manas",
        content: "I am currently working on improving my skills and learning new concepts."
    },
    {
        id: uuidv4(),
        username: "kshitij",
        content: "Consistency and focus are essential for achieving meaningful results."
    },
    {
        id: uuidv4(),
        username: "raj",
        content: "Experience comes with time, patience, and continuous learning."
    }
];


app.use(express.urlencoded({ extended: true })); //converts url encoded data to a format in which express can uundestand it 

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); 

app.use(express.static(path.join(__dirname, "public"))); 

app.use(methodOverride("_method")); //overrides the method of any request such as post to delete or post to patch 

app.get("/posts", (req,res)=>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
});

app.post("/posts", (req,res)=>{
    let {username , content} = req.body;
    let id = uuidv4()
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id===p.id);
    res.render("show.ejs" ,{post});
});

app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id===p.id);
    post.content= newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id", (req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id!==p.id);
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
});