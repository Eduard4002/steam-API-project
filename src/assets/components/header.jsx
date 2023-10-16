import { Link, Navigate } from "react-router-dom";
import "../css/header.css";
import Logo from "../img/logo.png";
import { useState, useEffect } from "react";

let logInOpen = false;
let storedLogin;
const person = document.getElementById("person");
const profileMenu = document.getElementById("profileMenu");

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
function HandleSearch(event) {
  event.preventDefault();
  const inputValue = document.getElementById("searchInput").value;
  console.log(inputValue);

  const url = "/result/" + inputValue;
  window.location.href = url;
}
/*
window.addEventListener("click", function (e) {
  if (logInOpen) {
    if (
      e.target != profileMenu &&
      e.target != document.getElementById("person")
    ) {
      document.getElementById("profileMenu").style.display = "none";
      logInOpen = false;
    }
  } else {
    storedLogin = localStorage.getItem("CurrLogged") !== null;
  }
});*/

function Header() {
  const [storedLogin, setStoredLogin] = useState(
    localStorage.getItem("CurrLogged") !== null
  );
  const [isLoading, setIsLoading] = useState(true);

  function logOut() {
    localStorage.removeItem("CurrLogged");
    setStoredLogin(false);
    setIsLoading(false);
    //Navigate("/");
    window.location.href = "/";
  }

  useEffect(() => {
    function handleWindowClick(e) {
      if (logInOpen) {
        if (
          e.target !== document.getElementById("profileMenu") &&
          e.target !== document.getElementById("person")
        ) {
          document.getElementById("profileMenu").style.display = "none";
          logInOpen = false;
        }
      } else {
        const isLogged = localStorage.getItem("CurrLogged") !== null;
        setStoredLogin(isLogged);
      }
    }
    setIsLoading(false);

    window.addEventListener("click", handleWindowClick);

    // Cleanup the listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [logInOpen, isLoading, storedLogin]);
  console.log(isLoading);
  if (isLoading) return;
  return (
    <>
      <nav className="navBar">
        <div className="leftNav">
          <Link to={""}>
            <img src={Logo} alt="Logo" />
          </Link>
          <Link to={""}>
            <h1 className="logoh1">
              Game<span className="hubClass">hub</span>
            </h1>
          </Link>
        </div>
        <div className="middleNav">
          <form onSubmit={HandleSearch}>
            <input
              type="search"
              name="SearchInput"
              id="searchInput"
              placeholder="Search"
            />
          </form>
        </div>
        <div className="rightNav">
          <span
            className="material-symbols-outlined"
            id="person"
            onClick={openLogIn}
          >
            person
          </span>
          <Link to={"/favorites"}>
            <span className="material-symbols-outlined">grade</span>
          </Link>
          <div className="profileMenu" id="profileMenu">
            <div className="profileMenuBtns">
              {storedLogin ? (
                <>
                  <Link to={"/profile"} onClick={openLogIn}>
                    <div>Profile</div>
                  </Link>
                  <Link to={""} onClick={openLogIn}>
                    <div onClick={logOut}>Log Out</div>
                  </Link>
                </>
              ) : (
                <>
                  <Link to={"/login"} onClick={openLogIn}>
                    <div>Log In</div>
                  </Link>
                  <Link to={"/signup"} onClick={openLogIn}>
                    <div>Sign Up</div>
                  </Link>
                </>
              )}
            </div>
            <p>
              Dont have an account?{" "}
              <Link to={"/signup"} onClick={openLogIn}>
                Sign Up
              </Link>{" "}
              to continue
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
