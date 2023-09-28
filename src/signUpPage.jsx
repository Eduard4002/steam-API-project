import "./assets/css/signUpPage.css";
import { Link, useNavigate } from "react-router-dom";



function SignUp() {

  const navigate = useNavigate();



  function storeData() {

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

  
      
    const userData = { email, username, password, };

    const userDataString = JSON.stringify(userData); 

    const userKey = username;

    window.localStorage.setItem(userKey, userDataString,);

    navigate("/");

  };

  return (
    <>
      <div className="signUpDiv">
        <h3>Sign Up</h3>

        <form onSubmit={storeData} className="signUpForm">
          <label>E-Mail:</label><br />
         
          <input type="email" id="email" name="lname" placeholder="E-Mail" required></input><br />
          <label>Username:</label><br />
          
          <input type="text" id="username" name="fname" placeholder="Username" required></input><br />
          <label>Password:</label><br />
         
          <input type="password" id="password" name="lname" placeholder="Password" required></input><br />
          <input type="submit" value="Submit"></input><br />
        </form>
        <p className="logInQ">Already got an account? <Link to={"/login"}>Log in</Link> to continue</p>
      </div>
    </>
  );

  
}
export default SignUp;