import express from "express";
var app = express();
import request from "request";

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
  var url = "https://api.steampowered.com/ISteamApps/GetAppList/v2/";

  console.log("API at: " + url + " fetched");
  fetch(url)
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
