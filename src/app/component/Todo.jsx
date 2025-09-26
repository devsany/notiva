"use client";
import React, { useState } from "react";

const Todo = () => {
  const [item, setItem] = useState("");
  const [data, setData] = useState([]);
  return (
    <div>
      <input
        type="text"
        placeholder="Enter Item name"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <button
        onClick={() => {
          setData([
            ...data,
            {
              item,
              random: Math.random(),
            },
          ]);
          setItem("");
        }}
      >
        Add Item
      </button>
      <div>
        {data &&
          data.map((items, index) => {
            return (
              <div key={index}>
                {items.item} - {items.random}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Todo;
