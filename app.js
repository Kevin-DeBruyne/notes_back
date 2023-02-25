const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
mongoose.set("strictQuery", false);
main().catch((err) => console.log(err));
app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyparser.json())
app.use(express.static("public"));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/api");
  console.log("connected");
}
const articleSchema = {
    title: {type: String, required:true},
    content: String
};
const Article = mongoose.model("Article", articleSchema);

app.get("/articles", function (req, res) {
    Article.find(function (err, foundArticles) {
        res.send(foundArticles);
    });
});  
app.post("/articles",async function (req, res) {
  const krishna = await Article.create({
    title: req.body.title,
    content: req.body.content,
  });     
    return res.json(krishna)  
}); 
app.delete("/articles", function (req, res) {
  Article.deleteMany(function (err) {
    if (!err) {
      res.send("deleted all articles")
    }
    else {
      res.send(err);
    }
  });
});   
app.listen(5000, function () {
    console.log("server started on port 5000");
});
