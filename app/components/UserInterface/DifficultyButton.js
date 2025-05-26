"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {Smile, Meh, Angry } from "lucide-react";
const DifficultyButton = ({ difficulty, setDifficulty }) => {
  const [selected, setSelected] = useState(null);

  const handleButtonClick = (title, level) => {
    setSelected(title);
    setDifficulty(level); 
  };

  return (
    <div className="flex gap-4">
      {[
        { title: <Smile />, difficutly: 1 },
        { title: <Meh />, difficutly: 2 },
        { title: <Angry />, difficutly: 3 },
      ].map((items, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 600, damping: 10 }}
        >
          <button
            onClick={() => handleButtonClick(items.title, items.difficutly)}
            className="rounded-full py-1  cursor-pointer border-2 border-transparent transform"
          >
            {items.title}
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default DifficultyButton;
