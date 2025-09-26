"use client";
import React, { useState } from "react";

const SearchFilter = () => {
  const [data] = useState([
    "Apple",
    "Mango",
    "Banana",
    "Orange",
    "Pineapple",
    "Grapes",
    "Strawberry",
  ]);
  const [inputValue, setInputValue] = useState("");
  const [filterData, setFilterData] = useState(data);

  const handleFilter = (e) => {
    setInputValue(e.target.value);
    const filterdata = data.filter((item) =>
      item.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterData(filterdata);
  };
  return (
    <div>
      SearchFilter
      <h2>
        <input
          type="text"
          placeholder="Enter Fruit name"
          onChange={handleFilter}
          value={inputValue}
        />
      </h2>
      <div>{/* <button onClick={handleFilter}>Search</button> */}</div>
      <div>{filterData}</div>
    </div>
  );
};

export default SearchFilter;
