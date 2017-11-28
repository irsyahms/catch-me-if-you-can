const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/movie.db');

class Movie {
  static findAll(cb) {
    let query = `SELECT M.*, P.name_prodHouse
                 FROM Movies AS M
                 LEFT JOIN ProductionHouses AS P
                 ON P.id = M.prodHouseId`

    db.all(query, function(err,rowsMovie) {
      if(!err) {
        cb(null, rowsMovie);
      } else {
        cb(err, null);
      }
    })
  }

  static findAllDropdown(cb) {
    let query = `SELECT *
                 FROM Movies
                 WHERE prodHouseId is NULL
                 `

    db.all(query, function(err,rowsMovie) {
      if(!err) {
        cb(null, rowsMovie);
      } else {
        cb(err, null);
      }
    })
  }

  static findById(id, cb) {
    let query = `SELECT * FROM Movies WHERE id = ${id}`;

    db.all(query, function(errMovies,movie) {
      if(!errMovies) {
        if(movie.length > 0) {
          cb(null, movie)
        }
      } else {
        cb(errMovies,null)
      }
    })
  }

  static create(newMovie, cb) {
    let query = `INSERT INTO
                   Movies
                        (name,
                          released_year,
                          genre,
                          prodHouseId
                        )
                 VALUES (
                         '${newMovie.name}',
                         ${newMovie.released_year},
                         '${newMovie.genre}',
                         ${newMovie.prodHouseId}
                       )`;
    db.run(query, function(err) {
      if(!err) {
        cb();
      } else {
        cb(err);
      }
    })
  }

  static update(dataChanged, id, cb) {
    let query = `UPDATE Movies
                 SET name = '${dataChanged.movie}',
                   released_year = '${dataChanged.released_year}',
                   genre = '${dataChanged.genre}',
                   prodHouseId = ${dataChanged.prodHouseId}
                 WHERE id = ${id}`
    db.run(query, function(err) {
      if(!err) {
        cb()
      } else {
        cb(err)
      }
    })
  }

  static updateAssign(prodHouseId, id, cb) {
    let query = `UPDATE Movies
                 SET prodHouseId = ${prodHouseId}
                 WHERE id = ${id}`;

    db.run(query, function(err) {
      if(!err) {
        cb()
      } else {
        cb(err)
      }
    })
  }

  static destroy(id, cb) {
    let query = `DELETE FROM Movies WHERE id = ${id}`;

    db.run(query, function(err) {
      if(!err) {
        cb()
      } else {
        cb(err)
      }
    })
  }

  static findWhere(column, value, cb) {
    let query = `SELECT * FROM Movies WHERE ${column[0]} = ${value[0]}`
    if(column.length > 1) {
      for (var i = 1; i < column.length; i++) {
        if(value[i] === null) {
          query += ` AND ${column[i]} IS ${value[i]}`
        } else {
          query += ` AND ${column[i]} = ${value[i]}`
        }
      }
    }

    db.all(query, function(err, rows) {
      if(!err) {
        cb(null, rows)
      } else {
        cb(err, null)
      }
    })
  }

}

module.exports = Movie
