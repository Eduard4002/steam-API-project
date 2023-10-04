import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./assets/css/signUpPage.css";

function SignUp() {
  const navigate = useNavigate();

  function storeData() {

    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const userKey = username;

    let userData = []; 
    userData.push({ "email": email });
    userData.push({ "username": username });
    userData.push({ "password": password });
    userData.push({ "id": uuidv4() });
    userData.push({ "favorites": [] });

    const userDataString = JSON.stringify(userData);

    // if (window.localStorage.getItem(userKey)) {
    //   alert("Username is taken.");
    //   return;
    // }
    let usersLocalstorage = window.localStorage.getItem("users");
    if (usersLocalstorage) {
      let users = JSON.parse(window.localStorage.getItem("users"));
      users.push(userData);
      window.localStorage.setItem("users", JSON.stringify(users));
    } else {
      window.localStorage.setItem("users", userDataString);
    }

    
    window.localStorage.setItem("CurrLogged", userData.id);

    
    navigate("/");
  }

  // Check if there's a 'logged' key in localStorage
  const loggedInUserId = localStorage.getItem("CurrLogged");

  if (loggedInUserId != "0") {
    return (
      <p className="logInQ">
        You are already logged in. Go to <Link to={"/"}> Home Page </Link> or{" "}
        <Link to={"/profile"}> Profile Page </Link> to continue.{" "}
      </p>
    );
  }

  return (
    <>
      <div className="signUpDiv">
        <h3>Sign Up</h3>
        <form onSubmit={storeData} className="signUpForm">
          <label>E-Mail:</label>
          <br />
          <input
            type="email"
            id="email"
            name="lname"
            placeholder="E-Mail"
            required
          ></input>
          <br />
          <label>Username:</label>
          <br />
          <input
            type="text"
            id="username"
            name="fname"
            placeholder="Username"
            required
          ></input>
          <br />
          <label>Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="lname"
            placeholder="Password"
            required
          ></input>
          <br />
          <input type="submit" value="Submit"></input>
          <br />
        </form>
        <p className="logInQ">
          Already got an account? <Link to={"/login"}>Log in</Link> to continue
        </p>
      </div>
    </>
  );
}

export default SignUp;
