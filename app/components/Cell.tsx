interface CellProps {
  isSelected: boolean;
  isHiglighted: boolean;
  onCellClick: (index: number) => void;
  index: number;
  value: number | null;
  pencilValues: (number | null)[];
}

export default function Cell({
  isSelected,
  isHiglighted,
  onCellClick,
  index,
  value,
  pencilValues = [],
}: CellProps) {
  const row = Math.floor(index / 9);
  const col = index % 9;

  const boxBorderRight = col === 2 || col === 5;
  const boxBorderBottom = row === 2 || row === 5;

  const renderPencilValues = () => {
    if (value !== null) return null;

    return (
      <div className="grid grid-cols-3 grid-rows-3 w-full h-full text-xs text-gray-500">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div key={num} className="flex items-center justify-center">
            {pencilValues.includes(num) ? num : ""}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      onClick={() => onCellClick(index)}
      className={`
        cell w-full h-full flex items-center justify-center font-bold p-0 outline-none 
        ${
          boxBorderRight
            ? "border-r-2 border-r-gray-800"
            : "border-r border-r-gray-800"
        }
        ${
          boxBorderBottom
            ? "border-b-2 border-b-gray-800"
            : "border-b border-b-gray-800"
        }
        ${col === 0 ? "border-l border-l-violet-800" : ""}
        ${row === 0 ? "border-t border-t-violet-800" : ""}
        ${
          isSelected
            ? "bg-violet-500"
            : isHiglighted
            ? "bg-violet-300"
            : "bg-transparent"
        }
        cursor-pointer hover:bg-gray-100 transition-colors
      `}
    >
      {value ? <span className="text-4xl">{value}</span> : renderPencilValues()}
    </div>
  );
}
