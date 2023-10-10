import "../css/footer.css";
import Logo from '../img/logo.png';

function Footer() {
  return (
    <>
      <footer>
        
        <div>
          <a href="#">Categories</a> | <a href="#">Something</a> |{" "}
          <a href="#">Nothing</a> | <a href="#">Say Whatttt???</a>
        </div>
        <div className="logoDiv">
          <img src={Logo} alt="Logo" />
          <h1>Game<span className="hubClass">hub</span></h1>
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
