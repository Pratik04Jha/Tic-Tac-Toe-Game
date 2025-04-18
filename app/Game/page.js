"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaO, FaXmark } from "react-icons/fa6";
import { motion } from "framer-motion";
import {
  FaUndo,
  FaLessThan,
  FaGreaterThan,
  FaSyncAlt,
  FaBars,
  FaVolumeUp,
} from "react-icons/fa";

const Page = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
    for (let [a, b, c] of winningCombinations) {
      if (brd[a] && brd[a] === brd[b] && brd[a] === brd[c]) return brd[a];
    }
    return null;
  };

  const emptyIndices = (brd) => brd.reduce((acc, val, idx) => val === null ? [...acc, idx] : acc, []);

  const minimax = (brd, isMax) => {
    const result = checkWinner(brd);
    if (result === "O") return 1;
    if (result === "X") return -1;
    if (emptyIndices(brd).length === 0) return 0;

    return isMax
      ? Math.max(...emptyIndices(brd).map(i => (brd[i] = "O", minimax(brd, false), brd[i] = null)))
      : Math.min(...emptyIndices(brd).map(i => (brd[i] = "X", minimax(brd, true), brd[i] = null)))
  };

  const computerMove = () => {
    let bestScore = -Infinity, move = null;
    for (let i of emptyIndices(board)) {
      board[i] = "O";
      let score = minimax(board, false);
      board[i] = null;
      if (score > bestScore) bestScore = score, move = i;
    }
    if (move !== null) {
      setTimeout(() => {
        const newBoard = [...board];
        newBoard[move] = "O";
        setBoard(newBoard);
        const win = checkWinner(newBoard);
        if (win) {
          setWinner(win);
          setComputerScore(s => s + 1);
          gameOverSound.current.play();
          setShowModal(true);
        } else if (emptyIndices(newBoard).length === 0) {
          tieSound.current.play();
          setDraws(d => d + 1);
          setWinner("draw");
          setShowModal(true);
        } else setIsPlayerTurn(true);
        playComputerSound();
      }, 500);
    }
  };

  useEffect(() => {
    if (!isPlayerTurn && !winner) computerMove();
  }, [isPlayerTurn]);

  const handleClick = (i) => {
    if (board[i] || !isPlayerTurn || winner) return;
    const newBoard = [...board];
    newBoard[i] = "X";
    setBoard(newBoard);
    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
      setPlayerScore(s => s + 1);
      gameOverSound.current.play();
      setShowModal(true);
    } else if (emptyIndices(newBoard).length === 0) {
      tieSound.current.play();
      setDraws(d => d + 1);
      setWinner("draw");
      setShowModal(true);
    } else setIsPlayerTurn(false);
    playUserSound();
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsPlayerTurn(true);
    setWinner(null);
    setShowModal(false);
  };

  const userMoveSound = useRef(new Audio("/Audios/note-high.mp3"));
  const computerMoveSound = useRef(new Audio("/Audios/note-low.mp3"));
  const gameOverSound = useRef(new Audio("/Audios/game-over.mp3"));
  const tieSound = useRef(new Audio("/Audios/game-over-tie.mp3"));

  const playUserSound = () => userMoveSound.current.play();
  const playComputerSound = () => computerMoveSound.current.play();

  const renderIcon = (val, i) => val && (
    <motion.div key={`${val}-${i}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 600, damping: 20 }}>
      {val === "X" ? <FaXmark size={110} color="white" /> : <FaO size={85} color="white" />}
    </motion.div>
  );

  const getButtonClass = (i) => [
    "h-40 w-40 cursor-pointer border-white text-7xl flex items-center justify-center",
    i < 6 && "border-b-6",
    i % 3 !== 2 && "border-r-6",
  ].filter(Boolean).join(" ");

  const getResultText = () => winner === "draw" ? "It's a Tie!" : winner === "X" ? "Player Wins!" : winner === "O" ? "Computer Wins!" : "";

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Left Panel */}
      <div className="w-[20%] flex justify-center">
        <div className="w-[80%] flex flex-col gap-2">
          {[playerScore, computerScore, draws].map((val, idx) => (
            <motion.div key={idx} className="flex flex-col items-center bg-zinc-800/20 border-4 border-white/10 rounded-lg px-4 py-8 cursor-pointer" whileHover={{ scale: 1.1 }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 600, damping: 10 }}>
              <h1 className="text-4xl font-bold">{val}</h1>
              <h1 className="text-2xl font-semibold">{idx === 0 ? "Player (X)" : idx === 1 ? "Computer (O)" : "Draws (X=O)"}</h1>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Board */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 600, damping: 10 }} className="grid grid-cols-3">
        {board.map((val, i) => (
          <button key={i} className={getButtonClass(i)} onClick={() => handleClick(i)}>
            {renderIcon(val, i)}
          </button>
        ))}
      </motion.div>

      {/* Right Panel (Optional Controls) */}
      <div className="w-[20%] flex justify-center items-start">
        <div className="w-[80%] grid grid-cols-2 grid-rows-3 gap-2">
          <button className="bg-white/10 rounded-xl p-3" onClick={resetGame}><FaSyncAlt size={24} /></button>
          {/* Add other controls as needed */}
        </div>
      </div>
    </div>
  );
};

export default Page;