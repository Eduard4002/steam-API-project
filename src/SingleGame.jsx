import '../src/assets/css/single.css';
import StuckMenu from './assets/components/stuckMenu'; // Import your Slideshow component
import ToggleVisibility from "./assets/components/ToggleVisibility";
//import LinkGamesPage from './assets/components/LinkGamesPage';
// import { useParams } from 'react-router-dom';

function singlegame() {
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
                        <h1>Game Title</h1>

                        <button className="favesBtn">
                            <p>Add To Favorites</p>
                            <div className="star" id="active"></div>

                        </button>
                        <div className="underFaves">
                            <h5></h5>
                        </div>
                    </div>





                </div>



                <div className="singlePicDiv">
                    <div className="singlePic">
                        <img src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" alt="a" className="gamePic"/>
                        <div className="underPic">
                            
                            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos sequi, porro aperiam dolorum enim architecto fugit aut labore earum quas repellat tempore autem! Animi tempora vitae accusantium quae eos natus?</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default singlegame;
