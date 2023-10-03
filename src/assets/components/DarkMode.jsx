
// import ReactSwitch from "react-switch"; 
// import { createContext, useState } from "react"; 



// export const ThemeContext = createContext (null)

// function lightModeToggle() {
 
//   const [theme, setTheme] = useState("dark"); 


//   const toggleTheme = () =>{
//     setTheme ((curr) => (curr === "dark" ? "light" : "dark"));
//   };

//   return (
//     <>   <ThemeContext.Provider value={{theme, toggleTheme}}>  
//       <ReactSwitch onChange={toggleTheme} checked={theme === "light"}/>
//       </ThemeContext.Provider> 
//     </>
//     );
//   }

//   id={theme}

//   export default lightModeToggle;
  // ------------------------------------------------------------

// import React, { useState } from 'react';
// import './YourExistingStyles.css'; // Import your existing CSS file

// const lightModeToggle = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   return (
//     <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
//       {/* Your existing content goes here */}

//       <button onClick={toggleDarkMode}>
//         {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
//       </button>
//     </div>
//   );
// };

// export default lightModeToggle;
 

// -----------------------------------------------------------------------------


// import React, { useEffect, useState } from 'react';
// import { setTheme } from '../utils/themes';

// function Toggle() {
//     const [togClass, setTogClass] = useState('dark');
//     let theme = localStorage.getItem('theme');

//     const handleOnClick = () => {
//         if (localStorage.getItem('theme') === 'theme-dark') {
//             setTheme('theme-light');
//             setTogClass('light')
//         } else {
//             setTheme('theme-dark');
//             setTogClass('dark')
//         }
//     }

//     useEffect(() => {
//         if (localStorage.getItem('theme') === 'theme-dark') {
//             setTogClass('dark')
//         } else if (localStorage.getItem('theme') === 'theme-light') {
//             setTogClass('light')
//         }
//     }, [theme]);

// -----------------------------------------------------------------------------------------

// import React, { useState, useEffect } from 'react';


// const DarkModeToggle = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {

//     const savedDarkMode = localStorage.getItem('darkMode');
//     if (savedDarkMode) {
//       setIsDarkMode(JSON.parse(savedDarkMode));
//     }
//   }, []);

//   const toggleDarkMode = () => {
//     const newDarkMode = !isDarkMode;
//     setIsDarkMode(newDarkMode);


//     localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
//   };

//   return (
//     <div>
//       <label>
//         Dark Mode
//         <input
//           type="checkbox"
//           checked={isDarkMode}
//           onChange={toggleDarkMode}
// />
//       </label>
      
//       {/* <DarkModeToggle /> */}

//     </div>
//   );
// };

// export default DarkModeToggle;


// const [isDarkMode, setIsDarkMode] = useState(false);


// useEffect(() => {
//   // Check local storage for saved dark mode preference
//   const savedDarkMode = localStorage.getItem('darkMode');
//   if (savedDarkMode) {
//     setIsDarkMode(JSON.parse(savedDarkMode));
//   }
// }, []);

// // Conditionally apply dark mode styles
// useEffect(() => {
//   if (isDarkMode) {
//     document.body.classList.add('dark-mode');
//   } else {
//     document.body.classList.remove('dark-mode');
//   }
// }, [isDarkMode]);

// -----------------------------------------------------------------------------------------

import React from "react";

import "../css/dark-mode.css"

const DarkMode = () => {
  const setDarkMode = () =>{
    document.querySelector("body").setAttribute('data-theme' , 'dark');
  };

  const setLightMode = () =>{
    document.querySelector("body").setAttribute('data-theme' , 'light');
  };

  setDarkMode();


    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
            />
            <label className='dark_mode_label' for='darkmode-toggle'>
             
            </label>
        </div>
    );
};

export default DarkMode;