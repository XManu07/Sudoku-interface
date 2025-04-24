"use client";

import { useState } from "react";
import SudokuGrid from "./components/SudokuGrid";
import SidebarButtons from "./components/SidebarButtons";
import { generate, solve, hint } from "sudoku-core";
import { SolvingResult } from "sudoku-core/dist/cjs/types";

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
  const [solution, setSolution] = useState<(number | null)[]>(Array(81).fill(null));
  const [cellValues, setCellValues] = useState<(number | null)[]>(Array(81).fill(null));
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [highlightedNumber, setHighlightedNumber] = useState<number | null>(null);
  const [numbersOccurrences, setNumbersOccurrences] = useState<(number | null)[]>(Array(9).fill(null));
  const [error, setError] = useState("");

  const updateNumbersOccurrences = () => {
    const newNrOccurrences = Array(9).fill(null);
    cellValues.map(index => {
      if (index) {
        newNrOccurrences[index] = (newNrOccurrences[index] || 0) + 1;
      } 
    })

    setNumbersOccurrences(newNrOccurrences);
  }

  const handleAdd = (sudokuString: string) => {
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
    setError("");
    setHighlightedNumber(null);
    setSelectedCell(null);
  };

  const handleClear = () => {
    setCellValues([]);
    setSolution([]);
    setSelectedCell(null);
    setHighlightedNumber(null);
    setNumbersOccurrences([]);
  };

  const handleNumberClick = (number: number) => {
    setHighlightedNumber(number);
    if (selectedCell !== null && number === solution[selectedCell]) {
      cellValues[selectedCell] = number;
      numbersOccurrences[number] == null ? null : numbersOccurrences[number]++;
      setError("");
    }
    if (selectedCell == null) setError("Select a cell.");
    else if (number !== solution[selectedCell]) setError("Wrong number.");
  };

  const handleHint = () => {
    const hintObject = hint(cellValues);
    setCellValues(parseSolvingResultToArray(hintObject));
    updateNumbersOccurrences();

    if (hintObject.steps && hintObject.steps.length) {
      setSelectedCell(hintObject.steps[0].updates[0].index);
      setHighlightedNumber(hintObject.steps[0].updates[0].filledValue);
    }
    else {
      setSelectedCell(null);
      setHighlightedNumber(null);
    }
  };

  const handleSave = () => {};

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

  return (
    <main
      className="flex min-h-screen flex-row justify-center p-4 items-start  gap-8
                    bg-[url('/PaperTexture20.jpg')] bg-cover bg-center bg-no-repeat w-full"
    >
      <SudokuGrid
        cellValues={cellValues}
        selectedCell={selectedCell}
        highlightedNumber={highlightedNumber}
        onCellClick={handleCellClick}
        onNumberClick={handleNumberClick}
        numbersAppearance={numbersOccurrences}
        error={error}
      />

      <SidebarButtons
        onAdd={handleAdd}
        onSolve={handleSolve}
        onClear={handleClear}
        onHint={handleHint}
        onSave={handleSave}
        onGenerate={handleGenerate}
      />
    </main>
  );
}
