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
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/api");
  console.log("connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const articleSchema = {
    title: String,
    content: String
};
const Article = mongoose.model("Article", articleSchema);

app.get("/articles", function (req, res) {
    Article.find(function (err, foundArticles) {
        res.send(foundArticles);
    });
});  
app.post("/articles", function (req, res) {
  console.log(req.body.title);
  console.log(req.body.content);
  const krishna = new Article({
    title: req.body.title,
    content: req.body.content,
  });
  krishna.save(function (err) {
    if (err) {
      res.send(err);
    }
    else {
      res.send("successfully created new article")
    }
  });
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
//to do
app.listen(5000, function () {
    console.log("server started on port 5000");
});
