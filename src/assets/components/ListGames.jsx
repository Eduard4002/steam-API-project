import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/listGames.css";
import "../css/single.css";
import ToggleVisibility from "./ToggleVisibility";
import StuckMenu from "./stuckMenu"; // Import your Slideshow component

function ListGames({ dataToDisplay, maxGames = 20, gamesPerPage = 5 }) {
  const [extraData, setExtraData] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0); // Start at 0

  const descriptionMaxLength = 130;
  const indexAmount = Math.ceil(dataToDisplay.length / gamesPerPage);

  //Used for retrieving extra data from another API
  useEffect(() => {
    if (dataToDisplay.length === 0) return;
    
    // Clear the existing images array
    setExtraData([]);

    // Create a temporary map to associate extra data with games
    const temp = {};

    // Use Promise.all to wait for all fetch calls to complete
    Promise.all(
      dataToDisplay
        .slice(
          currentIndex * gamesPerPage,
          currentIndex * gamesPerPage + gamesPerPage
        )
        .map((item, index) => {
          // Construct the URL for fetching game details
          let url =
            "http://localhost:3000/api?url=https://store.steampowered.com/api/appdetails?appids=" +
            (item.appid || dataToDisplay[index]);

          console.log(url);

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
      const tempMapped = dataToDisplay.map((item) => temp[item.appid] || null);
      // Update the images state with the fetched images
      setExtraData(tempMapped.filter(Boolean));
    });
  }, [maxGames, currentIndex]); // This useEffect depends on changes in the displayedGames array

  //Create index elements
  const elements = [];
  const test = true
  
  // const user = JSON.parse(localStorage.getItem("users"));
  // const index = user.favorites.findIndex((fav) => fav.appid === newItem);
  // if (index !== -1) {
  //   console.log("")
  // }

  for (let i = 0; i < indexAmount; i++) {
    // Generate unique key if needed
    const key = `element_${i}`;
    const className = i === currentIndex ? "activeIndex" : "";
    // Create JSX element and push it into the elements array
    elements.push(
      <button
        className={className}
        key={key}
        onClick={() => setCurrentIndex(i)}
      >
        {i + 1}
      </button>
    );
  }

  const user = JSON.parse(localStorage.getItem("user"));

  const fav = user.favorites;

  //const index = user.favorites.findIndex((fav) => fav.appid === newItem);

  

  return (
    <>
     
      <div>
        <div className="mainDiv">
          <div className="contFlex">
            {extraData.map((game, index) => (
              <>
                <Link
                      to={"/game/" + game.steam_appid}
                      key={game.steam_appid}
                    >
                <div className="container" key={game.appid + index}>
                  {game && (
                    <img
                      src={
                        game.header_image || "src/assets/img/placeholder.webp"
                      }
                      key={game.header_image}
                      className="image"
                    ></img>
                  )}
                  <div className="nameAndDescDiv">
                    <div className="textDiv">
                      <h2 key={game.name}>{game.name}</h2>
                    </div>

                    {game?.short_description && (
                      <div
                        className="description"
                        key={game?.short_description}
                      >
                        {/*Does short description exists*/}
                        {game?.short_description != "" || (
                          <p>
                            There does not appear to be a short description for
                            this game
                          </p>
                        )}
                        {/*Is short description too large to fit inside of the container?*/}
                        {game?.short_description.length <
                        descriptionMaxLength ? (
                          <p key={game.short_description}>
                            {game.short_description}
                          </p>
                        ) : (
                          /*Short description is too large to fit inside of the container*/
                          <p key={game.short_description}>
                            {game?.short_description.slice(
                              0,
                              descriptionMaxLength
                            ) + "..."}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="buttonsDiv">
                    <div className={`star ${test ? "active" : "inactive"}`}></div>
                      More
                  </div>
                </div>
                </Link>
              </>
            ))}
          </div>
        </div>
        <div className="buttons">{elements}</div>
      </div>
    </>
  );
}

export default ListGames;
