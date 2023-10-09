import express from "express";
var app = express();
import request from "request";
import sqlite3 from "sqlite3";
sqlite3.verbose()
const db = new sqlite3.Database('./db/db.sqlite')

db.serialize(() => {
  db.run('CREATE TABLE [IF NOT EXISTS] [schema_name].table_name' (
    column_1, data_type, PRIMARY, KEY,
    column_2, data_type, NOT, NULL,
    column_3, data_type, DEFAULT, 0,
    table_constraints

  ) [WITHOUT [ROWID] ] );
  

  const stmt = db.prepare('INSERT INTO accounts VALUES (?)')
  VALUES
    (email, password, username, id, favorites, )

  for (let i = 0; i < 10; i++) {
    stmt.run(`Ipsum ${i}`)
  }

  stmt.finalize()

  db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
    console.log(`${row.id}: ${row.info}`)
  })
})

db.close()

app.set("port", 3000);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api", function (req, res) {
  const apiURL = req.query.url; // Get the API URL from the query parameters

  if (!apiURL) {
    res.status(400).json({ error: "API URL is missing" });
    return;
  }
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  console.log(
    "[API at: " +
      apiURL +
      " fetched] " +
      "TIME: " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
  );
  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => res.json(data))
    .catch((error) => console.error(error));
});
app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});

