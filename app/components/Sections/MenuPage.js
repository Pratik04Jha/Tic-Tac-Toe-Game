"use client";
import React from "react";
import { IoMdPlay, IoMdStats } from "react-icons/io";
import { MdLeaderboard } from "react-icons/md";
import Link from "next/link";
import DifficultyButton from "../UserInterface/DifficultyButton";
import ChoiceButton from "../UserInterface/ChoiceButton";
import { motion } from "framer-motion";
import PlayerTypeButton from "../UserInterface/PlayerTypeButton";

const MenuPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 600, damping: 20 }}
        className="flex flex-col h-[90%] w-[30%] rounded-2xl bg-zinc-900/80 gap-6 items-center justify-center "
      >
        <h1 className="text-5xl font-extrabold text-center animate__animated animate__fadeIn">
          Tic Tac Toe <br /> Game
        </h1>
        <div className="flex flex-col gap-4 items-center ">
          <DifficultyButton />
          <div className="flex gap-4 flex-col">
            <ChoiceButton />
            <PlayerTypeButton />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { src: "/Game", icon: <IoMdPlay />, title: "Play" },
            {
              src: "/LeaderBoard",
              icon: <MdLeaderboard />,
              title: "Leaderboard",
            },
            { src: "/Stats", icon: <IoMdStats />, title: "Stats" },
          ].map((items, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 600, damping: 10 }}
            >
              <Link href={items.src}>
                <button className="bg-zinc-800 rounded-lg py-3 w-90 px-4 text-white text-xl font-semibold flex gap-2 items-center cursor-pointer">
                  {items.icon} {items.title}
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MenuPage;
