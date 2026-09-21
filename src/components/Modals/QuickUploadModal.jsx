import React, { useState } from 'react';
import { X, Upload, Copy, Check, Sparkles, Image as ImageIcon, ArrowRight, ShoppingBag, UserCheck } from 'lucide-react';
import ImageUploader from '../Common/ImageUploader';

export default function QuickUploadModal({
  isOpen,
  onClose,
  openPostGoodsModal,
  openRegisterTradeModal
}) {
  const [photoUrl, setPhotoUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (!photoUrl) return;
    navigator.clipboard.writeText(photoUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-lg bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 relative max-h-[92vh] overflow-y-auto shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Upload Photo from Phone / PC</h2>
            <p className="text-xs text-gray-400">Select any image from your gallery, camera, or disk for listings &amp; profiles</p>
          </div>
        </div>

        {/* Upload Box */}
        <div className="space-y-4">
          <ImageUploader
            value={photoUrl}
            onChange={setPhotoUrl}
            label="Select or Drag & Drop Photo Here"
            helpText="Mobile Camera / Gallery / PC File support"
          />

          {photoUrl && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  Photo Ready &amp; Compressed!
                </span>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="btn btn-secondary text-[11px] py-1 px-3 font-bold flex items-center gap-1"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Copy Photo Link</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action shortcuts */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <span className="text-[11px] text-gray-400 block font-semibold">What would you like to do with this photo?</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (openPostGoodsModal) openPostGoodsModal();
                    }}
                    className="btn btn-primary text-xs py-2 font-bold justify-center"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Sell Product Item</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (openRegisterTradeModal) openRegisterTradeModal();
                    }}
                    className="btn btn-emerald text-xs py-2 font-bold justify-center"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Register Craftsman</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-5 pt-4 border-t border-white/10 text-[11px] text-gray-400 text-center">
          💡 Photos are automatically compressed client-side so they load fast for all visitors globally.
        </div>

      </div>
    </div>
  );
}
