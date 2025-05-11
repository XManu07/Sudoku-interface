"use client";

import { useRef, useState, useEffect } from "react";
import SudokuGrid from "../components/SudokuGrid";
import SidebarButtons from "../components/SidebarButtons";
import { generate, solve, hint } from "sudoku-core";
import { Difficulty } from "sudoku-core";
import { SolvingResult } from "sudoku-core/dist/cjs/types";
import MainButtons from "../components/MainButtons";
import Timer from "../components/Timer";
import Header from "../components/Header";

function parseSolvingResultToArray(solvingResult: SolvingResult) {
  let arrayResult = Array(81).fill(null);
  if (solvingResult.board) {
    arrayResult = solvingResult.board.map((number) => {
      return number === 0 ? null : number;
    });
  }

  return arrayResult;
}

function parseStringToArray(sudokuString: string) {
  const newValues = sudokuString.split("").map((charNumber) => {
    if (charNumber === "0") return null;
    const number = parseInt(charNumber);
    return isNaN(number) ? null : number;
  });

  return newValues;
}

export default function Game() {
  const [solution, setSolution] = useState<(number | null)[]>(
    Array(81).fill(null)
  );
  const [cellValues, setCellValues] = useState<(number | null)[]>(
    Array(81).fill(null)
  );
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [highlightedNumber, setHighlightedNumber] = useState<number>(0);
  const [numbersOccurrences, setNumbersOccurrences] = useState<
    (number | null)[]
  >(Array(9).fill(null));
  const [error, setError] = useState("");
  const [cellPencilValues, setCellPencilValues] = useState<(number | null)[][]>(
    Array(81).fill(Array(9).fill(null))
  );
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [resetSignal, setResetSignal] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const startTimeRef = useRef(0);
  const [pencilActive, setPencilActive] = useState(false);
  const [eraserActive, setEraserActive] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    isTimerRunning ? setShowGrid(true) : setShowGrid(false);
    const allCellsFilled = cellValues.every((val) => val !== null);
    if (allCellsFilled) {
      stopTimer();
      setShowGrid(true);
    }
  }, [isTimerRunning]);

  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTimerRunning]);

  useEffect(() => {
    if (resetSignal) {
      setElapsedTime(0);
      setIsTimerRunning(false);
      setTimeout(() => {
        setIsTimerRunning(true);
        startTimeRef.current = Date.now();
        setResetSignal(false);
      }, 0);
    }
  }, [resetSignal]);

  useEffect(() => {
    if (cellValues) {
      updateNumbersOccurrences();
    } else {
      setNumbersOccurrences([]);
    }
  }, [cellValues]);

  function startTimer() {
    setIsTimerRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stopTimer() {
    setIsTimerRunning(false);
  }

  function resetTimer() {
    setElapsedTime(0);
    setIsTimerRunning(false);
  }

  const updateNumbersOccurrences = () => {
    const newNrOccurrences = Array(9).fill(null);
    cellValues.map((index) => {
      if (index) {
        newNrOccurrences[index] = (newNrOccurrences[index] || 0) + 1;
      }
    });

    setNumbersOccurrences(newNrOccurrences);
  };

  const handleAdd = (sudokuString: string) => {
    resetTimer();
    startTimer();
    setCellPencilValues(Array(81).fill([]));
    const newCellValues = parseStringToArray(sudokuString);
    setCellValues(newCellValues);

    const solution = solve(newCellValues);
    if (solution.board) {
      setSolution(solution.board);
      setError("");
    } else {
      setError("Invalid sudoku puzzle or unsolvable puzzle.");
      setSolution(Array(81).fill(null));
      setCellValues(Array(81).fill(null));
      setNumbersOccurrences(Array(9).fill(null));
    }
    setSelectedCell(null);
    setHighlightedNumber(0);
  };

  const handleSolve = () => {
    stopTimer();
    setCellValues(solution);
    setCellPencilValues(Array(81).fill([]));
    setError("");
    setHighlightedNumber(0);
    setSelectedCell(null);
  };

  const handleClear = () => {
    resetTimer();
    setCellValues([]);
    setSolution([]);
    setCellPencilValues(Array(81).fill([]));
    setSelectedCell(null);
    setHighlightedNumber(0);
  };

  const handleHint = () => {
    const hintObject = hint(cellValues);
    setCellValues(parseSolvingResultToArray(hintObject));
    updateNumbersOccurrences();

    if (hintObject.steps && hintObject.steps.length) {
      setSelectedCell(hintObject.steps[0].updates[0].index);
      setHighlightedNumber(hintObject.steps[0].updates[0].filledValue);
    } else {
      setSelectedCell(null);
      setHighlightedNumber(0);
    }
  };

  const updateCellValues = (nr: number) => {
    if (selectedCell) {
      const newCellValues = [...cellValues];
      newCellValues[selectedCell] = nr;
      setCellValues(newCellValues);
    }
  };

  const handleEraserActive = (nr: number) => {
    if (selectedCell)
      setCellPencilValues((prevValues) => {
        const newValues = [...prevValues];
        const currentCellPencilValues = [...newValues[selectedCell]];

        const index = currentCellPencilValues.indexOf(nr);
        if (index !== -1) {
          currentCellPencilValues.splice(index, 1);
          newValues[selectedCell] = currentCellPencilValues;
        }

        return newValues;
      });
  };

  const handlePencilActive = (nr: number) => {
    if (selectedCell)
      setCellPencilValues((prevValues) => {
        const newValues = [...prevValues];
        const currentCellPencilValues = [...newValues[selectedCell]];

        if (!currentCellPencilValues.includes(nr)) {
          currentCellPencilValues.push(nr);
          newValues[selectedCell] = currentCellPencilValues;
        }

        return newValues;
      });
  };

  const handlePencilClick = () => {
    pencilActive ? setPencilActive(false) : setPencilActive(true);
    setEraserActive(false);
  };

  const handleEraserClick = () => {
    eraserActive ? setEraserActive(false) : setEraserActive(true);
    setPencilActive(false);
  };

  const handleNumberClick = (number: number) => {
    if (mistakes >= 3) return;

    if (selectedCell) {
      if (eraserActive) {
        handleEraserActive(number);
        setError("");
      } else if (pencilActive) {
        handlePencilActive(number);
        setError("");
      } else {
        setHighlightedNumber(number);
        if (number == solution[selectedCell]) {
          updateCellValues(number);
          updateNumbersOccurrences();
          setCellPencilValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[selectedCell] = [];
            return newValues;
          });
          setError("");
        } else {
          setError("Wrong number.");
          setMistakes((prevMistakes) => {
            const newMistakes = prevMistakes + 1;
            if (newMistakes >= 3) {
              stopTimer();
              setError("Game over! Too many mistakes.");
            }
            return newMistakes;
          });
        }
      }
    }

    if (selectedCell == null) {
      setError("Select a cell.");
    }
  };

  const handleCellClick = (index: number) => {
    setSelectedCell(index);
    const clickedValue = cellValues[index];
    if (clickedValue !== null) {
      setHighlightedNumber(clickedValue);
    } else {
      setHighlightedNumber(0);
    }

    setError("");
  };

  const handleGenerate = () => {
    setMistakes(0);
    setResetSignal(true);
    setError("");
    setCellPencilValues(Array(81).fill([]));
    const sudoku = generate(difficulty);
    setCellValues(sudoku);

    const sudokuSolution = solve(sudoku);
    if (sudokuSolution.board) {
      setSolution(sudokuSolution.board);
    } else {
      setError("No solution found.");
      setSolution(Array(81).fill(null));
    }
    setSelectedCell(null);
    setHighlightedNumber(0);
  };

  const hancleDifficultyChange = (diff: Difficulty) => {
    setDifficulty(diff);
  };

  const handleTimerRunning = () => {
    isTimerRunning ? stopTimer() : startTimer();
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-start bg-gray-900 p-2 gap-4">
      <Header />
      <div className="flex flex-row justify-center items-start gap-12 max-w-7xl">
        <div className="flex flex-col gap-24 items-center mt-30 flex-wrap">
          <MainButtons
            onPencilClick={handlePencilClick}
            onEraserClick={handleEraserClick}
            pencilActive={pencilActive}
            eraserActive={eraserActive}
            difficulty={difficulty}
            onDifficultyChange={hancleDifficultyChange}
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex w-full max-w-md justify-between items-center">
            <div className="text-white font-mono text-xl">
              Mistakes: {mistakes}/3
            </div>
            <div className="flex items-center gap-4">
              <Timer
                elapsedTime={elapsedTime}
                handleTimer={handleTimerRunning}
              />
            </div>
          </div>

          <SudokuGrid
            cellValues={cellValues}
            selectedCell={selectedCell}
            highlightedNumber={highlightedNumber}
            onCellClick={handleCellClick}
            onNumberClick={handleNumberClick}
            numbersAppearance={numbersOccurrences}
            cellPencilValues={cellPencilValues}
            error={error}
            showGrid={showGrid}
          />
        </div>

        <div className="flex flex-col gap-12 items-center mt-30">
          <SidebarButtons
            onAdd={handleAdd}
            onSolve={handleSolve}
            onClear={handleClear}
            onHint={handleHint}
            onGenerate={handleGenerate}
          />
        </div>
      </div>
    </main>
  );
}
