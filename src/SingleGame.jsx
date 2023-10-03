/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../src/assets/css/single.css';
import ToggleVisibility from "./assets/components/ToggleVisibility";
import StuckMenu from './assets/components/stuckMenu'; // Import your Slideshow component

function Singlegame() {


    const { gameId } = useParams();
    const [itemData, setItemData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [starActive, setStarActive] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [favorites, setFavorites] = useState([]);






    useEffect(() => {
        fetch(`http://localhost:3000/api?url=https://store.steampowered.com/api/appdetails?appids=${gameId}`)
            .then((response) => response.json())
            .then((json) => {
                setLoading(false)
                setItemData(json[gameId].data);
            })
            .catch((error) => {
                console.error(error)
                setError(error)
            });
    }, []);






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

    // console.log(itemData);
    // console.log(gameId);
    // console.log(isLoading);

    if (error) {
        return (<>
            <ToggleVisibility>
                <StuckMenu /> {/* Use the Slideshow component */}
            </ToggleVisibility>

            <h1>{`${error}`}</h1>
        </>)
    }

    if (isLoading) {
        return (<>
            <ToggleVisibility>
                <StuckMenu /> {/* Use the Slideshow component */}
            </ToggleVisibility>

            <h1>Loading...</h1>
        </>)
    }

    function favoriteClick() {
        //StarAnim
        setAnimate(true)
        setStarActive(!starActive)
        setTimeout(() => setAnimate(false), 200)

        //LocalStorage
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && Array.isArray(user.favorites)) {
            const newItemId = itemData.steam_appid;
            const index = user.favorites.indexOf(newItemId);
            if (index !== -1) {
                user.favorites.splice(index, 1);
                const updateUser = JSON.stringify(user);
                localStorage.setItem("user", updateUser);
                console.log("Removed ID:", newItemId);
            } else {
                user.favorites.push(newItemId);
                const updateUser = JSON.stringify(user);
                localStorage.setItem("user", updateUser);
                console.log("Added ID:", newItemId);
            }
        } else {
            console.log("User or favorites array not found in localStorage.");
        }
    }

    if (itemData.steam_appid === 0) return <h1>Loading</h1>
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
                                <p>Add To Favorites</p>
                                <div className={`star ${starActive ? "active" : "inactive"} ${animate ? "animate" : ""}`} ></div>

                            </button>
                            <div className="underFaves">

                                <p>Developers: [{itemData.developers}]</p>
                                <p dangerouslySetInnerHTML={{ __html: itemData.pc_requirements.minimum }}></p>
                                <h3>Supported Languages</h3>
                                <p dangerouslySetInnerHTML={{ __html: itemData.supported_languages }}></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="singlePicDiv">
                    <div className="singlePic">
                        <img src={itemData.capsule_image} alt="a" className="gamePic" />
                        <div className="underPic">

                            <h4>{itemData.short_description} Description Placeholder</h4>
                            <a href={gameUrl}>store.steampowered.com/app/{itemData.steam_appid}</a>
                            <a href=""></a>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Singlegame;
