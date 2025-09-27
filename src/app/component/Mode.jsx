"use client";
import React, { useState } from "react";

const Mode = () => {
  const [mode, setMode] = useState(false);
  return (
    <div className={`${mode ? "bg-pink-900" : "bg-white"} text-white h-screen`}>
      <button
        onClick={() => {
          setMode(!mode);
        }}
      >
        {mode ? "light mode" : "Dark mode"}
      </button>
    </div>
  );
};

export default Mode;
