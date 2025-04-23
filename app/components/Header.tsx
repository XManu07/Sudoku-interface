'use client'

interface HeaderProps {
    difficulty?: string;
}

export default function Header({difficulty}: HeaderProps) {
    return (
        <div className="w-full flex flex-row justify-start items-center px-4 py-3 bg-gray-900 rounded-lg shadow-md gap-5">
            <img src="logo.png" className="w-10 h-auto" />
            <h1 className="text-3xl font-bold text-white">Sudoku</h1>
        </div>
    )
}