import "../css/header.css";
import Logo from '../img/logo.png'
import {
    Link,
} from "react-router-dom";

let logInOpen = false;
const person = document.getElementById("person");

function openLogIn() {
    if (logInOpen) {
        document.getElementById("profileMenu").style.display = "none";
        if (person) {
            person.style.backgroundColor = "rgb(209,231,248)";
            person.style.color = "rgb(153,159,237)";
        }
        logInOpen = false;
    } else {
        document.getElementById("profileMenu").style.display = "block";
        if (person) {
            person.style.backgroundColor = "rgb(153,159,237)";
            person.style.color = "rgb(209,231,248)";
        }
        logInOpen = true;
    }
}

function Header() {

  return (
    <>
      <nav className="navBar">
        <div className="leftNav">
          <Link to={""}><img src={Logo} alt="Logo" /></Link>
          <Link to={""}><h1>Game API</h1></Link>
        </div>
        <div className="middleNav">
          <input
            type="search"
            name="SearchInput"
            id="searchInput"
            placeholder="Search"
          />
        </div>
        <div className="rightNav">
          <span className="material-symbols-outlined" id="person" onClick={openLogIn}>person</span>
          <span className="material-symbols-outlined">favorite</span>
          <div className="profileMenu" id="profileMenu">
            <div className="profileMenuBtns">
                <Link to={"/login"}><div>Log In</div></Link>
                <Link to={"/signup"}><div>Sign Up</div></Link>
                <Link to={"/profile"}><div>Profile</div></Link>
                <Link to={"/singlegame"}><div>SingleGame</div></Link>
            </div>
            <p>Dont have an account? <Link to={"/signup"}>Sign Up</Link> to continue</p>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
