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
  console.log("Hello");

  var url = "https://api.steampowered.com/ISteamApps/GetAppList/v2/";
  console.log("url", url);

  fetch(url)
    .then((response) => response.json())

    .catch((error) => console.error(error));
});
app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
