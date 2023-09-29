


























// --------------------------------------Code to use from other sorcers-----------------------------------------------------------------

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import ItemDetail from './ItemDetail'; // Your component for displaying item details

// function LinkGamesPage() {
//   return (
    // <Router>
    //   <Switch>
    //     <Route path="/item/:gameId" component={ItemDetail} />
    //     {/* Other routes */}
    //   </Switch>
    // </Router>
//   );
// }

// export default LinkGamesPage;


// --------------------------------------Code to use from other sorcers-----------------------------------------------------------------


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const LinkGamesPage = () => {
  const { gameId } = useParams();
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:3000/api?url=https://store.steampowered.com/api/appdetails?appids=${gameId}`;
        const response = await fetch(url);
        const data = await response.json();
        setItemData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    console.log (data);

    fetchData();
  }, [gameId]);

  if (!itemData) {
    return <div>Loading...</div>;
  }

  // Render your item details using itemData
  return (
    <div>
      <h1>{itemData.name}</h1>
      {/* Display other item details */}
    </div>
  );
};

export default LinkGamesPage;









// --------------------------------------Code to use from other sorcers-----------------------------------------------------------------



// Promise.all(
//     displayedGames.map((item) => {

//       // Construct the URL for fetching game details
//       let url =
//         "http://localhost:3000/api?url=https://store.steampowered.com/api/appdetails?appids=" +
//         item.appid;




//       // Perform the fetch request
//       return fetch(url)
//         .then((response) => response.json())
//         .then((json) => {
//           // Check if the JSON response contains an image URL
//           if (json[item.appid].success) {
//             // Associate the fetched image URL with its corresponding game
//             imageMap[item.appid] = json[item.appid].data.header_image;
//           }
//         })
//         .catch((error) => {
//           // Handle errors that occur during the fetch
//           console.error(error);
//         });
//     })
//   ).then(() => {
//     // Create an array of images based on the displayedGames order
//     const imagesForDisplayedGames = displayedGames.map(
//       (item) => imageMap[item.appid] || null
//     );

//     // Update the images state with the fetched images
//     setImages(imagesForDisplayedGames);
//   });



//   const Test = () => {
//     let { gameId } = useParams();