import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/listGames.css";
import StuckMenu from "./stuckMenu"; // Import your Slideshow component
import ToggleVisibility from "./ToggleVisibility";

function ListGames({ dataToDisplay, maxGames = 10, gamesPerPage = 5 }) {
  const [displayedGames, setDisplayedGames] = useState([]);
  const [extraData, setExtraData] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0); // Start at 0

  const descriptionMaxLength = 130;

  //Used for retrieving the images from another API
  useEffect(() => {
    if (dataToDisplay.length === 0) return;

    // Clear the existing images array
    setExtraData([]);

    // Create a temporary map to associate images with games
    const temp = {};

    // Use Promise.all to wait for all fetch calls to complete
    Promise.all(
      displayedGames.map((item) => {
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
      const tempMapped = displayedGames.map((item) => temp[item.appid] || null);
      setDisplayedGames(dataToDisplay.slice(0, maxGames));
      // Update the images state with the fetched images
      setExtraData(tempMapped);
    });
  }, [dataToDisplay, maxGames]); // This useEffect depends on changes in the displayedGames array

  if (dataToDisplay.length === 0) return <h1>LOADING</h1>;

  return (
    <>
      <ToggleVisibility>
        <StuckMenu /> {/* Use the Slideshow component */}
      </ToggleVisibility>
      <div>
        <div className="mainDiv">
          <div className="contFlex">
            {displayedGames

              .slice(
                currentIndex * gamesPerPage,
                currentIndex * gamesPerPage + gamesPerPage
              )

              .map((game, index) => (
                <>
                  <div className="container" key={game.appid + index}>
                    {extraData[currentIndex * gamesPerPage + index] && (
                      <img
                        src={
                          extraData[currentIndex * gamesPerPage + index]
                            .header_image || "src/assets/img/placeholder.webp"
                        }
                        key={extraData[currentIndex * gamesPerPage + index]}
                        className="image"
                      ></img>
                    )}
                    <div className="nameAndDescDiv">
                      <div className="textDiv">
                        <h2
                          key={
                            extraData[currentIndex * gamesPerPage + index]?.name
                          }
                        >
                          {extraData[currentIndex * gamesPerPage + index]?.name}
                        </h2>
                      </div>

                      {extraData[currentIndex * gamesPerPage + index] && (
                        <div
                          className="description"
                          key={
                            extraData[currentIndex * gamesPerPage + index]
                              .short_description
                          }
                        >
                          {/*Does short description exists*/}
                          {extraData[currentIndex * gamesPerPage + index]
                            .short_description != "" || (
                            <p>
                              There does not appear to be a short description
                              for this game
                            </p>
                          )}
                          {/*Is short description too large to fit inside of the container*/}
                          {extraData[currentIndex * gamesPerPage + index]
                            .short_description.length < descriptionMaxLength ? (
                            <p>
                              {
                                extraData[currentIndex * gamesPerPage + index]
                                  .short_description
                              }
                            </p>
                          ) : (
                            /*Short description is too large to fit inside of the container*/
                            <p>
                              {extraData[
                                currentIndex * gamesPerPage + index
                              ].short_description.slice(
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

                      <Link to={"/game/" + game.appid} className="moreButton">
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
            disabled={(currentIndex + 1) * gamesPerPage >= maxGames}
          >
            <p key="next">Next</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default ListGames;
