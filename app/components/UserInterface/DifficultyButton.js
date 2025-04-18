"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const DifficultyButton = () => {
  const [selected, setSelected] = useState(null);

  const handleButtonClick = (value) => {
    setSelected(value);
  };
  return (
    <div className="flex gap-4">
      {["Easy", "Medium", "Hard"].map((level) => (
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 600, damping: 10 }}
        >
          <button
            key={level}
            onClick={() => handleButtonClick(level)}
            className={`bg-zinc-800  rounded-lg py-1 w-20 cursor-pointer border-2 border-transparent  transform 
                        ${selected === level ? "border-2 border-zinc-500" : ""} 
                         hover:border-2 focus:outline-none `}
          >
            {level}
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default DifficultyButton;
