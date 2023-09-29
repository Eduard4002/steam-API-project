import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/listGames.css";

function ListGames() {


  const englishCharacterRegex = /^[A-Za-z0-9\s]+$/;
  const [data, setData] = useState([]);
  const [displayedGames, setDisplayedGames] = useState([]);
  const [extraData, setExtraData] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0); // Start at 0

  const gamesPerPage = 10;
  const maxGames = 2;
  const descriptionMaxLength = 130;
  const allAppsURL =
    "http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json";

  // Function to filter and limit games
  const filterAndLimitGames = (games) => {
    // Check if the game has a name (non-empty) and if the name contains only English characters
    const filteredData = games.filter((item) => {
      return item.name && englishCharacterRegex.test(item.name);
    });

    // Shuffle the filtered games randomly
    const shuffledGames = [...filteredData].sort(() => Math.random() - 0.5);

    // Limit the shuffled games to the variable maxGames
    const limitedGames = shuffledGames.slice(0, maxGames);

    return limitedGames;
  };

  //Retrieve all games
  useEffect(() => {
    fetch("http://localhost:3000/api?url=" + allAppsURL)
      .then((response) => response.json())
      .then((json) => {
        const games = json.applist.apps;
        setData(games);

        // Call the filtering and limiting function and set displayedGames
        const limitedGames = filterAndLimitGames(games);
        setDisplayedGames(limitedGames);
      })
      .catch((error) => console.error(error));
  }, []);

  //Used for retrieving the images from another API
  useEffect(() => {
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
            if (json[item.appid].success) {
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

      // Update the images state with the fetched images
      setExtraData(tempMapped);
    });
  }, [displayedGames]); // This useEffect depends on changes in the displayedGames array

  console.log(extraData);
  //console.log(extraData[0].header_image);
  return (
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
                      <h2 key={game.name}>{game.name}</h2>
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
                              There does not appear to be a short description for
                              this game
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
                            ].short_description.slice(0, descriptionMaxLength) +
                              "..."}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="buttonsDiv">
                    <div className="five-pointed-star"></div>

                    <Link to={"/game/:" + game.appid} className="moreButton">
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
  );
}

export default ListGames;
