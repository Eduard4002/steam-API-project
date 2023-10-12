import "../css/footer.css";
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";

function Footer() {

  return (
    <>
      <footer>
        <div className="footLinks">
          <Link to={"/"}>
            <div>Main Page</div>
          </Link>
          <div>&nbsp;|&nbsp;</div>
          <Link to={"/games"}>
            <div>Games</div>
          </Link>
          <div>&nbsp;|&nbsp;</div>
          <Link to={"/profile"}>
            <div>Profile</div>
          </Link>
          <div>&nbsp;|&nbsp;</div>
          <Link to={"/about"}>
            <div>About</div>
          </Link>
        </div>
        <div className="logoDiv">
          <img src={Logo} alt="Logo" />
          <h1>
            Game<span className="hubClass">hub</span>
          </h1>
        </div>
        <div>
          <p>Carl Krooks Gata 9, Helsingborg</p>
        </div>
        <div>
          <span>Copyright &copy; 2023 Game Hub. No rights reserved.</span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
