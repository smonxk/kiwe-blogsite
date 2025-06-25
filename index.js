import bodyParser from "body-parser";
import express from "express";


const app = express();
const port = 3000;
var nestPosts = [];

function NestPost(title, tags, content, posted){
    this.title = title;
    this.tags = tags;
    this.content = content;
    this.posted = posted;
    this.timeStamp = new Date();
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res) => {
    const  sortedPosts = [...nestPosts].sort((a,b) => b["timeStamp"] - a["timeStamp"]);

    res.render("index.ejs", {
            availablePosts: sortedPosts
        });
})

app.get("/newPost", (req, res) => {
    res.render("newPost.ejs");
})


app.post("/submit", (req, res) =>{
    var nestPost = new NestPost(req.body["title"], req.body["tags"], req.body["content"], false);
    nestPosts.push(nestPost);

    const unpostedPosts = nestPosts.filter(post => !post.posted);
    unpostedPosts.forEach(post =>  post.posted = true);
        
    res.redirect("/");
    
});

app.post("/delete-post", (req, res) => {
    const postIndex = parseInt(req.body["postIndex"]);
    nestPosts.splice(postIndex, 1)
    res.redirect("/#posts");
});

app.listen(port, () =>{
    console.log(`App is listening on port ${port}`);
});


