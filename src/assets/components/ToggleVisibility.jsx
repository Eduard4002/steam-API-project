
import React, { useState } from "react";
import { useEffect } from "react";

export default function ToggleVisibility({ children }) {



let MenuIsOpen = false;
  
  const [show, setShow] = useState();
  console.log (window.location.pathname);

useEffect(()=>{
  window.addEventListener("click", function (e) {
    if (show) {
      if (e.target.id != "me") {
       

      setShow(false);
      }
    }
  });

}

)
  console.log(show)
 
  function toggleShow() {
    setShow(!show);
    
  }
  var button = show ? "<" : ">";

  return (
    <div className={`component-container ${show ? "show-sidebar" : ""}`}> 
      {show && children}
      <button id="me" className={`coolbtn ${show ? "move-right" : ""}`}  onClick={toggleShow}>{button}</button>
    </div>
  );
}