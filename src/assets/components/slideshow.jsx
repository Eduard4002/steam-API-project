import { Slide } from "react-slideshow-image";
import "../css/slideshow.css";
import ImagePlaceholder from "../img/imgPlaceholder.jpg";

const Slideshow = () => {
  const images = [ImagePlaceholder, ImagePlaceholder, ImagePlaceholder];

  return (
    <>
      <Slide className="slider">
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
