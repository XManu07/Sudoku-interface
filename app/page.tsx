'use client'

import { useState } from 'react';
import SudokuGrid from './components/SudokuGrid';
import AddSudokuPuzzle from './components/AddSudokuPuzzle';

export default function SudokuPage() {
  const [cellValues, setCellValues] = useState<(number | null)[]>(Array(81).fill(null));
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [highlightedNumber, setHighlightedNumber] = useState<number | null>(null);

  // Handler for when a custom puzzle is submitted via the modal
  const handleSudokuSubmit = (sudokuString: string) => {
    const newValues = sudokuString.split('').map(char => {
      if (char === '0' || char === '.') return null;
      const num = parseInt(char);
      return isNaN(num) ? null : num;
    });
    
    setCellValues(newValues);
    setSelectedCell(null);
    setHighlightedNumber(null);
  };

  // Handler for when a cell is clicked in the grid
  const handleCellClick = (index: number) => {
    setSelectedCell(index);
    
    const clickedValue = cellValues[index];
    if (clickedValue !== null) {
      setHighlightedNumber(clickedValue);
    } else {
      setHighlightedNumber(null);
    }
  };

  // Handler for when a number button is clicked
  const handleNumberClick = (number: number) => {
    setHighlightedNumber(number);
    
    if (selectedCell !== null) {
      const newCellValues = [...cellValues];
      newCellValues[selectedCell] = number;
      setCellValues(newCellValues);
    }
  };
  
  // Handler for solve button
  const handleSolve = async () => {
    
    try {
      // Convert the current cellValues to a string format your API expects
      const puzzleString = cellValues.map(val => val === null ? '0' : val).join('');
      
      // Call your C++ solver API
      const response = await fetch('/api/solve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ puzzle: puzzleString }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to solve puzzle');
      }
      
      const data = await response.json();
      
      // Update the grid with the solution
      const solutionValues = data.solution.split('').map((char: string) => {
        const num = parseInt(char);
        return isNaN(num) ? null : num;
      });
      
      setCellValues(solutionValues);
      
    } catch (error) {
      console.error('Error solving puzzle:', error);
      // Handle error - you might want to show a toast notification
    } finally {
    }
  };
  
  // Handler for clear button
  const handleClear = () => {
    setCellValues(Array(81).fill(null));
    setSelectedCell(null);
    setHighlightedNumber(null);
  };
  
  // Handler for validate button
  const handleValidate = () => {
    // Implement validation logic
    console.log('Validating puzzle...');
    
    // Example validation (very basic)
    let isValid = true;
    
    // Check rows, columns and boxes for duplicates
    // For a proper implementation, you'd need more complex logic
    
    alert(isValid ? 'Puzzle is valid!' : 'Puzzle has errors');
  };
  
  // Handler for hint button
  const handleHint = () => {
    console.log('Providing a hint...');
    // In a real implementation, you might call your solver API
    // and only reveal one cell
  };
  
  // Handler for save button
  const handleSave = () => {
    console.log('Saving puzzle...');
    // Here you would implement saving functionality
    // Could save to localStorage, a database, etc.
    
    const puzzleString = cellValues.map(val => val === null ? '0' : val).join('');
    localStorage.setItem('savedPuzzle', puzzleString);
    
    alert('Puzzle saved successfully!');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4
                    bg-[url('/bg2.jpeg')] bg-cover bg-center bg-no-repeat w-full">
      
      <SudokuGrid 
        cellValues={cellValues}
        selectedCell={selectedCell}
        highlightedNumber={highlightedNumber} 
        onCellClick={handleCellClick}
        onNumberClick={handleNumberClick}
        onSolve={handleSolve}
        onClear={handleClear}
        onValidate={handleValidate}
        onHint={handleHint}
        onSave={handleSave}
      />
      
      <AddSudokuPuzzle onSubmit={handleSudokuSubmit} />
    </main>
  );
}