







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







