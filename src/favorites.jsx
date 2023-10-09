import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ListGames from "./assets/components/ListGames";
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
  } else {
    console.log("User or favorites array not found in localStorage.");
  }
  console.log(user.favorites);
  return (
    <>
      <div className="favoritesDiv">
        <h1>Your Favorites </h1>
        <ListGames dataToDisplay={user.favorites} />
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
