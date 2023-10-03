import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ToggleVisibility from "./assets/components/ToggleVisibility";
import StuckMenu from "./assets/components/stuckMenu"; // Import your Slideshow component
import "./assets/css/favorites.css";

function Favorites() {
  const { gameId } = useParams();
  const [itemData, setItemData] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && Array.isArray(user.favorites)) {
    const index = user.favorites.indexOf(itemData);
    // if (index !== -1) {
    //   user.favorites.splice(index, 1);
    //   const updateUser = JSON.stringify(user);
    //   localStorage.setItem("user", updateUser);
    //   console.log("Removed Item:", itemData);
    // }

    const favArrayLength = user.favorites.length;

    for (var i = 0; i < favArrayLength; i++) {
      console.log(user.favorites[i].name);
    }
  } else {
    console.log("User or favorites array not found in localStorage.");
  }

  return (
    <>
      <ToggleVisibility>
        <StuckMenu /> {/* Use the Slideshow component */}
      </ToggleVisibility>
      <div className="favoritesDiv">
        <h1>Your Favorites </h1>

        {user.favorites.map((item, index) => (
          <div key={index} className="favoriteGames">
            <h3>{item.name}</h3>
            <div>
              <a href={item.website}>{item.website}</a>
            </div>
            <img src={item.header_image} alt="Game thumbnail" />
          </div>
        ))}
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
