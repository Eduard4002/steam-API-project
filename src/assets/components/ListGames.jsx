import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/listGames.css";
import "../css/single.css";
import ToggleVisibility from "./ToggleVisibility";
import StuckMenu from "./stuckMenu"; // Import your Slideshow component

function ListGames({ dataToDisplay, maxGames = 20, gamesPerPage = 5 }) {
  const [currentIndex, setCurrentIndex] = useState(0); // Start at 0

  const descriptionMaxLength = 300;
  if (dataToDisplay.length === 0) return;
  const indexAmount = Math.ceil(dataToDisplay.length / gamesPerPage);

  //Create index elements
  const elements = [];
  const test = true;

  // const user = JSON.parse(localStorage.getItem("users"));
  // const index = user.favorites.findIndex((fav) => fav.appid === newItem);
  // if (index !== -1) {
  //   console.log("")
  // }

  for (let i = 0; i < indexAmount; i++) {
    // Generate unique key if needed
    const key = `element_${i}`;
    const className = i === currentIndex ? "activeIndex" : "";
    // Create JSX element and push it into the elements array
    elements.push(
      <button
        className={className}
        key={key}
        onClick={() => setCurrentIndex(i)}
      >
        {i + 1}
      </button>
    );
  }

  const user = JSON.parse(localStorage.getItem("user"));

  const fav = user.favorites;
  // const index = user.favorites.findIndex((fav) => fav.appid === newItem);

  console.log(fav);
  return (
    <>
      <div>
        <div className="mainDiv">
          <div className="contFlex">
            {dataToDisplay
              .slice(
                currentIndex * gamesPerPage,
                currentIndex * gamesPerPage + gamesPerPage
              )
              .map((game, index) => (
                <>
                  <div className="gameDiv" key={game.appid + index}>
                    <Link
                      to={"/game/id/" + game.steam_appid}
                      key={game.steam_appid}
                    >
                      {" "}
                      {/*-------------------- Old Classname = container ------------*/}
                      <div className="gameGrid">
                        <div className="gameImageGridItem gameGridItem">
                          {game && (
                            <img
                              src={
                                game.header_image ||
                                "src/assets/img/placeholder.webp"
                              }
                              key={game.header_image}
                              className="image"
                            ></img>
                          )}
                        </div>
                        <div className="gameTextGridItem gameGridItem">
                          <div className="textDiv">
                            <h2 key={game.name}>{game.name}</h2>
                          </div>
                          {game?.short_description && (
                            <div
                              className="description"
                              key={game?.short_description}
                            >
                              {/*Does short description exists*/}
                              {game?.short_description != "" || (
                                <p>
                                  There does not appear to be a short
                                  description for this game
                                </p>
                              )}
                              {/* Is short description too large to fit inside of the container? */}
                              {game?.short_description.length <
                              descriptionMaxLength ? (
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
                          )}
                        </div>
                        <div className="buttonsDiv">
                          <div
                            className={`star ${
                              fav.find(
                                (item) => item.appid === game.steam_appid
                              )
                                ? "active"
                                : "inactive"
                            }`}
                            key={game.steam_appid + 2}
                          ></div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </>
              ))}
          </div>
        </div>
        <div className="buttons">{elements}</div>
      </div>
    </>
  );
}

export default ListGames;
