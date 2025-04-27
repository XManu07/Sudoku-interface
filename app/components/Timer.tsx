interface TimerProps {
  elapsedTime: number;
  handleTimer: () => void;
}

export default function Timer({ elapsedTime, handleTimer }: TimerProps) {
  const formatTimer = () => {
    if (elapsedTime) {
      let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
      let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
      let seconds = Math.floor((elapsedTime / 1000) % 60);
      const pad = (num: number) => String(num).padStart(2, "0");

      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
  };
  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="bg-gray-900 rounded-2xl px-4 py-2 border-violet-900 border-2 text-white font-mono text-xl">
        Time: {formatTimer()}
      </div>
      <button
        onClick={() => handleTimer()}
        className="flex items-center justify-center p-2 rounded-full w-10 h-10
                  bg-violet-400 hover:bg-violet-900 transition-colors cursor-pointer"
      >
        <img src="stop-icon.svg" alt="Pause" className="w-5 h-5" />
      </button>
    </div>
  );
}
