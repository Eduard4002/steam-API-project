import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../src/assets/css/single.css';
import ToggleVisibility from "./assets/components/ToggleVisibility";
import StuckMenu from './assets/components/stuckMenu'; // Import your Slideshow component

function singlegame() {


    const { gameId } = useParams();
    const [itemData, setItemData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);





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

    console.log(itemData);
    console.log(gameId);
    console.log(isLoading);

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

    return (
        <>
            <ToggleVisibility>
                <StuckMenu /> {/* Use the Slideshow component */}
            </ToggleVisibility>

            <div className="mainSingleDiv">

                <div className="singleContainer">
                    <div className="singleInfo">
                        <div className="stars">
                            <div className="star" id="active"></div>
                            <div className="star" id="active"></div>
                            <div className="star" id="active"></div>
                            <div className="star"></div>
                            <div className="star"></div>
                        </div>
                        {/* <h1>{itemData.name}</h1> */}
                        <h1>{itemData.name}</h1>
                        {/* <h1>Game Title Placeholder</h1> */}
                        <div className="favesBtnAndUnder">
                            <button className="favesBtn">
                                <p>Add To Favorites</p>
                                <div className="star" id="active"></div>

                            </button>
                            <div className="underFaves">
                                {/* <p>Pc Requirements: [{itemData.pc_requirements.minimum}Placeholder]</p> */}
                                
                                <p>Developers: [{itemData.developers}]</p>
                                {/* <p>General Information: [{itemData.generalInformation}Placeholder]</p> */}
                                <p dangerouslySetInnerHTML={{__html: itemData.pc_requirements.minimum}}></p>
                                {/* <p>{itemData.pc_requirements.minimum}</p> */}
                                {/* <p>{itemData.supported_languages}</p> */}
                                <h3>Supported Languages</h3>
                                <p dangerouslySetInnerHTML={{__html: itemData.supported_languages}}></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="singlePicDiv">
                    <div className="singlePic">
                        <img src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" alt="a" className="gamePic" />
                        <div className="underPic">

                            <h4>{itemData.short_description} Description Placeholder</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default singlegame;
