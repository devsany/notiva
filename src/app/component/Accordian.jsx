"use client";
import React, { useState } from "react";

const Accordian = () => {
  const data = [
    {
      id: 1,
      title: "data 1",
      content: "this is the content 1",
    },
    {
      id: 2,
      title: "data 2",
      content: "this is the content 2",
    },
    {
      id: 3,
      title: "data 3",
      content: "this is the content 3",
    },
    {
      id: 4,
      title: "data 4",
      content: "this is the content 4",
    },
  ];
  const [openId, setOpenId] = useState(null);

  const handleClick = (id) => {
    if (id) {
      setOpenId(id);
    }
  };
  return (
    <div>
      <h2>Accordian</h2>
      <div>
        {data.map((item, index) => {
          return (
            <div key={index}>
              <div
                className="flex justify-between border p-2 cursor-pointer   "
                onClick={() => handleClick(item.id)}
              >
                <div>{item.id}</div>
                <div>{item.title}</div>
                <div>open</div>
              </div>
              <div className={openId == item.id ? "block" : "hidden"}>
                {item.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Accordian;
