import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, X, Check, Loader2, Sparkles } from 'lucide-react';
import { processImageFile, handleImageError, DEFAULT_PRODUCT_FALLBACK } from '../../utils/imageUtils';

export default function ImageUploader({
  value,
  onChange,
  label = "Item Photo / Image",
  helpText = "Upload a photo from your phone/PC gallery or paste an image URL",
  presetImages = [],
  fallbackType = DEFAULT_PRODUCT_FALLBACK
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const dataUrl = await processImageFile(file);
      onChange(dataUrl);
    } catch (err) {
      console.error('File processing error:', err);
      setUploadError('Failed to process photo. Please select a valid JPEG or PNG file.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const dataUrl = await processImageFile(file);
      onChange(dataUrl);
    } catch (err) {
      setUploadError('Could not process dropped image file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="space-y-2">
      {/* Header Label */}
      <div className="flex items-center justify-between">
        <label className="label text-xs font-bold text-white mb-0 flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4 text-cyan-400" />
          <span>{label}</span>
        </label>
        {helpText && <span className="text-[10px] text-gray-400">{helpText}</span>}
      </div>

      {/* Main Container */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-3">
        
        {/* Hidden Native File Input for Mobile & PC */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* State A: Image Attached / Preview */}
        {value ? (
          <div className="relative group rounded-xl overflow-hidden border border-emerald-500/40 bg-black/60 flex items-center justify-center min-h-[160px] max-h-[240px]">
            <img
              src={value}
              alt="Preview"
              onError={(e) => handleImageError(e, fallbackType)}
              className="w-full h-48 object-contain rounded-lg p-1"
            />
            
            {/* Top Right Badges */}
            <div className="absolute top-2 right-2 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white text-[11px] font-extrabold flex items-center gap-1 shadow-lg">
                <Check className="w-3.5 h-3.5" /> Photo Attached
              </span>
              <button
                type="button"
                onClick={() => onChange('')}
                className="p-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-colors shadow-lg"
                title="Remove photo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Change Photo Overlay Button */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-primary text-xs py-2 px-4 font-bold shadow-lg"
              >
                <Upload className="w-4 h-4" />
                <span>Choose Different Photo</span>
              </button>
            </div>
          </div>
        ) : (
          /* State B: Empty - Show Bold Upload Button & Drag/Drop Zone */
          <div className="space-y-3">
            
            {/* 1. LARGE PROMINENT UPLOAD BUTTON */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.01] active:scale-[0.99] border border-cyan-300/30"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>Processing &amp; Compressing Photo...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 text-cyan-200" />
                  <span>📷 UPLOAD PHOTO FROM PHONE GALLERY / COMPUTER</span>
                </>
              )}
            </button>

            {/* 2. DRAG AND DROP BOX */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-cyan-500/30 hover:border-cyan-400 rounded-xl p-4 text-center cursor-pointer bg-cyan-950/20 hover:bg-cyan-950/40 transition-all group"
            >
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-xs font-bold text-gray-300 group-hover:text-white">
                  Or drag &amp; drop your photo file here
                </span>
                <span className="text-[10px] text-gray-400">
                  Supports Camera photos, Gallery files, PNG, JPG, WEBP
                </span>
              </div>
            </div>

            {/* 3. OPTIONAL WEB URL / PRESETS TOGGLE */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="text-[11px] font-bold text-cyan-400 hover:underline flex items-center gap-1"
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>{showUrlInput ? 'Hide Web URL Input' : 'Or Paste Web Image URL (https://...)'}</span>
              </button>
            </div>

            {/* Optional URL Input Field */}
            {showUrlInput && (
              <div className="pt-2 animate-fade-in space-y-2">
                <input
                  type="url"
                  placeholder="Paste image URL (e.g. https://i.ibb.co/..."
                  value={value || ''}
                  onChange={(e) => onChange(e.target.value)}
                  className="input-field text-xs bg-slate-950 text-white border-white/20"
                />
              </div>
            )}

            {/* Sample Presets */}
            {presetImages && presetImages.length > 0 && (
              <div className="pt-2">
                <span className="text-[10px] font-semibold text-gray-400 block mb-1.5">Or choose a preset sample photo:</span>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {presetImages.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Preset ${i}`}
                      onClick={() => onChange(src)}
                      className="w-12 h-12 rounded-lg object-cover cursor-pointer border-2 border-white/10 hover:border-cyan-400 hover:scale-105 transition-all shrink-0"
                    />
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* Upload Error Banner */}
        {uploadError && (
          <p className="text-xs text-rose-300 font-bold p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40">
            ⚠️ {uploadError}
          </p>
        )}

      </div>
    </div>
  );
}
