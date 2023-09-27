import React, { useEffect, useState } from "react";

function ListGames() {
  const englishCharacterRegex = /^[A-Za-z0-9\s]+$/;
  const [data, setData] = useState([]);
  const [displayedGames, setDisplayedGames] = useState([]);
  const [images, setImages] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0); // Start at 0

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
    displayedGames.map((item) => {
      fetch(
        "http://localhost:3000/api?url=" +
          "https://store.steampowered.com/api/appdetails?appids=" +
          item.appid
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          if (json[item.appid] && json[item.appid].data.header_image) {
            setImages((prevImages) => [
              ...prevImages,
              json[item.appid].data.header_image,
            ]);
          }
        })
        .catch((error) => console.error(error));
    });
    //setImages(tempArr);
  }, []);
  console.log("Images");
  console.log(images);
  let indexImages = 0;
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
          <div className="container" key={game.appid + index}>
            {images && (
              <img src={images[indexImages++]} key={images[index]}></img>
            )}
            <p>{index}</p>
            <p>{game.appid}</p>
            <p>{game.name}</p>
          </div>
        ))}
    </div>
  );
}

export default ListGames;
