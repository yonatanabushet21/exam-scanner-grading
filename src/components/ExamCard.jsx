import React from 'react';
import useStore from '../store/store';
import { Trash2, Edit2, ChevronRight } from 'lucide-react';
import { formatDate } from '../utils/helpers';

const ExamCard = ({ exam, onSelect, onDelete }) => {
  const answerKeys = useStore((state) => state.answerKeys);
  const results = useStore((state) => state.results);
  const examResults = results.filter(r => r.examId === exam.id);
  const hasAnswerKey = answerKeys.some(key => key.examId === exam.id);

  return (
    <div className="card hover:shadow-lg cursor-pointer transform hover:scale-105 transition">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{exam.examName}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">{exam.subject || 'No subject'}</p>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{formatDate(exam.createdAt)}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-2 hover:bg-danger-100 dark:hover:bg-danger-900 rounded-lg transition text-danger-600 dark:text-danger-400"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4 text-center">
        <div>
          <p className="text-2xl font-bold text-primary-600">{examResults.length}</p>
          <p className="text-xs text-slate-600 dark:text-slate-400">Papers</p>
        </div>
        <div>
          <p className={`text-2xl font-bold ${hasAnswerKey ? 'text-success-600' : 'text-warning-600'}`}>
            {hasAnswerKey ? '✓' : '○'}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">Answer Key</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-primary-600">
            {examResults.length > 0 
              ? Math.round(examResults.reduce((acc, r) => acc + r.percentage, 0) / examResults.length)
              : '—'}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">Avg %</p>
        </div>
      </div>

      <button
        onClick={onSelect}
        className="w-full flex items-center justify-center gap-2 btn-primary mt-4"
      >
        Select Exam
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ExamCard;
