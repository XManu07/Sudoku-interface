interface MainButtonsProps {
  onPencilClick: () => void;
  onEraserClick: () => void;
  pencilActive: boolean;
  eraserActive: boolean;
}

export default function MainButtons({
  onPencilClick,
  onEraserClick,
  pencilActive,
  eraserActive,
}: MainButtonsProps) {
  return (
    <div className="flex flex-col gap-5 mr-6 mt-4">
      <button
        onClick={onPencilClick}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg shadow-md
                  transition-colors ${
                    pencilActive
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-100 hover:bg-blue-100 text-gray-800'
                  }`}
        title="Pencil Mode"
      >
        <img
          src="/pencil.png"
          alt="Pencil"
          className="w-6 h-6 object-contain"
        />
        <span className="font-medium">Pencil</span>
      </button>
      
      <button
        onClick={onEraserClick}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg shadow-md
                  transition-colors ${
                    eraserActive
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 hover:bg-red-100 text-gray-800'
                  }`}
        title="Eraser Mode"
      >
        <img
          src="/eraser.png"
          alt="Eraser"
          className="w-6 h-6 object-contain"
        />
        <span className="font-medium">Eraser</span>
      </button>

    </div>
  );
}