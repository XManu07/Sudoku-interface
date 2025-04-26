"use client";

import { useRef, useState, useEffect } from "react";
import SudokuGrid from "./components/SudokuGrid";
import SidebarButtons from "./components/SidebarButtons";
import { generate, solve, hint } from "sudoku-core";
import { Difficulty } from "sudoku-core";
import { SolvingResult } from "sudoku-core/dist/cjs/types";
import MainButtons from "./components/MainButtons";
import Timer from "./components/Timer";
import Header from "./components/Header";

function parseSolvingResultToArray(solvingResult: SolvingResult) {
  let arrayResult = Array(81).fill(null);
  if (solvingResult.board) {
    arrayResult = solvingResult.board.map((number) => {
      return number === 0 ? null : number;
    });
  }

  return arrayResult;
}

export default function SudokuPage() {
  const [solution, setSolution] = useState<(number | null)[]>(
    Array(81).fill(null)
  );
  const [cellValues, setCellValues] = useState<(number | null)[]>(
    Array(81).fill(null)
  );
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [highlightedNumber, setHighlightedNumber] = useState<number | null>(
    null
  );
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
  const [mistakes, setMistakes] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimeRef = useRef(0);
  const [pencilActive, setPencilActive] = useState(false);
  const [eraserActive, setEraserActive] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

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
    const allCellsFilled = cellValues.every((val) => val !== null);
    const allCellsCorrect = cellValues.every(
      (val, idx) => val === solution[idx]
    );

    if (allCellsFilled && allCellsCorrect) {
      stopTimer();
    }
  }, [cellValues, solution]);
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
    const newNumbersAppearance = Array(9).fill(null);
    const newValues = sudokuString.split("").map((charNumber) => {
      if (charNumber === "0") return null;
      const number = parseInt(charNumber);
      newNumbersAppearance[number] = (newNumbersAppearance[number] || 0) + 1;
      return isNaN(number) ? null : number;
    });
    setCellValues(newValues);

    const solution = solve(newValues);
    if (solution.board) {
      const solArray = solution.board.map((number) => {
        return number === 0 ? null : number;
      });
      setSolution(solArray);
      setError("");
      setNumbersOccurrences(newNumbersAppearance);
    } else {
      setError("Invalid sudoku puzzle.");
      setSolution(Array(81).fill(null));
      setCellValues(Array(81).fill(null));
      setNumbersOccurrences(Array(9).fill(null));
    }

    setSelectedCell(null);
    setHighlightedNumber(null);
  };

  const handleSolve = () => {
    stopTimer();
    setCellValues(solution);
    setNumbersOccurrences([]);
    setCellPencilValues(Array(81).fill([]));
    setError("");
    setHighlightedNumber(null);
    setSelectedCell(null);
  };

  const handleClear = () => {
    resetTimer();
    setCellValues([]);
    setSolution([]);
    setCellPencilValues(Array(81).fill([]));
    setSelectedCell(null);
    setHighlightedNumber(null);
    setNumbersOccurrences([]);
  };

  const handleNumberClick = (number: number) => {
    if (mistakes >= 3) return;

    if (eraserActive && selectedCell != null) {
      setCellPencilValues((prevValues) => {
        const newValues = [...prevValues];
        const currentCellPencilValues = [...(newValues[selectedCell] || [])];

        const index = currentCellPencilValues.indexOf(number);
        if (index !== -1) {
          currentCellPencilValues.splice(index, 1);
          newValues[selectedCell] = currentCellPencilValues;
        }

        return newValues;
      });
      setError("");
    } else if (pencilActive && selectedCell != null) {
      setCellPencilValues((prevValues) => {
        const newValues = [...prevValues];
        const currentCellPencilValues = [...(newValues[selectedCell] || [])];

        if (!currentCellPencilValues.includes(number)) {
          currentCellPencilValues.push(number);
          newValues[selectedCell] = currentCellPencilValues;
        }

        return newValues;
      });
      setError("");
    } else {
      setHighlightedNumber(number);

      if (selectedCell !== null && number === solution[selectedCell]) {
        const newCellValues = [...cellValues];
        newCellValues[selectedCell] = number;
        setCellValues(newCellValues);

        if (numbersOccurrences[number] !== null) {
          const newNumbersOccurrences = [...numbersOccurrences];
          if (newNumbersOccurrences[number]) newNumbersOccurrences[number]++;
          setNumbersOccurrences(newNumbersOccurrences);
        }

        setCellPencilValues((prevValues) => {
          const newValues = [...prevValues];
          newValues[selectedCell] = [];
          return newValues;
        });

        setError("");
      } else if (selectedCell == null) {
        setError("Select a cell.");
      } else if (number !== solution[selectedCell]) {
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
  };
  ``;

  const handleHint = () => {
    const hintObject = hint(cellValues);
    setCellValues(parseSolvingResultToArray(hintObject));
    updateNumbersOccurrences();

    if (hintObject.steps && hintObject.steps.length) {
      setSelectedCell(hintObject.steps[0].updates[0].index);
      setHighlightedNumber(hintObject.steps[0].updates[0].filledValue);
    } else {
      setSelectedCell(null);
      setHighlightedNumber(null);
    }
  };

  const handleCellClick = (index: number) => {
    setSelectedCell(index);

    const clickedValue = cellValues[index];
    if (clickedValue !== null) {
      setHighlightedNumber(clickedValue);
    } else {
      setHighlightedNumber(null);
    }

    setError("");
  };

  const handleGenerate = () => {
    setMistakes(0);
    setResetSignal(true);
    setError("");
    const sudoku = generate("easy");
    setCellValues(sudoku);

    const newNumbersAppearance = Array(9).fill(null);
    sudoku.map((number) => {
      if (number)
        newNumbersAppearance[number] = (newNumbersAppearance[number] || 0) + 1;
    });
    setNumbersOccurrences(newNumbersAppearance);

    const solution = solve(sudoku);
    if (solution.board) {
      const solArray = solution.board?.map((number) => {
        return number === 0 ? null : number;
      });
      setSolution(solArray);
    } else {
      setError("No solution found.");
      setSolution(Array(81).fill(null));
    }
  };

  const handlePencilClick = () => {
    pencilActive ? setPencilActive(false) : setPencilActive(true);
    setEraserActive(false);
  };
  const handleEraserClick = () => {
    eraserActive ? setEraserActive(false) : setEraserActive(true);
    setPencilActive(false);
  };

  const hancleDifficultyChange = (diff: Difficulty) => {
    setDifficulty(diff);
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-start bg-gray-900 p-8 gap-8">
      <Header/>
      <div className="flex flex-row justify-center items-start gap-12">
        <div className="flex flex-col gap-24 items-center mt-30">
          <MainButtons
            onPencilClick={handlePencilClick}
            onEraserClick={handleEraserClick}
            pencilActive={pencilActive}
            eraserActive={eraserActive}
            difficulty={difficulty}
            onDifficultyChange={hancleDifficultyChange}
          />
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex w-full max-w-md justify-between items-center mb-4">
            <div className="text-white font-mono text-xl">
              Mistakes: {mistakes}/3
            </div>

            <div className="flex items-center gap-4">
              <Timer elapsedTime={elapsedTime} />
              <button
                onClick={isTimerRunning ? stopTimer : startTimer}
                className="flex items-center justify-center p-2 rounded-full bg-violet-400 hover:bg-violet-900/40 transition-colors "
              >
                <img src="stop-icon.svg" alt="Pause" className="w-5 h-5" />
              </button>
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