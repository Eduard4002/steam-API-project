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
          <img src={Logo} alt="Logo" />
          <h1>Game API</h1>
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
                <Link to={"/login"}><div>Log in</div></Link>
                <a href="#"><div>Profile</div></a>
                <a href="#"><div>Log in</div></a>
                <a href="#"><div>Something</div></a>
            </div>
            <p>Dont have an account? <a href="">Sign up</a> to continue</p>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
