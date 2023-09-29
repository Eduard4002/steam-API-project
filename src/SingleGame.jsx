import '../src/assets/css/single.css';
import StuckMenu from './assets/components/stuckMenu'; // Import your Slideshow component
import ToggleVisibility from "./assets/components/ToggleVisibility";
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function singlegame() {


    const { gameId } = useParams();
  const [itemData, setItemData] = useState([]);





  useEffect(() => {
    fetch(`http://localhost:3000/api?url=https://store.steampowered.com/api/appdetails?appids=${gameId}`)
      .then((response) => response.json())
      .then((json) => {
        setItemData(json[gameId].data);
      })
      .catch((error) => console.error(error));
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

    console.log (itemData);
    console.log(gameId);

    return (
        <>
            <ToggleVisibility>
                <StuckMenu /> {/* Use the Slideshow component */}
            </ToggleVisibility>

            <div className="singleContainer">
                <div className="singleInfo">
                    <div className="stars"></div>
                    <h1>{itemData.name}</h1>
                    <p> {itemData.short_description} </p>

                    <button className="favesBtn"><div className="star" id="active"></div></button>
                    <div className="underFaves">
                        <h5></h5>
                    </div>
                </div>



                <div className="singlePic">
                    <img src="" alt="" />
                    <div className="underPic">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos sequi, porro aperiam dolorum enim architecto fugit aut labore earum quas repellat tempore autem! Animi tempora vitae accusantium quae eos natus?</p>
                    </div>
                </div>

            </div>
        </>
    );
}
export default singlegame;
