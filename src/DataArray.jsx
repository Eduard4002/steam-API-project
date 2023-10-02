import { useEffect, useState } from "react";

function DataArray() {
  const [data, setData] = useState([]);
  const englishCharacterRegex = /^[A-Za-z0-9\s]+$/;

  //Retrieve all games

  useEffect(() => {
    fetch(
      "http://localhost:3000/api?url=" +
        "http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json"
    )
      .then((response) => response.json())
      .then((json) => {
        const games = json.applist.apps;

        const filteredData = games.filter((item) => {
          return item.name && englishCharacterRegex.test(item.name);
        });
        setData(filteredData);
      })
      .catch((error) => console.error(error));
  }, []);

  return data;
}

export default DataArray;
