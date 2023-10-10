import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import "./assets/components/Default";
import "./assets/components/ToggleVisibility";
import Slideshow from "./assets/components/slideshow";
import StuckMenu from "./assets/components/stuckMenu"; // Import your Slideshow component
import ImagePlaceholder from "./assets/img/imgPlaceholder.jpg";
import { getRandomGames } from "./DataArray";

function App() {
  const images = [ImagePlaceholder, ImagePlaceholder, ImagePlaceholder];

  const [extraData, setExtraData] = useState([]);

  const currentTime = Date.now();
  const lastRefreshedTime = parseInt(localStorage.getItem("LastRefreshed"), 10);
  const timer = 3 * 60 * 60 * 1000; // 3 hours in miliseconds
  const amountOfGames = 20; // How many games should we fetch / store

  const getCachedData = () => {
    if (currentTime - lastRefreshedTime < timer) {
      const cachedData = JSON.parse(window.localStorage.getItem("DATA"));
      if (cachedData && cachedData.length > 0) {
        console.log("Fetching information from localstorage");
        return cachedData;
      }
    }
    return null;
  };

  //Used for retrieving extra data from another API
  useEffect(() => {
    if (extraData.length > 0) return;

    const cached = getCachedData();
    if (cached) {
      setExtraData(cached);
      return;
    }
    //setData(getRandomGames(3));
    //if (extraData.length > 0 || data.length > 0) return;
    getRandomGames(amountOfGames).then((result) => {
      console.log("Fetching information from API");

      // Create a temporary map to associate extra data with games
      const temp = {};

      // Use Promise.all to wait for all fetch calls to complete
      Promise.all(
        result.map((item, index) => {
          // Construct the URL for fetching game details
          let url =
            "http://localhost:3000/api?url=https://store.steampowered.com/api/appdetails?appids=" +
            item.appid;
          // Perform the fetch request
          return fetch(url)
            .then((response) => response.json())
            .then((json) => {
              // Check if the JSON response contains an image URL
              if (json && json[item.appid].success) {
                // Associate the fetched image URL with its corresponding game
                temp[item.appid] = json[item.appid].data;
              }
            })
            .catch((error) => {
              // Handle errors that occur during the fetch
              console.error(error);
            });
        })
      ).then(() => {
        // Create an array of images based on the displayedGames order
        const tempMapped = result.map((item) => temp[item.appid] || null);
        // Update the images state with the fetched images
        window.localStorage.setItem(
          "DATA",
          JSON.stringify(tempMapped.filter(Boolean))
        );
        localStorage.setItem("LastRefreshed", currentTime.toString());
        setExtraData(tempMapped.filter(Boolean));
      });
    });
  }, []);

  if (extraData.length === 0) return;

  let imagesArr = [];
  for (let i = 0; i < 3; i++) {
    imagesArr.push(extraData[i]?.header_image);
  }

  return (
    <>
      {/* Other components */}
      <StuckMenu /> {/* Use the Slideshow component */}
      {/* Other components */}
      <div className="appContainer">
        <div className="slideWrapper">
          <Slideshow images={imagesArr} />
        </div>
        <div className="favoriteGrid">
          <div className="favoriteCard" style={{}}></div>
          <div className="favoriteCard" style={{}}></div>
          <div className="favoriteCard" style={{}}></div>
        </div>
      </div>
    </>
  );
}
export default App;
