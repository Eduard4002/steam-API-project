import React, { useEffect, useState } from "react";
import "../css/listGames.css";

function ListGames() {
  const englishCharacterRegex = /^[A-Za-z0-9\s]+$/;
  const [data, setData] = useState([]);
  const [displayedGames, setDisplayedGames] = useState([]);
  const [images, setImages] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0); // Start at 0
  let tempImages = [];
  const gamesPerPage = 10;
  const maxGames = 15;
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
  console.log("Displayed");
  console.log(displayedGames);
  //Used for retrieving the images from another API
  useEffect(() => {
    setImages([]);
    const imageMap = {}; // Create a temporary map to associate images with games

    // Use Promise.all to wait for all fetch calls to complete
    Promise.all(
      displayedGames.map((item) => {
        let url =
          "http://localhost:3000/api?url=https://store.steampowered.com/api/appdetails?appids=" +
          item.appid;

        return fetch(url)
          .then((response) => response.json())
          .then((json) => {
            console.log("----------");
            console.log(
              "Displayed images index: " + displayedGames.indexOf(item)
            );
            console.log("URL: " + url);
            console.log("Response from server: ");
            console.log(json);

            if (json[item.appid] && json[item.appid].data.header_image) {
              imageMap[item.appid] = json[item.appid].data.header_image; // Associate image with game
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
    ).then(() => {
      // Create an array of images based on the displayedGames order
      const imagesForDisplayedGames = displayedGames.map(
        (item) => imageMap[item.appid] || null
      );
      setImages(imagesForDisplayedGames);
    });
  }, [displayedGames]);
  console.log("Images");
  console.log(images);
  return (
    <div>
      
      <div className="mainDiv">
        <div className="filter">
          Filter
        </div>
        <div className="contFlex">
          {displayedGames
            .slice(
              currentIndex * gamesPerPage,
              currentIndex * gamesPerPage + gamesPerPage
            )

            .map((game, index) => (
              <>
                <div className="container" key={game.appid + index}>
                  {images && <img src={images[index]} key={images[index]} className="image"></img>}
                  <div className="textDiv">
                    <h2 key={game.name}>{game.name}</h2>
                    <h2> : </h2>
                    <h2 key={game.appid}>{game.appid}</h2>
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
