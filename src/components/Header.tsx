import React from 'react';
import { ActivitySquare } from 'lucide-react';

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2">
        <ActivitySquare className="h-6 w-6 text-emerald-500" />
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">TradeSense AI</h1>
      </div>
      
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24\" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
        )}
      </button>
    </header>
  );
};

export default Header;