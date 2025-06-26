import bodyParser from "body-parser";
import express from "express";


const app = express();
const port = 3000;
var nestPosts = [];

function NestPost(title, tags, content, posted, rechirped){
    this.title = title;
    this.tags = tags;
    this.content = content;
    this.posted = posted;
    this.timeStamp = new Date();
    this.rechirped = rechirped;
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res) => {
    const  sortedPosts = [...nestPosts].sort((a,b) => b["timeStamp"] - a["timeStamp"]);

    res.render("index.ejs", {
            availablePosts: sortedPosts
        });
})

app.get("")


//routes for new post
app.get("/newPost", (req, res) => {
    res.render("newPost.ejs");
})


app.post("/submit", (req, res) =>{
    var nestPost = new NestPost(req.body["title"], req.body["tags"], req.body["content"], false, false);
    nestPosts.push(nestPost);

    const unpostedPosts = nestPosts.filter(post => !post.posted);
    unpostedPosts.forEach(post =>  post.posted = true);
        
    res.redirect("/");
    
});

//deleting a post
app.post("/delete-post", (req, res) => {
    const postIndex = parseInt(req.body["postIndex"]);
    nestPosts.splice(postIndex, 1)
    res.redirect("/#posts");
});

//editing a post
app.get("/posts/:id/edit", (req, res) =>{
    const postId = req.params.id;
    const post = nestPosts[postId]; //udelat na tohle fci
    res.render("editPost.ejs", {
        post,
        postId
    })
})

app.post("/submitEdit/:id", (req, res) =>{
    const postId = req.params.id;
    const post = nestPosts[postId];

    post["rechirped"] = true;
    post["title"] = req.body["title"];
    post["content"] = req.body["content"];
    post["timeStamp"] = new Date();

    res.redirect("/#posts")
});

//viewing a post 
app.get("/posts/:id", (req, res) => {
    const postId = req.params.id;
    const post = nestPosts[postId];
    res.render("viewPost.ejs", {
        post, 
        postId
    }) 
})


app.listen(port, () =>{
    console.log(`App is listening on port ${port}`);
});


