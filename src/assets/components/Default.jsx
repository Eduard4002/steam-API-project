import App from "../../App";
import LogIn from "../../logInPage";
import ListGames from "./ListGames";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route } from 'react-router-dom';

function Default() {
    
    return (
      <>
        <Router>
          <Navbar />
            <Route path='/' exact component={App} />
            <Route path='/games' component={ListGames} />
            <Route path='/reandom' component={LogIn} />
        </Router>
      </>
    );
  }
  
  export default Default;





// import React from "react";
// import "../css/sidebar.css"

// export default function Sidebar() {
//   return (
//     <div className="default-container" style={{ float: 'left' }} >

//         <li><a> Main Page</a></li>
//         <li><a>Games</a></li>
//         <li><a>Something</a></li>
//         <li><a>Random</a></li>
//         <li><a>Something</a></li>
//     </div>
//   );

  
// }

