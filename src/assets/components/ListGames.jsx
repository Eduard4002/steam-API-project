import React, { useEffect, useState } from "react";
import "../css/listGames.css";

function ListGames() {
  const englishCharacterRegex = /^[A-Za-z0-9\s]+$/;
  const [data, setData] = useState([]);
  const [displayedGames, setDisplayedGames] = useState([]);
  const [images, setImages] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0); // Start at 0
  const [imagesIndex, setImagesIndex] = useState(0); // Start at 0
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

  //Used for retrieving the images from another API
  useEffect(() => {
    // Clear the existing images array
    setImages([]);

    // Create a temporary map to associate images with games
    const imageMap = {};

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
              imageMap[item.appid] = json[item.appid].data.header_image;
            }
          })
          .catch((error) => {
            // Handle errors that occur during the fetch
            console.error(error);
          });
      })
    ).then(() => {
      // Create an array of images based on the displayedGames order
      const imagesForDisplayedGames = displayedGames.map(
        (item) => imageMap[item.appid] || null
      );

      // Update the images state with the fetched images
      setImages(imagesForDisplayedGames);
    });
  }, [displayedGames]); // This useEffect depends on changes in the displayedGames array

  return (
    <div>
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
      {displayedGames
        .slice(
          currentIndex * gamesPerPage,
          currentIndex * gamesPerPage + gamesPerPage
        )
        .map((game, index) => (
          <>
            <div className="container" key={game.appid + index}>
              {images && (
                <img
                  src={
                    images[currentIndex * gamesPerPage + index] ||
                    "src/assets/img/imgPlaceholder.jpg"
                  }
                  key={images[index]}
                ></img>
              )}
              <p key={index}>{currentIndex * gamesPerPage + index}</p>
              <p key={game.appid}>{game.appid}</p>
              <p key={game.name}>{game.name}</p>
            </div>
          </>
        ))}
    </div>
  );
}

export default ListGames;
