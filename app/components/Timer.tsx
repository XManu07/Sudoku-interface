interface TimerProps {
  elapsedTime: number;
}

export default function Timer({ elapsedTime }: TimerProps) {
  function formatTimer() {
    if (elapsedTime) {
      let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
      let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
      let seconds = Math.floor((elapsedTime / 1000) % 60);
      const pad = (num: number) => String(num).padStart(2, "0");

      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
  }
  return (
    <div className="bg-gray-900 rounded-2xl px-4 py-2 border-violet-900 border-2 text-white font-mono text-xl">
      Time: {formatTimer()}
    </div>
  );
}
