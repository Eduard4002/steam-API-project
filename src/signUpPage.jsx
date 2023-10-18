import { Link } from "react-router-dom";
import { useState } from "react";
import "./assets/css/signUpPage.css";
import axios from "axios";

function SignUp() {

  const [userData, setUserData] = useState({ //Read user data
    id: "",
    email: "",
    username: "",
    password: "",
  });
  //Generate a unique user id, 
  function generateUserId() {

    // Get the current timestamp in milliseconds and convert it to a base-36 string.

    const timestamp = Date.now().toString(36);

    // Generate a random number between 0 and 1, convert it to a base-36 string,
    // and take the character at position 2 (starting from index 0)

    const random = Math.random().toString(36).substring(2, 3);

     // Combine the timestamp and random character to form a unique user ID

    return `${timestamp}${random}`;
  }


  function handleChange(e) {
    //Get the name and value properties from the target
    const { name, value } = e.target;
    
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  //Send and store data in database
  function storeData(e) {
    e.preventDefault();

    const newUser = {
      ...userData,
      id: generateUserId(), //Update the blank id with a unique id
    };

    //Send a request to the server
    axios
      .post("http://localhost:3000/signup", newUser)
      .then((response) => {
        if (response.status == 200) { //If successful signup, redirect to home page
          window.localStorage.setItem("CurrLogged", newUser.id);
          window.location.href = "/"
        }
      })
      .catch((error) => {
        console.log("ERROR", error);
        if (error.response.status === 409) { //If failed sign up, alert the user what went wrong
          alert("Email or username is taken");
        }
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
