import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaUsers } from "react-icons/fa";

const PlayerTypeButton = () => {
  return (
    <div className="flex gap-4 ">
      <motion.div
        className="py-4 w-20 rounded-lg bg-zinc-800 flex items-center justify-center cursor-pointer "
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 600, damping: 10 }}
      >
        <FaUser size={30} />
      </motion.div>
      <motion.div
        className="py-4 w-20 rounded-lg bg-zinc-800 flex items-center justify-center cursor-pointer"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 600, damping: 10 }}
      >
        <FaUsers size={40} />
      </motion.div>
    </div>
  );
};

export default PlayerTypeButton;
