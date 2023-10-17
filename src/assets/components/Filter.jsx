import React from "react";
import { useState, useEffect } from "react";
const sortGames = (data, sortBy) => {
  const [field, order] = sortBy.split("-");
  if (field === "default") return data;

  if (field === "name") {
    return [...data].sort((a, b) => {
      if (order === "asc") {
        return a["name"].localeCompare(b["name"]);
      } else if (order === "desc") {
        return b["name"].localeCompare(a["name"]);
      }
    });
  } else if (field === "price") {
    return [...data].sort((a, b) => {
      const priceA = a["price_overview"] ? a["price_overview"]["final"] : 0;
      const priceB = b["price_overview"] ? b["price_overview"]["final"] : 0;
      if (order === "asc") {
        return priceA - priceB;
      } else if (order === "desc") {
        return priceB - priceA;
      }
    });
  }

  return [];
};
function Filter({ initialData, onFilteredData }) {
  const [sortBy, setSortBy] = useState("default");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50); // Set your initial max price value
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTypes, setSelectedTypes] = useState([
    "game",
    "dlc",
    "music",
    "demo",
  ]);
  useEffect(() => {
    const cachedFilter = localStorage.getItem("Filter");
    if (cachedFilter) {
      const filter = JSON.parse(cachedFilter);
      setSortBy(filter[0].sortBy);
      setSelectedTypes(filter[0].selectedTypes);
      setMinPrice(filter[0].minPrice);
      setMaxPrice(filter[0].maxPrice);
    }
    setIsLoading(false);
  }, [isLoading]);

  //Filter for the selected types
  const filteredData = initialData.filter((item) =>
    selectedTypes.includes(item.type)
  );
  // Filter data based on custom price range
  const priceFilteredData = filteredData.filter((item) => {
    //Only return items that do not have the price_overview property
    if (sortBy === "price-free") {
      return !item.price_overview;
    }
    //If we are not using the custom prices then return all games
    if (sortBy !== "price-custom") return true;
    if (item.price_overview) {
      const price = item.price_overview.final;
      return price >= minPrice * 100 && price <= maxPrice * 100;
    }
    // Handle the case where price_overview doesn't exist or is not an object
    if (minPrice === 0 || minPrice === NaN) {
      return true; // Include the item if minPrice is 0
    } else {
      return false; // Exclude the item if price information is missing
    }
  });
  const sortedData = sortGames(priceFilteredData, sortBy);
  useEffect(() => {
    if (isLoading) return;
    const filterArr = [
      {
        sortBy: sortBy,
        selectedTypes: selectedTypes,
        minPrice: minPrice,
        maxPrice: maxPrice,
      },
    ];
    localStorage.setItem("Filter", JSON.stringify(filterArr));
    // ... Your useEffect logic here ...
    onFilteredData(sortedData); // This callback passes the filtered data back up to the parent.
  }, [sortBy, minPrice, maxPrice, selectedTypes, isLoading]);

  const [openFilter, setOpenFilter] = useState(false);

  const changeFilterState = () => {
    setOpenFilter(!openFilter);
  };
  if (isLoading) return;

  return (
    <>
      <div className={`filterButton`} onClick={changeFilterState}>
        <span className="filterIcon material-symbols-outlined">
          {openFilter ? "close" : "tune"}
        </span>
      </div>
      <div className={`filter-parent ${openFilter ? "open" : ""}`}>
        <div>
          <label>Name:</label>
          <br></br>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Default</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </select>

          <div>
            <label>Price:</label>
            <br></br>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">Default</option>
              <option value="price-free">Free to play</option>
              <option value="price-asc">Price: Least Expensive</option>
              <option value="price-desc">Price: Most Expensive</option>
            </select>

            <div className="price-div">
              <label>Min Price €:</label>
              <input
                className="price-lable"
                type="number"
                value={minPrice}
                onChange={(e) => {
                  e.preventDefault();
                  setSortBy("price-custom");
                  setMinPrice((prev) =>
                    Math.max(0, parseFloat(e.target.value))
                  );
                }}
              />
              <label>Max Price €:</label>
              <input
                className="price-lable"
                type="number"
                value={maxPrice}
                onChange={(e) => {
                  e.preventDefault();

                  setSortBy("price-custom");

                  setMaxPrice((prev) =>
                    Math.max(0, parseFloat(e.target.value))
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className="typeFilter">
          <label>Filter by Type:</label>
          <br></br>
          {["game", "dlc", "music", "demo"].map((type) => (
            <span key={type}>
              <label>
                <input
                  className="ui-checkbox"
                  type="checkbox"
                  value={type}
                  checked={selectedTypes.includes(type)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTypes([...selectedTypes, type]);
                    } else {
                      setSelectedTypes(selectedTypes.filter((t) => t !== type));
                    }
                  }}
                />
                {type.toUpperCase()}
              </label>
              <br></br>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default Filter;
