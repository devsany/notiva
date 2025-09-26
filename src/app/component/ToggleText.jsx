"use client";
import React, { useState } from "react";

const ToggleText = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <>
      <div className={toggle ? "opacity-0" : "opacity-100"}>hello World</div>
      <button onClick={() => setToggle(!toggle)}>
        {toggle ? "hide" : "show"}
      </button>
    </>
  );
};

export default ToggleText;
