"use client";
import React, { useEffect, useState } from "react";

const DisplayUSer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setLoading(true);
        setData(data);
        setLoading(false);
        console.log(data);
      });
  });
  return (
    <div>
      <h2>DisplayUSer</h2>
      <h3>{loading && "Loading..."}</h3>
      {data &&
        data.map((item, index) => {
          return (
            <div key={index}>
              {item.id} - {item.name} - {item.email}
            </div>
          );
        })}
    </div>
  );
};

export default DisplayUSer;
