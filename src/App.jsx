import "./App.css";
import "./assets/components/Default";
import "./assets/components/ToggleVisibility";
import StuckMenu from "./assets/components/stuckMenu"; // Import your Slideshow component
import Slideshow from "./assets/components/slideshow";
import ImagePlaceholder from "./assets/img/imgPlaceholder.jpg";
import React, { useEffect, useState } from "react";

function App() {
  const images = [ImagePlaceholder, ImagePlaceholder, ImagePlaceholder];
  const [data, setData] = useState([]);
  const [extraData, setExtraData] = useState([]);

  //Gets 100 top trending games from "steamspy"
  useEffect(() => {
    if (window.localStorage.getItem("Trend") != "[]") {
      setExtraData(JSON.parse(window.localStorage.getItem("Trend")));
      return;
    }
    fetch(
      "http://localhost:3000/api?url=" +
        "https://steamspy.com/api.php?request=top100in2weeks"
    )
      .then((response) => response.json())
      .then((json) => {
        if (typeof json === "object") {
          const dataArray = Object.values(json);
          setData(dataArray);
        } else {
          console.error("API response is not an object:", json);
        }
      })
      .catch((error) => console.error(error));
  }, [data]);
  //Used for retrieving extra data from another API
  useEffect(() => {
    if (window.localStorage.getItem("Trend") != "[]") {
      setExtraData(JSON.parse(window.localStorage.getItem("Trend")));
      return;
    }
    console.log("Fetching information");
    // Clear the existing images array
    setExtraData([]);

    // Create a temporary map to associate extra data with games
    const temp = {};

    // Use Promise.all to wait for all fetch calls to complete
    Promise.all(
      data.slice(0, 10).map((item, index) => {
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
      const tempMapped = data.map((item) => temp[item.appid] || null);
      // Update the images state with the fetched images
      setExtraData(tempMapped.filter(Boolean));
    });
    console.log(extraData);
    window.localStorage.setItem("Trend", JSON.stringify(extraData));
  }, [data]);
  if (extraData.length === 0) return <h1>Loading</h1>;
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
          <div className="favoriteCard" style={{}}>
            <span className="favoriteStar material-symbols-outlined">
              grade
            </span>
          </div>
          <div className="favoriteCard" style={{}}>
            <span className="favoriteStar material-symbols-outlined">
              grade
            </span>{" "}
          </div>
          <div className="favoriteCard" style={{}}>
            <span className="favoriteStar material-symbols-outlined">
              grade
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
