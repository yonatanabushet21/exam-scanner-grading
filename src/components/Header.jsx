import React from 'react';
import useStore from '../store/store';
import { Moon, Sun } from 'lucide-react';

const Header = () => {
  const { isDarkMode, toggleDarkMode, currentExamId, exams, setCurrentStep, setCurrentExamId } = useStore();
  const currentExam = currentExamId ? exams.find(e => e.id === currentExamId) : null;

  const handleLogoClick = () => {
    setCurrentStep('dashboard');
    setCurrentExamId(null);
  };

  return (
    <header className={`${isDarkMode ? 'dark' : ''} bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          onClick={handleLogoClick}
        >
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">📝</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">ExamScan</h1>
            {currentExam && (
              <p className="text-xs text-slate-600 dark:text-slate-400">{currentExam.examName}</p>
            )}
          </div>
        </div>

        <button
          onClick={toggleDarkMode}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-slate-600" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
