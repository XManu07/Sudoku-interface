'use client'

interface NumberButtonProps {
  number: number;
  onClick: () => void;
  isHighlighted?: boolean;
}

export default function NumberButton({ number, onClick, isHighlighted = false }: NumberButtonProps) {
  return (
    <button 
      type="button"
      onClick={onClick}
      className={`
        text-white 
        ${isHighlighted ? 'bg-gray-700' : 'bg-gray-900 hover:bg-gray-700'}
        focus:outline-none focus:ring-4 focus:ring-gray-300
        font-medium rounded-lg text-xl px-5 py-4 me-2 mb-2
        transition-colors duration-200`
      }
    >
      {number}
    </button>
  )
}