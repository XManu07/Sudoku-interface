"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-6 mt-12 border-t border-violet-800">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
        <p className="text-gray-400">&copy; {new Date().getFullYear()} Sudoku Master. All rights reserved.</p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-center">
          <a
            href="https://scanstart.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-300 transition-colors"
          >
            scanstart.ro
          </a>
          <a
            href="https://csac.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-300 transition-colors"
          >
            csac.ro
          </a>
          <a
            href="https://www.instagram.com/cie.engineering_ulbs/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-300 transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
