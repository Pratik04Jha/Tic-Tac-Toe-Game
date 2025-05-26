"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Smile, Meh, Angry } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const DifficultyButton = ({ difficulty, setDifficulty }) => {
  const [selected, setSelected] = useState(null);

  const handleButtonClick = (title, level) => {
    setSelected(title);
    setDifficulty(level);
  };
  const easy = () =>
    toast("Game difficulty set to Easy", {
      icon: "😀",
      style: {
        borderRadius: "10px",
        background: "#222",
        color: "#fff",
      },
    });
  const medium = () =>
    toast("Game difficulty set to Medium", {
      icon: "😐",
      style: {
        borderRadius: "10px",
        background: "#222",
        color: "#fff",
      },
    });
  const hard = () =>
    toast("Game difficulty set to Hard", {
      icon: "😡",
      style: {
        borderRadius: "10px",
        background: "#222",
        color: "#fff",
      },
    });

  return (
    <div className="flex gap-4">
      {[
        { title: <Smile onClick={easy} />, difficutly: 1 },
        { title: <Meh onClick={medium} />, difficutly: 2 },
        { title: <Angry onClick={hard} />, difficutly: 3 },
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

      <Toaster />
    </div>
  );
};

export default DifficultyButton;
