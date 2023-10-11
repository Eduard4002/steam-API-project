
import React, { useState } from "react";
import { useEffect } from "react";

export default function ToggleVisibility({ children }) {



  
  const [show, setShow] = useState();

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