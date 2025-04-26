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
       
        ${isHighlighted ? "bg-violet-300" : "bg-gray-900 hover:bg-violet-300 hover:text-violet-950 " }
        focus:outline-none focus:ring-4 focus:ring-gray-300
        font-bold rounded-lg text-2xl px-4 py-1 me-2 mb-2
        transition-colors duration-200 border-2 border-violet-950`}
    >
      {number}
      {numberAppearance && (
        <div className="text-white text-sm align-text-bottom font-medium ">
          {9 - numberAppearance == 0 ? null : 9 - numberAppearance}
        </div>
      )}
    </button>
  )
}