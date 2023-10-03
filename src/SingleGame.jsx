/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../src/assets/css/single.css";
import ToggleVisibility from "./assets/components/ToggleVisibility";
import StuckMenu from "./assets/components/stuckMenu"; // Import your Slideshow component

function Singlegame() {
  const { gameId } = useParams();
  const [itemData, setItemData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  let [starActive, setStarActive] = useState(false);

  useEffect(() => {
    fetch(
      `http://localhost:3000/api?url=https://store.steampowered.com/api/appdetails?appids=${gameId}`
    )
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        setItemData(json[gameId].data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user && Array.isArray(user.favorites)) {
      const newItemId = itemData.steam_appid;
      const index = user.favorites.indexOf(newItemId);
      console.log("idx", index);
      if (index == -1) {
        setStarActive(false);
      } else {
        setStarActive(true);
      }
    } else {
      console.log("User or favorites array not found in localStorage.");
    }
  }, [isLoading]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const url = `http://localhost:3000/api?url=https://store.steampowered.com/api/appdetails?appids=${gameId}`;
  //         const response = await fetch(url);
  //         const data = await response.json();
  //         setItemData(data);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //     };

  console.log(itemData);
  // console.log(gameId);
  // console.log(isLoading);

  if (error) {
    return (
      <>
        <ToggleVisibility>
          <StuckMenu /> {/* Use the Slideshow component */}
        </ToggleVisibility>

        <h1>{`${error}`}</h1>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <ToggleVisibility>
          <StuckMenu /> {/* Use the Slideshow component */}
        </ToggleVisibility>

        <h1>Loading...</h1>
      </>
    );
  }
  function checkAndHandleFavorites() {
    //LocalStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && Array.isArray(user.favorites)) {
      const newItem = itemData;
      const index = user.favorites.indexOf(newItem);
      if (index !== -1) {
        user.favorites.splice(index, 1);
        const updateUser = JSON.stringify(user);
        localStorage.setItem("user", updateUser);
        console.log("Removed Item:", newItem);
        setStarActive(false);
      } else {
        user.favorites.push(newItem);
        const updateUser = JSON.stringify(user);
        localStorage.setItem("user", updateUser);
        console.log("Added Item:", newItem);
        setStarActive(true);
      }
    } else {
      console.log("User or favorites array not found in localStorage.");
    }
    console.log("CheckFunction run");
  }

  function favoriteClick() {
    //StarAnim
    setAnimate(true);
    setTimeout(() => setAnimate(false), 200);
    checkAndHandleFavorites();
  }

  if (itemData.steam_appid === 0) return <h1>Loading</h1>;
  const gameUrl = "https://store.steampowered.com/app/" + itemData.steam_appid;
  return (
    <>
      <ToggleVisibility>
        <StuckMenu /> {/* Use the Slideshow component */}
      </ToggleVisibility>
      <div className="mainSingleDiv">
        <div className="singleContainer">
          <div className="singleInfo">
            {/* <h1>{itemData.name}</h1> */}
            <h1>{itemData.name}</h1>
            {/* <h1>Game Title Placeholder</h1> */}
            <div className="favesBtnAndUnder">
              <button className="favesBtn" onClick={favoriteClick}>
                <p>Favorite</p>
                <div
                  className={`star ${starActive ? "active" : "inactive"} ${
                    animate ? "animate" : ""
                  }`}
                ></div>
              </button>
              <div className="underFaves">
                <p>
                  Developers: {itemData.developers} + {itemData.price_overview.final_formatted}
                </p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: itemData.pc_requirements.minimum,
                  }}
                ></p>
                <h3>Supported Languages</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: itemData.supported_languages,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
        <div className="singlePicDiv">
          <div className="singlePic">
            <img src={itemData.header_image} alt="a" className="gamePic" />
            <div className="underPic">
              <h4>{itemData.short_description} Description Placeholder</h4>
              <a href={gameUrl}>
                store.steampowered.com/app/{itemData.steam_appid}
              </a>
              <a href=""></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Singlegame;
