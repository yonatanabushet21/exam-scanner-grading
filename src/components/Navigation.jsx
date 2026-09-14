import React from 'react';
import useStore from '../store/store';
import { Home, Plus, BarChart3 } from 'lucide-react';

const Navigation = () => {
  const { currentStep, setCurrentStep, exams, currentExamId } = useStore();

  if (currentStep === 'scanner') {
    return null; // Hide navigation during scanning
  }

  const isActive = (step) => currentStep === step ? 'text-primary-600 border-primary-600' : 'text-slate-600 dark:text-slate-400';

  return (
    <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-6">
          <button
            onClick={() => setCurrentStep('dashboard')}
            className={`flex items-center gap-2 pb-2 border-b-2 font-medium transition ${ isActive('dashboard')}`}
          >
            <Home className="w-4 h-4" />
            Dashboard
          </button>

          {!currentExamId ? (
            <button
              onClick={() => setCurrentStep('createExam')}
              className={`flex items-center gap-2 pb-2 border-b-2 font-medium transition ${isActive('createExam')}`}
            >
              <Plus className="w-4 h-4" />
              New Exam
            </button>
          ) : (
            <>
              <button
                onClick={() => setCurrentStep('answerKey')}
                className={`flex items-center gap-2 pb-2 border-b-2 font-medium transition ${isActive('answerKey')}`}
              >
                <Plus className="w-4 h-4" />
                Answer Key
              </button>
              <button
                onClick={() => setCurrentStep('scanner')}
                className={`flex items-center gap-2 pb-2 border-b-2 font-medium transition ${isActive('scanner')}`}
              >
                📷 Scan Paper
              </button>
              <button
                onClick={() => setCurrentStep('results')}
                className={`flex items-center gap-2 pb-2 border-b-2 font-medium transition ${isActive('results')}`}
              >
                <BarChart3 className="w-4 h-4" />
                Results
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
