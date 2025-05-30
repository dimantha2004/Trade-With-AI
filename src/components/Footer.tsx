import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-6 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} TradeSense AI. All rights reserved.
          </p>
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Terms
          </a>
          <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Privacy
          </a>
          <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Help
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;