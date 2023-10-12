import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./assets/css/favorites.css";

function Favorites() {
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
      console.log("outdata", outData)
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
          <div key={game.steam_appid}>
            <p key={game.name}>{game.name}</p>
            <img src={game.header_image} alt="a" />
            <p key={game.short_description}>{game.short_description}</p>
          </div>
        ))}
        
        {/* )} */}
        <template>
          <Link to={""}>
            <div className="favoriteCard">
              <div className="favoriteText">
                <p>Hejsan på digsan</p>
              </div>
              <div className="favoriteSettings">
                <span className="material-symbols-outlined">grade</span>
              </div>
            </div>
          </Link>
        </template>
      </div>
    </>
  );
}
export default Favorites;
