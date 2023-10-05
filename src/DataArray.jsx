import { useMemo } from "react";
import { useEffect, useState } from "react";

function DataArray() {
  const [data, setData] = useState([]);
  const allowedCharactersRegex = /^[ A-Za-z0-9_@./#&+-:]*$/;

  useEffect(() => {
    if (data.length > 0) return;

    fetch(
      "http://localhost:3000/api?url=" +
        "http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=A0911E4728A7BFFA31252DC83DEB9573&format=json"
    )
      .then((response) => response.json())
      .then((json) => {
        const games = json.applist.apps;

        const filteredData = games.filter((item) => {
          return item.name && allowedCharactersRegex.test(item.name);
        });
        setData(filteredData);
      })
      .catch((error) => console.error(error));
  }, [data]);

  return data;
}
function getRandomGames(amount) {
  const data = DataArray();

  if (data && data.length === 0) return data;
  const lastRefreshedTime = parseInt(localStorage.getItem("LastRefreshed"), 10);
  const currentTime = Date.now();
  const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
  console.log(currentTime - lastRefreshedTime < fiveMinutes);
  if (
    !isNaN(lastRefreshedTime) &&
    currentTime - lastRefreshedTime < fiveMinutes
  ) {
    console.log("Returning data from localstorage");
    // Data is fresh, return from localStorage
    const cachedData = localStorage.getItem("DATA");
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  }

  // Fetch new data since the data is stale or not available in localStorage
  console.log("Getting new data");
  const shuffledGames = [...data].sort(() => Math.random() - 0.5);
  const newData = shuffledGames.slice(0, amount);

  // Cache the new data and update the last refreshed time
  localStorage.setItem("DATA", JSON.stringify(newData));
  localStorage.setItem("LastRefreshed", currentTime.toString());

  return newData;
}
function getDataLength() {
  return 146994;
}
export { DataArray, getRandomGames, getDataLength };
