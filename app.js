const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

const movie = require('./routes/movie');
const prodHouse = require('./routes/prodHouse');

app.use('/movies', movie);
app.use('/prodHouses', prodHouse);


app.listen(process.env.PORT || 3000, function() {
  console.log(`Are you looking for me? 3000`);
})
