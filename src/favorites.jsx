import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Star from "./assets/components/star";
import "./assets/css/favorites.css";
import "./assets/css/listGames.css";

function Favorites({ displayFavorites = true }) {
  const [favoriteGameIds, setFavoriteGameIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const descriptionMaxLength = 130;

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

        {data.map((game, index) => (
          <div className="gameDiv" key={game.appid + index}>
            <Link
              to={"/game/id/" + game.steam_appid}
              key={game.steam_appid}
              onClick={() =>
                localStorage.setItem(
                  "Single game",
                  JSON.stringify(
                    dataToDisplay[currentIndex * gamesPerPage + index]
                  )
                )
              }
            >
              {/*-------------------- Old Classname = container ------------*/}
              <div className="gameGrid">
                <div className="gameImageGridItem gameGridItem">
                  {game && (
                    <img
                      src={
                        game.header_image || "src/assets/img/placeholder.webp"
                      }
                      key={game.header_image}
                      className="image"
                    ></img>
                  )}
                </div>
                <div className="gameTextGridItem gameGridItem">
                  <div className="gameTextDiv">
                    <h2 key={game.name}>{game.name}</h2>
                  </div>

                  <div className="description" key={game?.short_description}>
                    {/*Does short description exists*/}
                    {game?.short_description === "" && (
                      <p>
                        There does not appear to be a short description for this
                        game
                      </p>
                    )}
                    {/* Is short description too large to fit inside of the container? */}
                    {game?.short_description.length < descriptionMaxLength ? (
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
                </div>
              </div>
            </Link>

            <div className="buttonsDiv">
              <button className="starButton">
                <Star gameId={game.steam_appid}></Star>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default Favorites;
