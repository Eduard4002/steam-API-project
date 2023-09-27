import React, { useEffect, useState } from "react";

function ListGames() {
  const [data, setData] = useState([]);
  /*
  var req = new XMLHttpRequest();
  req.open("GET", "http://localhost:3000/getnews", false);
  req.send(null);
  console.log(JSON.parse(req.responseText));*/

  useEffect(() => {
    fetch("http://localhost:3000/api")
      .then((response) => response.json())
      .then((json) => setData(json.applist))

      .catch((error) => console.error(error));
  }, []);
  return <>{data.apps && data.apps.map((item) => console.log(item.name))}</>;
}

export default ListGames;
