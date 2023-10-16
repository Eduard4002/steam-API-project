import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./assets/css/favorites.css";

function Favorites({ displayFavorites = true }) {

  const [favoriteGameIds, setFavoriteGameIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch user's favorite game IDs from the server
    const userId = {
      uid: localStorage.getItem("CurrLogged"),
    };

    fetch(`http://localhost:3000/favorites/${userId.uid}`)
      .then((response) => response.json())
      .then((data) => {
        setFavoriteGameIds(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
    console.log(favoriteGameIds);
  }, []);

  useEffect(() => {
    if (favoriteGameIds.length == 0) return;

    Promise.all(
      favoriteGameIds.map((id) =>
        fetch(
          "http://localhost:3000/api?url=https://store.steampowered.com/api/appdetails?appids=" +
            id
        )
          .then((response) => response.json())
          .then((json) => json[id].data)
          .catch((error) => {
            // Handle errors that occur during the fetch
            console.error(error);
          })
      )
    ).then((outData) => {
      setData(outData.filter(Boolean));
      console.log("outdata", outData);
    });
  }, [favoriteGameIds]);

  return (
    <>
      <div className="favoritesDiv">
        <h1>Your Favorites </h1>
        {/* <ListGames dataToDisplay={user.favorites} /> */}
        {/* {loading ? (
          <p>Loading...</p>
        ) : ( */}

        {data.map((game) => (
          <span key={game.steam_appid}>
            <Link
              to={"/game/id/" + game.steam_appid}
              key={game.steam_appid}
              onClick={() =>
                localStorage.setItem("Single game", JSON.stringify(game))
              }
            >
              <div className="favoriteCard">
                <img src={game.header_image} alt="Game header_image" />
                <div className="favoriteText">
                  <h3 key={game.name}>{game.name}</h3>
                  <p key={game.short_description}>{game.short_description}</p>
                </div>
                {displayFavorites ? (
                  // Your content for the Favorites component
                  <div className="favoriteSettings">
                    <span className="material-symbols-outlined">grade</span>
                  </div>
                ) : null}
              </div>
            </Link>
          </span>
        ))}
      </div>
    </>
  );
}
export default Favorites;
