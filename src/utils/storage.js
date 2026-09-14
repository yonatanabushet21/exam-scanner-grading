/**
 * Local storage utilities with JSON serialization
 */

const STORAGE_PREFIX = 'exam_scanner_';

export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
};

export const getFromStorage = (key) => {
  try {
    const data = localStorage.getItem(STORAGE_PREFIX + key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading from storage:', error);
    return null;
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key);
  } catch (error) {
    console.error('Error removing from storage:', error);
  }
};

export const clearStorage = () => {
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};
