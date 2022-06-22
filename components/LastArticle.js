import Image from "next/image";
import React from "react";
import react from "/public/react.png"

const LastArticle = () => {
  return <div className=" md:col-span-2  relative">
    <Image alt="" src={react} layout="fill" objectFit="cover"/>
  </div>;
};

export default LastArticle;
