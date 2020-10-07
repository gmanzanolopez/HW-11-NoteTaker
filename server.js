var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



app.listen(PORT, function() {
  console.log(`Server is listening on PORT: ${PORT}`);
});