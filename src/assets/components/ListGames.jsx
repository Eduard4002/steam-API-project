import React, { useEffect, useState } from "react";

function ListGames() {
  const englishCharacterRegex = /^[A-Za-z0-9\s]+$/;

  let [data, setData] = useState([]);

  //Retrieve the information from the server
  useEffect(() => {
    fetch("http://localhost:3000/api")
      .then((response) => response.json())
      .then((json) => setData(json.applist.apps))

      .catch((error) => console.error(error));
  }, []);

  // Check if the game has a name (non-empty) and if the name contains only English characters
  data = data.filter((item) => {
    return item.name && englishCharacterRegex.test(item.name);
  });
  return <>{data && <p>{data.length}</p>}</>;
}
//return <>{data && data.map((item) => console.log(item.name))}</>;
export default ListGames;
