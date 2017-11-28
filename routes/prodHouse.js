const express = require('express');
const router = express.Router();

const ProductionHouse = require('../models/prodHouse');
const Movie = require('../models/movie');

router.get('/', function(req,res){
  ProductionHouse.findAll(function(err,rowsProdHouse) {
    rowsProdHouse.forEach((prodHouse, index) => {
      let arrMovies = []
      Movie.findWhere(['prodHouseId'], [prodHouse.id], function(err, movies) {
        movies.forEach(movie => {
          arrMovies.push(movie.name)
        })

        prodHouse.movies = arrMovies
        if(index === rowsProdHouse.length-1) {
          res.render('prodHouse', {dataProdHouse: rowsProdHouse});
        }

      })
    })
  })
})

router.post('/', function(req, res) {
  ProductionHouse.create(req.body, function(err) {
    if(!err) {
      res.redirect('/prodHouses');
    } else {
      console.log(err);
      res.send(err);
    }
  })
})

router.get('/edit/:id', function(req, res) {
  ProductionHouse.findById(req.params.id, function(err, prodHouse) {
    res.render('editProdHouse', {prodHouse: prodHouse[0]})
  })
})

router.post('/edit/:id', function(req, res) {
  ProductionHouse.update(req.body, req.params.id, function(err) {
    if(!err) {
      res.redirect('/prodHouses');
    } else {
      console.log(err);
      res.send(err);
    }
  })
})

router.get('/:id/assignMovie', function(req, res) {
  ProductionHouse.findById(req.params.id, function(err, prodHouse) {
    Movie.findAll(function(err, movies) {
      res.render('assignMovie', {dataProdHouse: prodHouse[0], movies: movies, err: null})
    })
  })
})

router.post('/:id/assignMovie', function(req, res) {
  arrColumn = ['id', 'prodHouseId'];
  arrValue = [req.body.movieId, req.params.id];

  Movie.findWhere(arrColumn, arrValue, function(err, checker) {
    if(!err) {
      if(checker.length > 0) {
        ProductionHouse.findById(req.params.id, function(err, prodHouse) {
          Movie.findAll(function(err, movies) {
            res.render('assignMovie', {dataProdHouse: prodHouse[0], movies: movies, err: 'Movie already assigned'})
          })
        })
      } else {
        Movie.updateAssign(req.params.id, req.body.movieId, function(err) {
          if(!err) {
            res.redirect('/movies');
          } else {
            console.log(err);
            res.send(err)
          }
        })
      }
    }
  })
})

module.exports = router
