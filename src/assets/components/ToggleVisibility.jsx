
import React, { useState } from "react";

export default function ToggleVisibility({ children }) {

  
  const [show, setShow] = useState();

 
  function toggleShow() {
    setShow(!show);
  }
  var button = show ? "<" : ">";

  return (
    <div className="component-container">
      {show && children}
      <button className="coolbtn" onClick={toggleShow}>{button}</button>
    </div>
  );
}