import bodyParser from "body-parser";
import express from "express";


const app = express();
const port = 3000;
var nestPosts = [];

function NestPost(title, tags, content){
    this.title = title;
    this.tags = tags;
    this.content = content;
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("index.ejs");
})

app.get("/newPost", (req, res) => {
    res.render("newPost.ejs");
})


app.post("/submit", (req, res) =>{
    var nestPost = new NestPost(req.body["title"], req.body["tags"], req.body["content"]);
    nestPosts.push(nestPost);
    res.render("index.ejs", {
        availablePosts: nestPosts
    })

    
});

app.listen(port, () =>{
    console.log(`App is listening on port ${port}`);
});


