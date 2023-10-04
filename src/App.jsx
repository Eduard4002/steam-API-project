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
  }, []);
  //Used for retrieving extra data from another API
  useEffect(() => {
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
  }, []); // This useEffect depends on changes in the displayedGames array
  console.log(extraData);
  return (
    <>
      {/* Other components */}
      <StuckMenu /> {/* Use the Slideshow component */}
      {/* Other components */}
      <div className="appContainer">
        <div className="slideWrapper">
          <Slideshow />
        </div>
        <div className="favoriteGrid">
          <div
            className="favoriteCard"
            style={{ backgroundImage: `url(${images[0]}` }}
          >
            <span className="favoriteStar material-symbols-outlined">
              grade
            </span>
          </div>
          <div
            className="favoriteCard"
            style={{ backgroundImage: `url(${images[1]}` }}
          >
            <span className="favoriteStar material-symbols-outlined">
              grade
            </span>{" "}
          </div>
          <div
            className="favoriteCard"
            style={{ backgroundImage: `url(${images[2]}` }}
          >
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
