const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/movie.db');

class ProductionHouse {

  static findAll(cb) {
    let query = `SELECT * FROM ProductionHouses`

    db.all(query, function(err,rowsProdHouse) {
      if(!err) {
        cb(null, rowsProdHouse)
      } else {
        cb(err, null)
      }
    })
  }

  static findById(id, cb) {
    let query = `SELECT * FROM ProductionHouses where id = ${id}`

    db.all(query, function(err,rowsProdHouse) {
      if(!err) {
        cb(null, rowsProdHouse)
      } else {
        cb(err, null)
      }
    })
  }

  static create(newProdHouse, cb) {
    let query = `INSERT INTO
                   ProductionHouses
                        (name_prodHouse,
                          origin_city
                        )
                 VALUES (
                         '${newProdHouse.name_prodHouse}',
                         ${newProdHouse.origin_city}
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
                 SET name_prodHouse = '${dataChanged.name_prodHouse}',
                   origin_city = '${dataChanged.origin_city}'
                 WHERE id = ${id}`
    db.run(query, function(err) {
      if(!err) {
        cb()
      } else {
        cb(err)
      }
    })
  }
}

module.exports = ProductionHouse
