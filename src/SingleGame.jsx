/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "../src/assets/css/single.css";
import ToggleVisibility from "./assets/components/ToggleVisibility";
import StuckMenu from "./assets/components/stuckMenu"; // Import your Slideshow component
import "./assets/css/slideshow.css";

function Singlegame({ type }) {
  const { value } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [itemData, setItemData] = useState(null);
  let [starActive, setStarActive] = useState(false);

  let data;
  let gameId = 0;
  //data = DataArray();

  useEffect(() => {
    if (itemData) return;
    const cachedData = localStorage.getItem("Single game");

    if (cachedData && cachedData != "" && cachedData != "undefined") {
      console.log("Getting information from localstorage");
      setItemData(JSON.parse(localStorage.getItem("Single game")));
      setLoading(false);
    } /*
      console.log(JSON.parse(localStorage.getItem("Single game")));
      setItemData(JSON.parse(localStorage.getItem("Single game")));
      setLoading(false);*/
  }, []);
  /*
  //const gameId = data[randomIndex].appid;
  useEffect(() => {
    console.log(itemData);
    if (isLoading || type != "index" || itemData) {
      return;
    }
    console.log("Fetching information from API");
    DataArray().then((result) => {
      /*
      let gameId;
      if (type === "id") {
        gameId = value;
      } else {
        gameId = data[value]?.appid;
      }
      gameId = result[value]?.appid;

      console.log("Game id: " + gameId);
      const url = `http://localhost:3000/api?url=https://store.steampowered.com/api/appdetails?appids=${gameId}`;

      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          setItemData(json[gameId].data);
          localStorage.setItem(
            "Single game",
            JSON.stringify(json[gameId].data)
          );
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setError(error);
        });
    });
  }, [value, isLoading]);*/

  //itemData = JSON.parse(localStorage.getItem("Single game"));

  
  //localStorage.setItem("Single game", JSON.stringify(itemData));

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

  if (isLoading || !itemData) {
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
      const newItem = {
        newItem: itemData.steam_appid,
      };
      const uid = {
        uid: localStorage.getItem("CurrLogged"),
      };
      const index = user.favorites.findIndex((fav) => fav.appid === newItem);
      axios
        .post("http://localhost:3000/Singlegame", {
          uid: uid.uid,
          newItem: newItem.newItem,
        })
        .then((response) => {})
        .catch((error) => {
          console.error(error);
        });
    }
    setStarActive(!starActive);
    console.log(starActive);
    console.log("CheckFunction run");
  }
  if (itemData.steam_appid === 0) return <h1>Loading</h1>;
  function favoriteClick() {
    //StarAnim
    setAnimate(true);
    setTimeout(() => setAnimate(false), 200);
    checkAndHandleFavorites();
  }
  // Example usage:

  const buttonStyle = {
    width: "30px",
    background: "none",
    border: "0px",
    padding: "0",
  };
  
  const properties = {
    prevArrow: (
      <button className="left" style={{ ...buttonStyle }}>
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
    ),
    nextArrow: (
      <button className="right" style={{ ...buttonStyle }}>
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    ),
  };

  const gameUrl = "https://store.steampowered.com/app/" + itemData?.steam_appid;
  return (
    <>
      {/* <ToggleVisibility>
        <StuckMenu /> 
      </ToggleVisibility> */}
      <div className="main">
        <div
          className="singleGameDiv"
          style={{
            backgroundImage: `url(${itemData.background})`,
            backgroundAttachment: "fixed", // Fixed position
            backgroundSize: "cover", // Cover the entire div
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="gameTopDiv">
            <div className="leftGameDiv">
              <button className="gameFavBtn" onClick={favoriteClick}>
                <p>Favorite</p>
                <div
                  className={`star ${starActive ? "active" : "inactive"} ${
                    animate ? "animate" : ""
                  }`}
                ></div>
              </button>
              <h1 className="gameTitle">{itemData.name}</h1>
              <p className="gamePrice">
                {itemData.price_overview?.final_formatted || "Free to play"}
              </p>
              <p className="gameInfo">Developers: {itemData.developers}</p>
              <p className="gameInfo">
                Realease date: {itemData.release_date.date}
              </p>
              <div className="genreList gameInfo">
                Genres:
                <span className="smallGameInfo"> Game</span>
                {itemData.genres?.map((item, index) => {
                  return (
                    <span key={index} className="smallGameInfo">
                      , {item.description}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="rightGameDiv">
              <div className="gameImage">
                {/* {itemData.movies.length > 0 ? (
                  itemData.movies.map(({ id, mp4 }) => (
                    <div key={id} className="item">
                      <div className="each-slide-effect">
                        <div>
                          <video width="100%" height="100%" controls autoPlay>
                            <source src={mp4.max} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No videos available</div> //          -------------------------------------Videos?-----------------------------------
                )} */}
                {itemData.screenshots?.length > 0 ? (
                  <Slide {...properties} id="slideContainer">
                    <div className="each-slide-effect">
                      <div
                        style={{
                          backgroundImage: `url(${itemData.header_image})`,
                          backgroundSize: "contain",
                          backgroundPosition: "center center",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></div>
                    </div>
                    {itemData.screenshots
                      .slice(0, 5)
                      .map(({ id, path_full }) => (
                        <div key={id} className="item">
                          <div className="each-slide-effect">
                            <div
                              style={{
                                backgroundImage: `url(${path_full})`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </Slide>
                ) : (
                  <img
                    src={itemData.header_image}
                    alt="Image of Game"
                    className="gameImage"
                  />
                )}
              </div>
              <div className="gameDescription">
                <p>{itemData.short_description}</p>
              </div>
            </div>
          </div>
          <div className="bottomGameDiv">
            <h3>System Requirements:</h3>
            <table>
              <tbody>
                <tr>
                  <td
                    dangerouslySetInnerHTML={{
                      __html: itemData.pc_requirements.minimum,
                    }}
                  ></td>
                  <td
                    dangerouslySetInnerHTML={{
                      __html: itemData.pc_requirements.recommended,
                    }}
                  ></td>
                </tr>
              </tbody>
            </table>
            <h3>
              Get the Full Experience by{" "}
              <a href={gameUrl} target="blank">
                Clicking This Link
              </a>
            </h3>
          </div>

          {/* <div className="singleContainer">
          <div className="singleInfo">
            <h1>{itemData.name}</h1>
            <h1>{itemData.name}</h1>
            <h1>Game Title Placeholder</h1>
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
        </div> */}
        </div>
      </div>
    </>
  );
}
export default Singlegame;
