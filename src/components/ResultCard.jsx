import React from 'react';
import { AlertCircle, CheckCircle, XCircle, HelpCircle } from 'lucide-react';

const ResultCard = ({ result, isExpanded, onToggle }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'correct':
        return <CheckCircle className="w-5 h-5 text-success-600" />;
      case 'wrong':
        return <XCircle className="w-5 h-5 text-danger-600" />;
      case 'review':
        return <HelpCircle className="w-5 h-5 text-warning-600" />;
      case 'unanswered':
        return <AlertCircle className="w-5 h-5 text-slate-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'correct':
        return 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800';
      case 'wrong':
        return 'bg-danger-50 dark:bg-danger-900/20 border-danger-200 dark:border-danger-800';
      case 'review':
        return 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800';
      case 'unanswered':
        return 'bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800';
      default:
        return '';
    }
  };

  return (
    <div 
      onClick={onToggle}
      className={`border rounded-lg p-4 cursor-pointer transition ${getStatusColor(result.status)}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          {getStatusIcon(result.status)}
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">Question {result.questionNumber}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Confidence: {(result.confidence * 100).toFixed(0)}%
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            Answer: <span className="font-bold">{result.studentAnswer || 'Blank'}</span>
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">Correct: {result.correctAnswer}</p>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-current border-opacity-20">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-slate-600 dark:text-slate-400">Your Answer:</p>
              <p className="font-bold text-slate-900 dark:text-white">{result.studentAnswer || 'Unanswered'}</p>
            </div>
            <div>
              <p className="text-slate-600 dark:text-slate-400">Correct Answer:</p>
              <p className="font-bold text-slate-900 dark:text-white">{result.correctAnswer}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
