/**
 * Request camera permission from user
 */
export const requestCameraPermission = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: 'environment' } 
    });
    // Stop the stream immediately after checking permission
    stream.getTracks().forEach(track => track.stop());
    return { granted: true };
  } catch (error) {
    if (error.name === 'NotAllowedError') {
      return { 
        granted: false, 
        reason: 'Camera permission was denied. Please enable camera access in your browser settings.' 
      };
    } else if (error.name === 'NotFoundError') {
      return { 
        granted: false, 
        reason: 'No camera device found. Please ensure your device has a camera.' 
      };
    } else {
      return { 
        granted: false, 
        reason: 'An error occurred while accessing the camera.' 
      };
    }
  }
};

/**
 * Get camera stream
 */
export const getCameraStream = async (videoElement) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { 
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      } 
    });
    videoElement.srcObject = stream;
    return stream;
  } catch (error) {
    throw error;
  }
};

/**
 * Stop camera stream
 */
export const stopCameraStream = (stream) => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
};
