import React, { useEffect, useState } from "react";
import "./App.css";
import { getRandomGames } from "./DataArray";
import { Link } from "react-router-dom";
import "./assets/components/Default";
import "./assets/components/ToggleVisibility";
import Slideshow from "./assets/components/slideshow";
import StuckMenu from "./assets/components/stuckMenu"; // Import your Slideshow component
import ImagePlaceholder from "./assets/img/imgPlaceholder.jpg";

function App() {
  const images = [ImagePlaceholder, ImagePlaceholder, ImagePlaceholder];

  const [extraData, setExtraData] = useState([]);

  const currentTime = Date.now();
  const lastRefreshedTime = parseInt(localStorage.getItem("LastRefreshed"), 10);
  const timer = 3 * 60 * 60 * 1000; // 3 hours in miliseconds
  const amountOfGames = 20; // How many games should we fetch / store
  const slideshowAmount = 3; //How many games should we show inside of the slideshow

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
        const filteredArray = tempMapped.filter(Boolean).map((item) => {
          if (item) {
            const {
              steam_appid,
              screenshots,
              name,
              price_overview,
              release_date,
              genres,
              short_description,
              pc_requirements,
              header_image,
              developers,
              background,
              type,
            } = item;

            return {
              steam_appid,
              screenshots,
              name,
              price_overview,
              release_date,
              genres,
              short_description,
              pc_requirements,
              header_image,
              developers,
              background,
              type,
            };
          } else {
            return null;
          }
        });

        window.localStorage.setItem("DATA", JSON.stringify(filteredArray));
        localStorage.setItem("LastRefreshed", currentTime.toString());
        setExtraData(tempMapped.filter(Boolean));
      });
    });
  }, []);

  if (extraData.length === 0) return;

  let imagesArr = [];
  for (
    let i = 0;
    i <
    (extraData.length < slideshowAmount ? extraData.length : slideshowAmount);
    i++
  ) {
    imagesArr.push(extraData[i]);
  }

  return (
    <>
      <div className="appMenu">
        <StuckMenu />
      </div>

      <div className="appContainer">
<div className="topper"> 
  <h1></h1> 
</div>
<p className="par_pop">Popular and recommended</p>

        <div className="slideWrapper" >
          <Slideshow images={imagesArr} />
        </div>
        
        <div className="favoriteGrid">
        
      
          <Link
            to={"/game/id/" + extraData[slideshowAmount + 1].steam_appid}
            key={extraData[slideshowAmount + 1].steam_appid}
            onClick={() =>
              localStorage.setItem(
                "Single game",
                JSON.stringify(extraData[slideshowAmount + 1])
              )
            }
          >
            
            <div
              className="favoriteCard"
              style={{
                backgroundImage: `url(${
                  extraData[slideshowAmount + 1].header_image
                })`,
              }}
            ></div>
          </Link>

          <Link
            to={"/game/id/" + extraData[slideshowAmount + 2].steam_appid}
            key={extraData[slideshowAmount + 2].steam_appid}
            onClick={() =>
              localStorage.setItem(
                "Single game",
                JSON.stringify(extraData[slideshowAmount + 2])
              )
            }
          >
            <div
              className="favoriteCard"
              style={{
                backgroundImage: `url(${
                  extraData[slideshowAmount + 2].header_image
                })`,
              }}
            ></div>
          </Link>
        </div>
      </div>
    </>
  );
}
export default App;
