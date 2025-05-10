"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const DifficultyButton = ({ difficulty, setDifficulty }) => {
  const [selected, setSelected] = useState(null);

  const handleButtonClick = (title, level) => {
    setSelected(title);
    setDifficulty(level); 
  };

  return (
    <div className="flex gap-4">
      {[
        { title: "Easy", difficutly: 1 },
        { title: "Medium", difficutly: 2 },
        { title: "Hard", difficutly: 3 },
      ].map((items, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 600, damping: 10 }}
        >
          <button
            onClick={() => handleButtonClick(items.title, items.difficutly)}
            className={`bg-zinc-800 rounded-lg py-1 w-20 cursor-pointer border-2 border-transparent transform ${
              selected === items.title ? "border-2 border-zinc-500" : ""
            } hover:border-2 focus:outline-none`}
          >
            {items.title}
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default DifficultyButton;
