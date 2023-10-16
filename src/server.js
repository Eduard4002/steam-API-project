import sqlite3 from "better-sqlite3";
import cors from "cors";
import express from "express";
import md5 from "md5";

// import sqlite3 from "sqlite3";
var app = express();

// const db = new sqlite3.Database('./db/db.sqlite')
const db = sqlite3("db/database.sqlite");
 

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

db.prepare(
  "CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL)"
).run();
db.prepare(
  "CREATE TABLE IF NOT EXISTS favorites (uid TEXT NOT NULL, gameid INTEGER NOT NULL)"
).run();
console.log(db.prepare("SELECT * FROM users").all());

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

app.use(cors());

const findUserStatement = db.prepare("SELECT id FROM users WHERE username = ?");

const createUserStatement = db.prepare(
  "INSERT INTO users (id, email, username, password) VALUES (?, ?, ?, ?)"
);

const addToFav = db.prepare(
  "INSERT INTO favorites (uid, gameid) VALUES (?, ?)"
);

app.post("/signup", async function (req, res) {
  const foundUser = findUserStatement.get(req.body.username)

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
  } 

  console.log(req.body);

  res.status(200).send("User created successfully");

  createUserStatement.run(
    md5(req.body.id),
    req.body.email,
    req.body.username,
    md5(req.body.password)
  );
});

app.post("/singlegame", function (req, res) {
  const userId = req.body.uid; // Assuming you have the user's ID
  const gameId = req.body.newItem;

  // Check if the game ID exists for the specific user in the favorites
  const existingFavorite = db
    .prepare("SELECT * FROM favorites WHERE uid = ? AND gameid = ?")
    .get(userId, gameId);

  if (existingFavorite) {
    // If the game ID exists in the user's favorites, remove it
    db.prepare("DELETE FROM favorites WHERE uid = ? AND gameid = ?").run(
      userId,
      gameId
    );
    res.status(200).json({ message: "Game removed from favorites" });
  } else {
    // If the game ID is not in the user's favorites, you can add it if needed
    // Add your code here to add the game ID to favorites if required
    // res.status(404).json({ message: "Game not found in favorites" });
    db.prepare("INSERT INTO favorites (uid, gameid) VALUES (?, ?)").run(
      userId,
      gameId
    );
    res.json({ message: "Game added to favorites" });
  }
});

app.post("/singlegame/is-fav", function (req, res) {
  const userId = req.body.uid; // Assuming you have the user's ID
  const gameId = req.body.newItem;

  console.log({ userId, gameId });
  // Check if the game ID exists for the specific user in the favorites
  const existingFavorite = db
    .prepare("SELECT * FROM favorites WHERE uid = ? AND gameid = ?")
    .get(userId, gameId);

  res.send(!!existingFavorite);
});

app.post("/login", function (req, res) {
  const username = req.body.username;
  const password = md5(req.body.password);

  // Query the database to find a user with the entered username and password
  const user = db
    .prepare("SELECT id FROM users WHERE username = ? AND password = ?")
    .get(username, password);

  if (user) {
    res.json({ success: true, userId: user.id });
  } else {
    res.json({ success: false });
  }
});

app.get("/profile/:userId", function (req, res) {
  const userId = req.params.userId;

  const userDetails = db
    .prepare("SELECT username FROM users WHERE id = ?")
    .get(userId);

  if (userDetails) {
    res.json({ username: userDetails.username });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.delete("/profile/:userId", function (req, res) {
  const userId = req.params.userId;

  const userDetails = db
    .prepare("SELECT username FROM users WHERE id = ?")
    .get(userId);

  if (userDetails) {
    db.prepare("DELETE FROM users WHERE id = ?").run(userId);
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.get("/favorites/:userId", function (req, res) {
  const userId = req.params.userId;

  // Query the database to get the list of game IDs in the user's favorites
  const favorites = db
    .prepare("SELECT gameid FROM favorites WHERE uid = ?")
    .all(userId);

  // Extract the game IDs from the result
  const gameIds = favorites.map((favorite) => favorite.gameid);

  res.json(gameIds);
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
    .then((data) => res.json(data));
});
app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
