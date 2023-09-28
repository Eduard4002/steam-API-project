
import React, { useState } from "react";

export default function ToggleVisibility({ children }) {

  
  const [show, setShow] = useState();

 
  function toggleShow() {
    setShow(!show);
  }
  var button = show ? "<" : ">";

  return (
    <div className={`component-container ${show ? "show-sidebar" : ""}`}> 
      {show && children}
      <button className={`coolbtn ${show ? "move-right" : ""}`}  onClick={toggleShow}>{button}</button>
    </div>
  );
}