'use client'

interface NumberButtonProps {
  number: number;
  onClick: () => void;
  isHighlighted?: boolean;
  numberAppearance: number | null;
}

export default function NumberButton({ 
  number,
  onClick, 
  isHighlighted = false,
  numberAppearance
}: NumberButtonProps) {
  return (
    <button 
      type="button"
      onClick={onClick}
      className={`
        text-white 
        ${isHighlighted ? 'bg-gray-700' : 'bg-gray-900 hover:bg-gray-700'}
        focus:outline-none focus:ring-4 focus:ring-gray-300
        font-bold rounded-lg text-2xl px-4 py-1 me-2 mb-2
        transition-colors duration-200`
      }
    >
      {number}
      {numberAppearance && (
        <div className="text-gray-300 text-sm align-text-bottom font-medium ">
          {9 - numberAppearance == 0 ? null : 9 - numberAppearance}
        </div>
      )}
    </button>
  )
}