const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/api");
  console.log("connected"); 
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Article = mongoose.model("Article", articleSchema);
const arshi = new Article({ title: "Arshi", content: "cute", desc: "cute"});
const reema = new Article({ title: "Reema", content: "beautiful" });
const kittu = new Article({ title: "Kittu", content: "childish" });
const anjali = new Article({ title: "Anjali", content: "nostalgia" });
const shruti = new Article({ title: "Shruti", content: "roommate of arshia" });

Article.insertMany([arshi, reema, kittu, anjali, shruti], function (err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log("ok");
  }
})