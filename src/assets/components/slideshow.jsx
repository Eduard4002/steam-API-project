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

const Slideshow = ({ images }) => {
  return (
    <>
      <Slide {...properties}>
        {images?.map((image, index) => (
          <div key={index} className="each-slide-effect">
            <div style={{ backgroundImage: `url(${image})` }}></div>
          </div>
        ))}
      </Slide>
    </>
  );
};

export default Slideshow;
