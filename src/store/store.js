import { create } from 'zustand';

const useStore = create((set, get) => ({
  // Exams
  exams: [],
  addExam: (exam) => set((state) => ({
    exams: [...state.exams, { ...exam, id: Date.now().toString(), createdAt: new Date() }]
  })),
  updateExam: (id, updates) => set((state) => ({
    exams: state.exams.map(exam => exam.id === id ? { ...exam, ...updates } : exam)
  })),
  getExam: (id) => get().exams.find(exam => exam.id === id),
  deleteExam: (id) => set((state) => ({
    exams: state.exams.filter(exam => exam.id !== id)
  })),

  // Answer Keys
  answerKeys: [],
  addAnswerKey: (examId, answerKey) => set((state) => ({
    answerKeys: [...state.answerKeys, { ...answerKey, id: Date.now().toString(), examId, createdAt: new Date() }]
  })),
  getAnswerKey: (examId) => get().answerKeys.find(key => key.examId === examId),
  updateAnswerKey: (id, updates) => set((state) => ({
    answerKeys: state.answerKeys.map(key => key.id === id ? { ...key, ...updates } : key)
  })),

  // Results
  results: [],
  addResult: (result) => set((state) => ({
    results: [...state.results, { ...result, id: Date.now().toString(), createdAt: new Date() }]
  })),
  getExamResults: (examId) => get().results.filter(result => result.examId === examId),
  deleteResult: (id) => set((state) => ({
    results: state.results.filter(result => result.id !== id)
  })),

  // Current workflow
  currentExamId: null,
  setCurrentExamId: (id) => set({ currentExamId: id }),
  currentStep: 'dashboard', // dashboard, createExam, answerKey, scanner, results
  setCurrentStep: (step) => set({ currentStep: step }),
  scannedImage: null,
  setScannedImage: (image) => set({ scannedImage: image }),

  // Dark mode
  isDarkMode: localStorage.getItem('darkMode') === 'true',
  toggleDarkMode: () => set((state) => {
    localStorage.setItem('darkMode', !state.isDarkMode);
    return { isDarkMode: !state.isDarkMode };
  }),
}));

export default useStore;
