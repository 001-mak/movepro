import imageCompression from 'browser-image-compression';
const MAX_FILE_SIZE_MB = 1;
export const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: MAX_FILE_SIZE_MB,
    maxWidthOrHeight: 800, // Max width or height
    useWebWorker: true,
  };

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
};
