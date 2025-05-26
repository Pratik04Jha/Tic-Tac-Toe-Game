"use client";
import React, { useState } from "react";
import Link from "next/link";
import DifficultyButton from "../UserInterface/DifficultyButton";
import { motion } from "framer-motion";
import { CirclePlay, ShieldHalf, ChartNoAxesColumn } from "lucide-react";

const MenuPage = () => {
  const [difficulty, setDifficulty] = useState(1); // lifted state here

  return (
    <>
      
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 600, damping: 20 }}
        className="flex flex-col h-[90%] w-full rounded-2xl  gap-6 items-center justify-center "
      >
        <h1 className="text-7xl font-extrabold text-center animate__animated animate__fadeIn">
          Tic Tac Toe Game
        </h1>
        <div className="flex flex-col gap-4 items-center ">
          <DifficultyButton
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        </div>
        <div className="flex gap-5 items-center ">
          {[
            {
              src: "/LeaderBoard",
              icon: <ShieldHalf size={100} />,
            },
            {
              src: `/Game/GameDifficulty${difficulty}`,
              icon: <CirclePlay size={150} />,
            },
            { src: "/Stats", icon: <ChartNoAxesColumn size={100} /> },
          ].map((items, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 600, damping: 10 }}
            >
              <Link href={items.src}>
                <button className="  rounded-full py-3  px-4 text-white text-xl font-semibold flex gap-2 items-center cursor-pointer">
                  {items.icon}
                </button>
              </Link>
            </motion.div>
          ))}
        </div>

        
      </motion.div>
      
      </div>
      
      <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 w-full h-full z-1 pointer-events-none" style={{
          WebkitMaskImage: "radial-gradient( black, transparent )",
          maskImage: "linear-gradient(to bottom, transparent, black 250%)",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}>
          <defs>
            <pattern
              id="tilePattern"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <rect width="40" height="40" fill="transparent" />
              <rect
                width="80"
                height="80"
                fill="none"
                stroke="#555"
                stroke-width="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tilePattern)" />
        </svg>
    </>
  );
};

export default MenuPage;
