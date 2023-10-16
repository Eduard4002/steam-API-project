import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./assets/css/signUpPage.css";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    id: "", 
    email: "",
    username: "",
    password: "",
  });

  function generateUserId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 3);
    return `${timestamp}${random}`;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function storeData(e) {
    e.preventDefault();

    const newUser = {
      ...userData,
      id: generateUserId(), 
      
    };

    axios
      .post("http://localhost:3000/signup", newUser)
      .then((response) => {
        window.localStorage.setItem("CurrLogged", newUser.id);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
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
            name="email"
            placeholder="E-Mail"
            required
            onChange={handleChange}
          ></input>
          <br />
          <label>Username:</label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
            onChange={handleChange}
          ></input>
          <br />
          <label>Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
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
