import React from "react";

const Footer = () => {
  return (
    <>
      <div className="bg-[#262626] w-full h-16 flex items-center justify-center">
        <div className="flex items-center justify-center space-x-6 px-2">
          <div className="flex flex-col items-center">
            <p className="text-white font-semibold">CODEFAB</p>
          
          </div>
        </div>
      </div>
      <div className="text-white flex items-center bg-[#1E1E1E] justify-around w-full h-20">
        <p className="font-semibold">&copy;codefab 2022 </p>
        <p className="font-semibold">Made By EmOn</p>
      </div>
    </>
  );
};

export default Footer;
