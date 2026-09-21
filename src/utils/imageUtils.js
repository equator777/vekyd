/**
 * Image Utilities for Vekyd Marketplace
 * Handles file reader compression for mobile/PC image uploads and universal image error fallbacks.
 */

export const DEFAULT_PRODUCT_FALLBACK = 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800';
export const DEFAULT_AVATAR_FALLBACK = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';
export const DEFAULT_AD_FALLBACK = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200';

/**
 * Reads a File object from mobile photo gallery/camera or PC file picker,
 * resizes it on an HTML5 canvas, and converts it to a compressed Web Base64 Data URL.
 */
export function processImageFile(file, maxWidth = 900, maxHeight = 900, quality = 0.8) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Selected file is not a valid image.'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio preserving dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas 2d context.'));
          return;
        }

        // Draw and compress image
        ctx.drawImage(img, 0, 0, width, height);

        // Export as Web JPEG Base64
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };

      img.onerror = () => {
        reject(new Error('Could not decode image file format.'));
      };

      img.src = e.target.result;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file from disk or mobile storage.'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Universal error handler for HTML <img> tags to replace broken image links.
 */
export function handleImageError(event, fallbackUrl = DEFAULT_PRODUCT_FALLBACK) {
  if (event && event.target) {
    event.target.onerror = null; // Prevent infinite loop if fallback also fails
    event.target.src = fallbackUrl;
  }
}
