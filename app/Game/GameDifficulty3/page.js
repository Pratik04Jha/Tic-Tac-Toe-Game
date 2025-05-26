"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaO, FaXmark } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUndo,
  FaLessThan,
  FaGreaterThan,
  FaSyncAlt,
  FaBars,
  FaVolumeUp,
} from "react-icons/fa";
import Footer from "@/app/components/Sections/Footer";
import Navbar from "@/app/components/Sections/Navbar";

const Page = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Score states
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [draws, setDraws] = useState(0);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (brd) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (brd[a] && brd[a] === brd[b] && brd[a] === brd[c]) {
        return brd[a];
      }
    }
    return null;
  };

  const emptyIndices = (brd) =>
    brd.map((v, i) => (v === null ? i : null)).filter((v) => v !== null);

  const computerMove = () => {
    let bestMove = null;
    let bestScore = -Infinity;

    emptyIndices(board).forEach((i) => {
      const newBoard = [...board];
      newBoard[i] = "O";
      const score = minimax(newBoard, false);
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    });

    if (bestMove !== null) {
      setTimeout(() => {
        const newBoard = [...board];
        newBoard[bestMove] = "O";
        setBoard(newBoard);
        const win = checkWinner(newBoard);
        if (win) {
          setWinner(win);
          setComputerScore((s) => s + 1);
          gameOverSound.current.play();
          setShowModal(true);
        } else if (emptyIndices(newBoard).length === 0) {
          tieSound.current.play();
          setDraws((d) => d + 1);
          setWinner("draw");
          setShowModal(true);
        } else {
          setIsPlayerTurn(true);
        }
        playComputerSound();
      }, 500);
    }
  };

  const minimax = (newBoard, isMaximizing) => {
    const win = checkWinner(newBoard);
    if (win === "O") return 1;
    if (win === "X") return -1;
    if (emptyIndices(newBoard).length === 0) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      emptyIndices(newBoard).forEach((i) => {
        newBoard[i] = "O";
        const score = minimax(newBoard, false);
        newBoard[i] = null;
        bestScore = Math.max(score, bestScore);
      });
      return bestScore;
    } else {
      let bestScore = Infinity;
      emptyIndices(newBoard).forEach((i) => {
        newBoard[i] = "X";
        const score = minimax(newBoard, true);
        newBoard[i] = null;
        bestScore = Math.min(score, bestScore);
      });
      return bestScore;
    }
  };

  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      computerMove();
    }
  }, [isPlayerTurn]);

  const handleClick = (index) => {
    if (board[index] || !isPlayerTurn || winner) return;
    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
      setPlayerScore((s) => s + 1);
      gameOverSound.current.play();
      setShowModal(true);
    } else if (emptyIndices(newBoard).length === 0) {
      tieSound.current.play();
      setDraws((d) => d + 1);
      setWinner("draw");
      setShowModal(true);
    } else {
      setIsPlayerTurn(false);
    }
    playUserSound();
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsPlayerTurn(true);
    setWinner(null);
    setShowModal(false);
  };


  const userMoveSound = useRef(null);
const computerMoveSound = useRef(null);
const gameOverSound = useRef(null);
const tieSound = useRef(null);

useEffect(() => {
  // This code only runs in the browser
  userMoveSound.current = new Audio("/Audios/note-high.mp3");
  computerMoveSound.current = new Audio("/Audios/note-low.mp3");
  gameOverSound.current = new Audio("/Audios/game-over.mp3");
  tieSound.current = new Audio("/Audios/game-over-tie.mp3");
}, []);

  const playUserSound = () => userMoveSound.current.play();
  const playComputerSound = () => computerMoveSound.current.play();

  const renderIcon = (val, i) => {
    if (val === "X") {
      return (
        <motion.div
          key={`x-${i}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 600, damping: 20 }}
        >
          <FaXmark size={110} color="white" />
        </motion.div>
      );
    }
    if (val === "O") {
      return (
        <motion.div
          key={`o-${i}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 600, damping: 20 }}
        >
          <FaO size={85} color="white" />
        </motion.div>
      );
    }
    return null;
  };

  const getButtonClass = (i) => {
    const classes = [
      "h-40 w-40 cursor-pointer border-white text-7xl flex items-center justify-center",
    ];
    if (i < 6) classes.push("border-b-6");
    if (i % 3 !== 2) classes.push("border-r-6");
    return classes.join(" ");
  };

  const getResultText = () => {
    if (winner === "draw") return "It's a Tie!";
    if (winner === "X") return "Player Wins!";
    if (winner === "O") return "Computer Wins!";
    return "";
  };

  return (
    <>
      <Navbar />
    <div className="relative flex items-center flex-col justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 gap-6">
      

      {/* Game Board */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 600, damping: 10 }}
        className="grid grid-cols-3 grid-rows-3"
      >
        {board.map((val, i) => (
          <button
            key={i}
            className={getButtonClass(i)}
            onClick={() => handleClick(i)}
          >
            {renderIcon(val, i)}
          </button>
        ))}
      </motion.div>

      {/* Stats Panel */}
      <div className="w-[20%] justify-center flex ">
        <div className="w-[80%] justify-center flex  gap-20 ">
          {[playerScore, computerScore, draws].map((val, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center justify-center  rounded-lg  cursor-pointer"
              whileHover={{ scale: 1.1 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 600, damping: 10 }}
            >
              <h1 className="text-4xl font-bold ">{val}</h1>
              <h1 className="text-2xl font-semibold ">
                {
                  idx === 0
                  ? "Player"
                  : idx === 1
                  ? "Computer"
                  : "Draws"
                }
              </h1>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Game Over Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full  backdrop-blur flex items-center justify-center z-50 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetGame}
          >
            <motion.div
              className=" text-white p-10 rounded-2xl text-center shadow-xl cursor-pointer"
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h1 className="text-7xl font-extrabold mb-6 cursor-pointer ">
                {getResultText()}
              </h1>
              <button className="px-6 py-3  text-white font-semibold rounded-lg  transition cursor-pointer">
                Tap to restart the game
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

export default Page;
