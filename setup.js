const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/movie.db');


db.run(`CREATE UNIQUE INDEX idx_prodHouse_id ON Movies(prodHouseId)`)
