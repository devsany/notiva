"use client";
import Image from "next/image";
import React, { useState } from "react";

const Carousel = () => {
  const data = [
    {
      id: 1,
      title: "data 1",
      image:
        "https://www.google.com/imgres?q=react%20js%20interview%20questions&imgurl=https%3A%2F%2Fmedia.geeksforgeeks.org%2Fwp-content%2Fuploads%2F20230726111625%2FReactJS-interview-Questions-and-answers-copy-(1).jpg&imgrefurl=https%3A%2F%2Fwww.geeksforgeeks.org%2Freactjs%2Freact-interview-questions%2F&docid=ovsg8h9OCbCV9M&tbnid=zRmKv5w4ENXKSM&vet=12ahUKEwi9rpy1tPOPAxVpUGwGHZ3CLpgQM3oECBkQAA..i&w=700&h=350&hcb=2&ved=2ahUKEwi9rpy1tPOPAxVpUGwGHZ3CLpgQM3oECBkQAA",
    },
    {
      id: 2,
      title: "data 2",
      image:
        "https://www.google.com/imgres?q=react%20js%20interview%20questions&imgurl=https%3A%2F%2Fd3n0h9tb65y8q.cloudfront.net%2Fpublic_assets%2Fassets%2F000%2F002%2F336%2Foriginal%2FWhat_are_keys_in_React.png%3F1640091613&imgrefurl=https%3A%2F%2Fwww.interviewbit.com%2Freact-interview-questions%2F&docid=9kyvNTFbZ1MOcM&tbnid=UOyP_60jqObb1M&vet=12ahUKEwi9rpy1tPOPAxVpUGwGHZ3CLpgQM3oECB8QAA..i&w=1916&h=1285&hcb=2&ved=2ahUKEwi9rpy1tPOPAxVpUGwGHZ3CLpgQM3oECB8QAA",
    },
    {
      id: 3,
      title: "data 3",
      image:
        "https://www.google.com/imgres?q=react%20js%20interview%20questions&imgurl=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fhiration%2Fghost%2F2023%2F06%2Fresume-sections_54480013-compressed.jpg&imgrefurl=https%3A%2F%2Fwww.hiration.com%2Fblog%2Freact-js-interview-questions%2F&docid=jSUasIAdhmmQ4M&tbnid=uHEOdxlylbs7zM&vet=12ahUKEwi9rpy1tPOPAxVpUGwGHZ3CLpgQM3oECBYQAA..i&w=1080&h=1080&hcb=2&ved=2ahUKEwi9rpy1tPOPAxVpUGwGHZ3CLpgQM3oECBYQAA",
    },
    {
      id: 4,
      title: "data 4",
      image:
        "https://www.google.com/imgres?q=react%20js%20interview%20questions&imgurl=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fhiration%2Fghost%2F2023%2F06%2Fresume-sections_54480013-compressed.jpg&imgrefurl=https%3A%2F%2Fwww.hiration.com%2Fblog%2Freact-js-interview-questions%2F&docid=jSUasIAdhmmQ4M&tbnid=uHEOdxlylbs7zM&vet=12ahUKEwi9rpy1tPOPAxVpUGwGHZ3CLpgQM3oECBYQAA..i&w=1080&h=1080&hcb=2&ved=2ahUKEwi9rpy1tPOPAxVpUGwGHZ3CLpgQM3oECBYQAA",
    },
  ];
  const [index, setIndex] = useState(0);
  return (
    <div>
      <h2>Carousel</h2>
      <div className="flex overflow-x-auto gap-4    ">
        <button
          onClick={() => {
            setIndex(index - 1);
            if (index === 0) {
              setIndex(0);
            }
          }}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Previous
        </button>
        {data.slice(index, index + 3).map((item, index) => {
          return (
            <div className="flex" key={index}>
              <div>{item.id}</div>
              <div>{item.title}</div>
              <div>
                <img
                  src={item.image}
                  alt={item.title}
                  width="300"
                  height="200"
                />
              </div>
            </div>
          );
        })}
        <button
          type="button"
          onClick={() => {
            setIndex(index + 1);
            if (index === data.length - 3) {
              setIndex(0);
            }
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
