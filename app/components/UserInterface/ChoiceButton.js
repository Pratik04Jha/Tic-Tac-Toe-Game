"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const ChoiceButton = () => {
  const [selected, setSelected] = useState(null);

  const handleButtonClick = (value) => {
    setSelected(value);
  };
  return (
    <div className="flex gap-4 items-center justify-center">
      {["O", "X"].map((char) => (
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 600, damping: 10 }}
        >
          <button
            key={char}
            onClick={() => handleButtonClick(char)}
            className={`py-4 w-20 cursor-pointer text-3xl border-2 border-transparent font-bold rounded-lg bg-zinc-800
                        ${selected === char ? "border-2 border-zinc-500" : ""} 
                          focus:outline-none `}
          >
            {char}
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default ChoiceButton;
