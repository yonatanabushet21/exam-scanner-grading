/**
 * Compare detected answers with answer key
 * @param {Array} detectedAnswers - Student's answers from scan
 * @param {Array} answerKey - Correct answers
 * @returns {Object} Grading result
 */
export const gradeAnswers = (detectedAnswers, answerKey) => {
  const results = [];
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;
  let flaggedForReview = 0;

  answerKey.forEach((keyItem, index) => {
    const studentAnswer = detectedAnswers[index];

    if (!studentAnswer) {
      unanswered++;
      results.push({
        questionNumber: keyItem.questionNumber,
        correctAnswer: keyItem.answer,
        studentAnswer: null,
        isCorrect: false,
        status: 'unanswered',
        confidence: 0,
      });
      return;
    }

    // If confidence is below 70%, flag for review
    if (studentAnswer.confidence < 0.7) {
      flaggedForReview++;
      results.push({
        questionNumber: keyItem.questionNumber,
        correctAnswer: keyItem.answer,
        studentAnswer: studentAnswer.answer,
        isCorrect: studentAnswer.answer === keyItem.answer,
        status: 'review',
        confidence: studentAnswer.confidence,
      });
      return;
    }

    const isCorrect = studentAnswer.answer === keyItem.answer;
    if (isCorrect) {
      correct++;
    } else {
      wrong++;
    }

    results.push({
      questionNumber: keyItem.questionNumber,
      correctAnswer: keyItem.answer,
      studentAnswer: studentAnswer.answer,
      isCorrect,
      status: isCorrect ? 'correct' : 'wrong',
      confidence: studentAnswer.confidence,
    });
  });

  const totalQuestions = answerKey.length;
  const marksPerQuestion = 1; // Can be customized
  const totalMarks = totalQuestions * marksPerQuestion;
  const obtainedMarks = correct * marksPerQuestion;
  const percentage = totalQuestions > 0 ? (obtainedMarks / totalMarks) * 100 : 0;

  // Grade based on percentage
  let grade = 'F';
  if (percentage >= 90) grade = 'A';
  else if (percentage >= 80) grade = 'B';
  else if (percentage >= 70) grade = 'C';
  else if (percentage >= 60) grade = 'D';

  return {
    correct,
    wrong,
    unanswered,
    flaggedForReview,
    totalQuestions,
    totalMarks,
    obtainedMarks,
    percentage: Math.round(percentage * 100) / 100,
    grade,
    results,
    needsManualReview: flaggedForReview > 0,
  };
};

/**
 * Simulate answer detection from scanned image
 * In a real application, this would use OCR/OMR libraries
 */
export const detectAnswersFromImage = async (imageData) => {
  return new Promise((resolve) => {
    // Simulate processing delay
    setTimeout(() => {
      // Mock detection - in production, use Tesseract.js or similar
      const mockAnswers = [
        { answer: 'A', confidence: 0.95 },
        { answer: 'B', confidence: 0.88 },
        { answer: 'C', confidence: 0.92 },
        { answer: 'A', confidence: 0.65 }, // Low confidence - needs review
        { answer: 'D', confidence: 0.91 },
      ];
      resolve(mockAnswers);
    }, 2000);
  });
};

/**
 * Validate answer key format
 */
export const validateAnswerKey = (answerKey) => {
  const errors = [];

  if (!answerKey.questions || answerKey.questions.length === 0) {
    errors.push('Answer key must contain at least one question');
  }

  answerKey.questions?.forEach((q, index) => {
    if (!q.questionNumber) {
      errors.push(`Question ${index + 1}: Missing question number`);
    }
    if (!q.answer) {
      errors.push(`Question ${index + 1}: Missing correct answer`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};
