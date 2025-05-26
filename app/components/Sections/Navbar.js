'use client';
import React, { useState } from "react";
import Link from "next/link";
import { RotateCcw, Volume2 , House  } from 'lucide-react';

const IconWithTooltip = ({ icon: Icon, tooltip }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center justify-center group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon */}
      <Icon size={22} className="cursor-pointer text-white hover:scale-110 transition-transform duration-300 ease-in-out" />

      {/* Tooltip at the bottom */}
      <div
        className={`absolute top-full mt-2 bg-zinc-800 text-white text-xs px-2 py-1 rounded-md shadow-lg z-10 
        transition-all duration-300 ease-out transform 
        ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
      >
        {tooltip}
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-0 h-0 border-l-6 border-r-6 border-b-6 border-l-transparent border-r-transparent border-b-zinc-800" />
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="fixed w-full h-15 top-0 left-0 flex justify-between items-center px-4  text-white z-50">
      <Link href="/">
        <h1 className="font-semibold text-xl">
          <span className="font-extrabold text-2xl"></span>MindGrind
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        <IconWithTooltip icon={House} tooltip="Home" />
        <IconWithTooltip icon={Volume2} tooltip="Volume" />
        <IconWithTooltip icon={RotateCcw} tooltip="Restart" />
        
      </div>
    </nav>
  );
};

export default Navbar;
