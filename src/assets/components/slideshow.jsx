import { Slide } from "react-slideshow-image";
import "../css/slideshow.css";
import ImagePlaceholder from "../img/imgPlaceholder.jpg";
import { Link } from "react-router-dom";

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
        {images.map((image, index) => {
          return (
            <Link
              to={"/game/id/" + image.steam_appid}
              key={image.steam_appid}
              onClick={() =>
                localStorage.setItem("Single game", JSON.stringify(image))
              }
            >
              <div key={index} className="each-slide-effect">
                <div
                  style={{ backgroundImage: `url(${image.header_image})` }}
                ></div>
              </div>
            </Link>
          );
        })}
      </Slide>
    </>
  );
};

export default Slideshow;
