import '../src/assets/css/single.css';
import StuckMenu from './assets/components/stuckMenu'; // Import your Slideshow component
import ToggleVisibility from "./assets/components/ToggleVisibility";


function singlegame() {
    return (
        <>
            <ToggleVisibility>
                <StuckMenu /> {/* Use the Slideshow component */}
            </ToggleVisibility>


            <div className="singleContainer">
                <div className="singleInfo">
                    <div className="stars"></div>
                    <h1 className="gameName"></h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos sequi, porro aperiam dolorum enim architecto fugit aut labore earum quas repellat tempore autem! Animi tempora vitae accusantium quae eos natus?</p>

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
