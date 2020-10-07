var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/db'));

var notes = require("./db/db.json");

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/api/notes", function(req, res) {
  return res.json(notes);
});
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/api/notes", function(req, res) {
  var note = req.body;
  if(notes.length === 0){
    Object.assign(note, {"id": "0"})
  }else{
    var lastId = parseInt(notes[notes.length -1].id);
    Object.assign(note, {"id": (lastId + 1).toString()})
  }
  console.log(note);
  notes.push(note);
  res.json(note);
});

app.delete("/api/notes/:id", function(req, res){
  var chosen = req.params.id;
  for (var i = 0; i < notes.length; i++){
    if (chosen === notes[i].id)
    notes.splice([i],1)
  }
  return res.json(notes)
})

app.listen(PORT, function() {
  console.log("listening on PORT " + PORT);
});