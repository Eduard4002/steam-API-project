
function DataArray() {
  //const [data, setData] = useState([]);
  const allowedCharactersRegex = /^[ A-Za-z0-9_@./#&+-:]*$/;
  let data;
  /*
  useEffect(() => {
    fetch(
      "http://localhost:3000/api?url=" +
        "http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=A0911E4728A7BFFA31252DC83DEB9573&format=json"
    )
      .then((response) => response.json())
      .then((json) => {
        const games = json.applist.apps;

        const filteredData = games.filter((item) => {
          return item.name && allowedCharactersRegex.test(item.name);
        });
        setData(filteredData);
      })
      .catch((error) => console.error(error));
  }, []);*/
  return fetch(
    "http://localhost:3000/api?url=" +
      "http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=A0911E4728A7BFFA31252DC83DEB9573&format=json"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      console.log(json);

      const games = json.applist.apps;
      const allowedCharactersRegex = /^[ A-Za-z0-9_@./#&+-:]*$/;
      const filteredData = games.filter((item) => {
        return item.name && allowedCharactersRegex.test(item.name);
      });
      return filteredData;
    })
    .catch((error) => {
      console.error(error);
      return []; // Return an empty array in case of an error
    });
}
function getRandomGames(amount) {
  return DataArray().then((data) => {
    if (data && data.length === 0) return [];

    const shuffledGames = [...data].sort(() => Math.random() - 0.5);
    const newData = shuffledGames.slice(0, amount);

    return newData;
  });
  //let extraData = [];
  const data = DataArray();
  /*
  const [extraData, setExtraData] = useState([]);

  const lastRefreshedTime = parseInt(localStorage.getItem("LastRefreshed"), 10);
  const currentTime = Date.now();
  const fiveMinutes = 1 * 60 * 1000; // 5 minutes in milliseconds*/
  if (data && data.length === 0) return [];

  const shuffledGames = [...data].sort(() => Math.random() - 0.5);
  const newData = shuffledGames.slice(0, amount);

  return newData;
  console.log(currentTime);
  /*
  //Used for retrieving extra data from another API
  useEffect(() => {
    if (data.length === 0) return;
    if (
      localStorage.getItem("DATA") &&
      !(currentTime - lastRefreshedTime < fiveMinutes)
    ) {
      console.log("Returning data from localstorage");
      setExtraData(JSON.parse(localStorage.getItem("DATA")));
      //extraData = JSON.parse(localStorage.getItem("DATA"));
      return;
      //return JSON.parse(localStorage.getItem("DATA"));
    }

    // Fetch new data since the data is stale or not available in localStorage
    console.log("Getting new data");
    // Clear the existing images array

    // Create a temporary map to associate extra data with games
    const temp = {};
    
    console.log(newData);

    // Use Promise.all to wait for all fetch calls to complete
    Promise.all(
      newData.map((item, index) => {
        // Construct the URL for fetching game details
        let url =
          "http://localhost:3000/api?url=https://store.steampowered.com/api/appdetails?appids=" +
          item.appid;

        console.log(url);

        // Perform the fetch request
        return fetch(url)
          .then((response) => response.json())
          .then((json) => {
            // Check if the JSON response contains an image URL
            if (json && json[item.appid].success) {
              // Associate the fetched image URL with its corresponding game
              temp[item.appid] = json[item.appid].data;
            }
          })
          .catch((error) => {
            // Handle errors that occur during the fetch
            console.error(error);
          });
      })
    ).then(() => {
      // Create an array of images based on the displayedGames order
      const tempMapped = newData.map((item) => temp[item.appid] || null);
      // Update the images state with the fetched images
      setExtraData(tempMapped.filter(Boolean));
      //extraData = tempMapped.filter(Boolean);
      window.localStorage.setItem("DATA", JSON.stringify(extraData));
      localStorage.setItem("LastRefreshed", currentTime.toString());
      console.log(extraData);
    });
  }, [data]);

  console.log("return reached");
  return extraData;*/
}
function getDataLength() {
  return 146994;
}
export { DataArray, getDataLength, getRandomGames };

