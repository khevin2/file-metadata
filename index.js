var express = require("express");
var fileupload = require("express-fileupload");
var mime = require("mime-types");
var cors = require("cors");
require("dotenv").config();

var app = express();
app.use(fileupload());

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", function (req, res) {
  var file;

  if (!req.files) {
    res.send("File was not found");
    return;
  }

  file = req.files.upfile; // here is the field name of the form
  const type = mime.contentType(file);
  console.log(file);

  res.send({ name: file.name, type: file.mimetype, size: file.size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
