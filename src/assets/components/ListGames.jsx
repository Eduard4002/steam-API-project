import React, { useEffect, useState } from "react";

function ListGames() {
  const englishCharacterRegex = /^[A-Za-z0-9\s]+$/;
  const [data, setData] = useState([]);
  const [displayedGames, setDisplayedGames] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Start at 0

  const gamesPerPage = 10;
  const maxGames = 100;

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

  //Retrieve the information from the server
  useEffect(() => {
    fetch("http://localhost:3000/api")
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

  // Function to load the next 10 games
  const loadNextGames = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Function to load the previous 10 games if needed
  const loadPreviousGames = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };
  console.log(displayedGames);
  return (
    <div>
      <button onClick={loadPreviousGames} disabled={currentIndex === 0}>
        <p key="prev">Previous</p>
      </button>
      <p>{currentIndex + 1}</p> {/* Add 1 to display the 1-based index */}
      <button
        onClick={loadNextGames}
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
            <p>{game.appid}</p>
            <p>{game.name}</p>
          </div>
        ))}
    </div>
  );
}

export default ListGames;
