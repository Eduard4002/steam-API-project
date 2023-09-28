import { Slide } from "react-slideshow-image";
import "../css/slideshow.css";
import ImagePlaceholder from "../img/imgPlaceholder.jpg";

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

const Slideshow = () => {
  const images = [ImagePlaceholder, ImagePlaceholder, ImagePlaceholder];

  return (
    <>
      <Slide {...properties}>
        <div className="each-slide-effect">
          <div style={{ backgroundImage: `url(${images[0]})` }}>
            <span>Game 1</span>
          </div>
        </div>
        <div className="each-slide-effect">
          <div style={{ backgroundImage: `url(${images[1]})` }}>
            <span>Game 2</span>
          </div>
        </div>
        <div className="each-slide-effect">
          <div style={{ backgroundImage: `url(${images[2]}` }}>
            <span>Game 3</span>
          </div>
        </div>
      </Slide>
    </>
  );
};

export default Slideshow;
