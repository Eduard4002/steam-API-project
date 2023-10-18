import sqlite3 from "better-sqlite3";
import cors from "cors";
import express from "express";
import md5 from "md5";

var app = express();

const db = sqlite3("db/database.sqlite");
 
//Create database tables, users and favorites
db.prepare(
  "CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL)"
).run();
db.prepare(
  "CREATE TABLE IF NOT EXISTS favorites (uid TEXT NOT NULL, gameid INTEGER NOT NULL)"
).run();


//Set up and prepare database
app.set("port", 3000);
app.use(express.json());

app.use(cors());

//Find username and email from database
const findUserNameStatement = db.prepare("SELECT id FROM users WHERE username = ?");

const findEmailStatement = db.prepare("SELECT id FROM users WHERE email = ?")

//Create a user in database
const createUserStatement = db.prepare(
  "INSERT INTO users (id, email, username, password) VALUES (?, ?, ?, ?)"
);

const addToFav = db.prepare(
  "INSERT INTO favorites (uid, gameid) VALUES (?, ?)"
);

//Sign up
app.post("/signup", function (req, res) {
  const foundUser = findUserNameStatement.get(req.body.username)

  const foundEmail = findEmailStatement.get(req.body.email)
  

  // Is username already taken?
  if (foundUser ) {
    res.status(409)
    res.send("User already exists")
    return
  }

  //Is email already in use?
  if (foundEmail) {
    res.status(409)
    res.send("Email already in use")
    return
  } 

  res.status(200).send("User created successfully");
  //Create user based on the details user entered on page
  createUserStatement.run(
    req.body.id,
    req.body.email,
    req.body.username,
    md5(req.body.password)
  );
  
});

//Favorite from single-game
app.post("/singlegame", function (req, res) {
  const userId = req.body.uid; 
  const gameId = req.body.newItem;

  //Check for game in favorites
  const existingFavorite = db
    .prepare("SELECT * FROM favorites WHERE uid = ? AND gameid = ?")
    .get(userId, gameId);

  //Is game in favorites? Remove it!
  if (existingFavorite) {
    db.prepare("DELETE FROM favorites WHERE uid = ? AND gameid = ?").run(
      userId,
      gameId
    );
    res.status(200).json({ message: "Game removed from favorites" });
    //Is it not in favorites? Add it!
  } else {

    db.prepare("INSERT INTO favorites (uid, gameid) VALUES (?, ?)").run(
      userId,
      gameId
    );
    res.json({ message: "Game added to favorites" });
  }
});


//Is game in favorites?
app.post("/singlegame/is-fav", function (req, res) {
  const userId = req.body.uid; 
  const gameId = req.body.newItem;

  

  const existingFavorite = db
    .prepare("SELECT * FROM favorites WHERE uid = ? AND gameid = ?")
    .get(userId, gameId);

  res.send(!!existingFavorite);
});

//Log in
app.post("/login", function (req, res) {
  const username = req.body.username;
  const password = md5(req.body.password);

  //Details match?
  const user = db
    .prepare("SELECT id FROM users WHERE username = ? AND password = ?")
    .get(username, password);

  //If details match, log in!
  if (user) {
    res.json({ success: true, userId: user.id });

  //If they do not match, do NOT log in :>
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

//Delete account!
app.delete("/profile/:userId", function (req, res) {
  const userId = req.params.userId;

  //Find the user first
  const userDetails = db
    .prepare("SELECT username FROM users WHERE id = ?")
    .get(userId);

  //If user is found, delete the account!
  if (userDetails) {
    db.prepare("DELETE FROM users WHERE id = ?").run(userId);
    db.prepare("DELETE FROM favorites WHERE uid = ?").run(userId)
    res.json({ message: "User deleted successfully" });
  
  //If user is not found, don't do anything
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

//Favoritefinding, displaying favorites
app.get("/favorites/:userId", function (req, res) {
  const userId = req.params.userId;

  const favorites = db
    .prepare("SELECT gameid FROM favorites WHERE uid = ?")
    .all(userId);

  const gameIds = favorites.map((favorite) => favorite.gameid);

  res.json(gameIds);
});

//Change user password!
app.post("/changepassw", function (req, res) {
  const userId = req.body.uid;
  const currentPassword = md5(req.body.currentPassword);
  const newPassword = md5(req.body.newPassword);

  const user = db
    .prepare("SELECT password FROM users WHERE id = ?")
    .get(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const currentHashedPassword = user.password;

  if (currentPassword === currentHashedPassword) {

    db.prepare("UPDATE users SET password = ? WHERE id = ?").run(newPassword, userId);
    res.json({ success: true });
  } else {

    res.status(401).json({ error: "Current password is incorrect" });
  }
});

app.get("/api", function (req, res) {
  const apiURL = req.query.url; 

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
