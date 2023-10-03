import { useEffect, useState } from "react";

function DataArray() {
  const [data, setData] = useState([]);
  const englishCharacterRegex = /^[A-Za-z0-9\s]+$/;
  useEffect(() => {
    // Check if data is already loaded, and return early if it is.

    fetch(
      "http://localhost:3000/api?url=" +
        "http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=A0911E4728A7BFFA31252DC83DEB9573&format=json"
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
function getRandomGames(amount) {
  const data = DataArray();
  console.log("Hello");
  if (data.length === 0) return [];

  if (localStorage.getItem("DATA") != "")
    return JSON.parse(localStorage.getItem("DATA"));

  const shuffledGames = [...data].sort(() => Math.random() - 0.5);

  localStorage.setItem("DATA", JSON.stringify(shuffledGames.slice(0, amount)));
  return shuffledGames.slice(0, amount);
}
export { DataArray, getRandomGames };
