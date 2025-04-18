import React from "react";
import { FaInfo } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="fixed w-full h-15 bottom-0 left-0 flex justify-between items-center px-4">
      
        <FaInfo size={22} />
     
      <div className="flex items-center gap-4 ">
        <p>©All rights reserved - Pratik Jha</p>
      </div>
    </footer>
  );
};

export default Footer;
