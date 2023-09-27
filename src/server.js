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
  const apiURL = req.query.url; // Get the API URL from the query parameters

  if (!apiURL) {
    res.status(400).json({ error: "API URL is missing" });
    return;
  }

  console.log("API at: " + apiURL + " fetched");
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
