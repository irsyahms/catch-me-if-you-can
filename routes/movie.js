const express = require('express');
const router = express.Router();

const Movie = require('../models/movie');
const ProductionHouse = require('../models/prodHouse');

router.get('/', function(req,res) {

  Movie.findAll(function(err,rowsMovie) {
      if(!err) {
        ProductionHouse.findAll(function(errProdHouse,rowsProdHouse) {
          if(!errProdHouse) {
            res.render('movie', {dataMovie: rowsMovie, dataProdHouse: rowsProdHouse});
          } else {
            res.send(errProdHouse)
          }
        })
      } else {
        res.send(err)
      }
  })
});

router.post('/', function(req, res) {
  let newMovie = {
    name: req.body.name,
    released_year: req.body.released_year,
    genre: req.body.genre,
    prodHouseId: req.body.prodHouseId === ''?null:req.body.prodHouseId
  }

  Movie.create(newMovie, function(err) {
    if(!err) {
      res.redirect('/movies');
    } else {
      console.log(err);
      res.send(err);
    }
  })
})

router.get('/edit/:id', function(req,res) {
  Movie.findById(req.params.id, function(errMovies, movie) {
    if(!errMovies) {
      if(movie.length > 0) {
        ProductionHouse.findAll(function(errProdHouse,rowsProdHouse) {
          if(!errProdHouse) {
            res.render('editMovie', {movie: movie[0], dataProdHouse: rowsProdHouse})
          } else {
            res.send(errProdHouse)
          }
        })
      }
    } else {
      res.send(errMovies)
    }
  })

})

router.post('/edit/:id', function(req,res) {
  Movie.update(req.body, req.params.id, function(err) {
      if(!err) {
        res.redirect('/movies');
      } else {
        res.send(err)
      }
  })
})

router.get('/delete/:id', function(req, res) {
  Movie.destroy(req.params.id, function(err) {
    if(!err) {
      res.redirect('/movies');
    } else {
      console.log(err);
      res.send(err);
    }
  })
})

module.exports = router
