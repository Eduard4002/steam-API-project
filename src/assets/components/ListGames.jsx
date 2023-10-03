import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/listGames.css";
import StuckMenu from "./stuckMenu"; // Import your Slideshow component
import ToggleVisibility from "./ToggleVisibility";

function ListGames({ dataToDisplay, maxGames = 10, gamesPerPage = 5 }) {
  const [extraData, setExtraData] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0); // Start at 0

  const descriptionMaxLength = 130;

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
        .map((item) => {
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
      const tempMapped = dataToDisplay.map((item) => temp[item.appid] || null);
      // Update the images state with the fetched images
      setExtraData(tempMapped.filter(Boolean));
    });
  }, [dataToDisplay, maxGames, currentIndex]); // This useEffect depends on changes in the displayedGames array
  console.log(extraData);
  return (
    <>
      <ToggleVisibility>
        <StuckMenu /> {/* Use the Slideshow component */}
      </ToggleVisibility>
      <div>
        <div className="mainDiv">
          <div className="contFlex">
            {extraData.map((game, index) => (
              <>
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
                    <div className="five-pointed-star"></div>

                    <Link
                      to={"/game/" + game.steam_appid}
                      className="moreButton"
                      key={game.steam_appid}
                    >
                      More
                    </Link>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="buttons">
          <button
            onClick={() => setCurrentIndex((prevIndex) => prevIndex - 1)}
            disabled={currentIndex === 0}
          >
            <p key="prev">Previous</p>
          </button>
          <p>{currentIndex + 1}</p> {/* Add 1 to display the 1-based index */}
          <button
            onClick={() => setCurrentIndex((prevIndex) => prevIndex + 1)}
            disabled={(currentIndex + 1) * gamesPerPage >= dataToDisplay.length}
          >
            <p key="next">Next</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default ListGames;
