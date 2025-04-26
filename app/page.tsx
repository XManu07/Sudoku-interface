"use client";

import { useState } from "react";
import SudokuGrid from "./components/SudokuGrid";
import SidebarButtons from "./components/SidebarButtons";
import { generate, solve, hint } from "sudoku-core";
import { Difficulty } from "sudoku-core";
import { SolvingResult } from "sudoku-core/dist/cjs/types";
import MainButtons from "./components/MainButtons";

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

  const [pencilActive, setPencilActive] = useState(false);
  const [eraserActive, setEraserActive] = useState(false);

  const [difficulty, setDifficulty] = useState<Difficulty>("easy") ;
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
    setCellValues(solution);
    setNumbersOccurrences([]);
    setCellPencilValues(Array(81).fill([]));
    setError("");
    setHighlightedNumber(null);
    setSelectedCell(null);
  };

  const handleClear = () => {
    setCellValues([]);
    setSolution([]);
    setCellPencilValues(Array(81).fill([]));
    setSelectedCell(null);
    setHighlightedNumber(null);
    setNumbersOccurrences([]);
  };

  const handleNumberClick = (number: number) => {
    if (eraserActive && selectedCell != null) {
      setCellPencilValues(prevValues => {
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
    }

    else if (pencilActive && selectedCell != null) {
      setCellPencilValues(prevValues => {
        const newValues = [...prevValues];
        const currentCellPencilValues = [...(newValues[selectedCell] || [])];
        
        if (!currentCellPencilValues.includes(number)) {
          currentCellPencilValues.push(number);
          newValues[selectedCell] = currentCellPencilValues;
        }
        
        return newValues;
      });
      setError("");
    }
    else {
      setHighlightedNumber(number);
      if (selectedCell !== null && number === solution[selectedCell]) {
        const newCellValues = [...cellValues];
        newCellValues[selectedCell] = number;
        setCellValues(newCellValues);
        
        if (numbersOccurrences[number] !== null) {
          const newNumbersOccurrences = [...numbersOccurrences];
          if (newNumbersOccurrences[number])
            newNumbersOccurrences[number]++;
          setNumbersOccurrences(newNumbersOccurrences);
        }
        
        setCellPencilValues(prevValues => {
          const newValues = [...prevValues];
          newValues[selectedCell] = [];
          return newValues;
        });
        
        setError("");
      } else if (selectedCell == null) {
        setError("Select a cell.");
      } else if (number !== solution[selectedCell]) {
        setError("Wrong number.");
      }
    }
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
  }

  return (
    <main
      className="flex min-h-screen flex-row justify-center p-4 items-start  gap-8
                    bg-[url('/PaperTexture20.jpg')] bg-cover bg-center bg-no-repeat w-full"
    >
      <MainButtons
        onPencilClick={handlePencilClick}
        onEraserClick={handleEraserClick}
        pencilActive={pencilActive}
        eraserActive={eraserActive}
        difficulty={difficulty}
        onDifficultyChange={hancleDifficultyChange}
      />
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

      <SidebarButtons
        onAdd={handleAdd}
        onSolve={handleSolve}
        onClear={handleClear}
        onHint={handleHint}
        onGenerate={handleGenerate}
      />
    </main>
  );
}
