import React, { useEffect, useState } from "react";

function ListGames() {
  const englishCharacterRegex = /^[A-Za-z0-9\s]+$/;

  let [data, setData] = useState([]);
  const [displayedGames, setDisplayedGames] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const gamesPerPage = 10;
  const maxGames = 100;

  //Retrieve the information from the server
  useEffect(() => {
    fetch("http://localhost:3000/api")
      .then((response) => response.json())
      .then((json) => setData(json.applist.apps))

      .catch((error) => console.error(error));
    // Check if the game has a name (non-empty) and if the name contains only English characters
    data = data.filter((item) => {
      return item.name && englishCharacterRegex.test(item.name);
    });
    // Shuffle the filtered games randomly
    const shuffledGames = [...data].sort(() => Math.random() - 0.5);

    // Limit the shuffled games to the variable maxGames
    const limitedGames = shuffledGames.slice(0, maxGames);

    // Set the displayed games in the state
    setDisplayedGames(limitedGames);
  }, []);

  // Function to load the next 10 games
  const loadNextGames = () => {
    if (currentIndex + gamesPerPage < displayedGames.length) {
      setCurrentIndex((prevIndex) => prevIndex + gamesPerPage);
    }
  };

  // Function to load the previous 10 games if needed
  const loadPreviousGames = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - gamesPerPage);
    }
  };
  return (
    <div>
      <button onClick={loadPreviousGames} disabled={currentIndex === 0}>
        <p key="prev">Previous</p>
      </button>
      <button
        onClick={loadNextGames}
        disabled={currentIndex + gamesPerPage >= displayedGames.length}
      >
        <p key="next">Next</p>
      </button>
      {displayedGames
        .slice(currentIndex, currentIndex + gamesPerPage)
        .map((game, index) => (
          <>
            <div className="container">
              <p key={game.appid + 1}>{game.appid}</p>

              <p key={index}>{game.name}</p>
            </div>
          </>
        ))}
    </div>
  );
}
//return <>{data && data.map((item) => console.log(item.name))}</>;
export default ListGames;
