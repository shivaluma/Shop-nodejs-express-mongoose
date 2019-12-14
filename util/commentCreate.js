const mongoose = require("mongoose");
const comment = require("../models/comment");
const urlConnect = `mongodb+srv://brogrammers2527:brogrammers2527@cluster0-mwti3.mongodb.net/test?retryWrites=true&w=majority
`;

//Connect to db
mongoose.connect(urlConnect, { useNewUrlParser: true }, err => {
  if (err) throw err;
  console.log("Connect successfully!!");

  var newComment = new comment({
    title: "gud vler",
    name: "guest1",
    content: "so gud",
    star: 5,
    productID: "5df485878e98d6333450f7b6"
  });

  newComment.save(function(err) {
    if (err) throw err;
    console.log("Comment successfully saved.");
  });
});
