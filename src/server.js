import express from "express";
// import sqlite3 from "sqlite3";
var app = express();
import request from "request";
import sqlite3 from "better-sqlite3";
// const db = new sqlite3.Database('./db/db.sqlite')
const db = sqlite3("db/database.sqlite")

// db.serialize(() => {
//   db.run('CREATE TABLE [IF NOT EXISTS] [schema_name].table_name' (
//     column_1, data_type, PRIMARY, KEY,
//     column_2, data_type, NOT, NULL,
//     column_3, data_type, DEFAULT, 0,
//     table_constraints

//   ) [WITHOUT [ROWID] ] );
  

//   const stmt = db.prepare('INSERT INTO accounts VALUES (?)')
//   VALUES
//     (email, password, username, id, favorites, )

//   for (let i = 0; i < 10; i++) {
//     stmt.run(`Ipsum ${i}`)
//   }

//   stmt.finalize()

//   db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
//     console.log(`${row.id}: ${row.info}`)
//   })
// })

// db.close()

db.prepare("CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL)").run()
db.prepare("CREATE TABLE IF NOT EXISTS favorites (gameid INTEGER NOT NULL)").run()
console.log(db.prepare("SELECT * FROM users").all())

/* const user = {
  id: "YEEET",
  username: "admin",
  email: "example@yeet.com",
  password: "hashy",
}

const favorite = {
  uid: "YEEET",
  game_id: 12
} */

app.set("port", 3000);
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const findUserStatement = db.prepare("SELECT id FROM users WHERE username = ?")

const createUserStatement = db.prepare("INSERT INTO users (id, email, username, password) VALUES (?, ?, ?, ?)")

const addToFav = db.prepare("INSERT INTO favorites (gameid) VALUES (?)")

  

app.post('/signup', function(req, res){
  /* const foundUser = findUserStatement.get(req.body.username)

  const foundEmail = findUserStatement.get(req.body.email)

  if (foundUser ) {
    res.status(409)
    res.send("User already exists")
    return
  }

  if (foundEmail) {
    res.status(409)
    res.send("Email already in use")
    return
  } */

  console.log(req.body)

  res.status(200).send("User created successfully");

  createUserStatement.run(req.body.id, req.body.email, req.body.username,  req.body.password)
})

app.post('/singlegame', function(req, res) {
  console.log(req.body)
  addToFav.run(req.body.newItem)
  
  res.status(200).send("OK")
})

app.post('/login', function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  // Query the database to find a user with the entered username and password
  const user = db.prepare("SELECT id FROM users WHERE username = ? AND password = ?").get(username, password);

  if (user) {
    res.json({ success: true, userId: user.id });
  } else {
    res.json({ success: false });
  }
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

