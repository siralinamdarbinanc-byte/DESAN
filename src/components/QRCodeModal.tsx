import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Copy, Check, QrCode } from 'lucide-react';
import QRCode from 'qrcode';
import { businessData } from '../data/businessData';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const cardUrl = window.location.href;

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(cardUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#9E1B22',
          light: '#FFFFFF',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('QR code generation failed:', err));
    }
  }, [isOpen, cardUrl]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(cardUrl);
      setCopied(true);
      onShowToast('لینک کارت ویزیت با موفقیت کپی شد!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = 'Desan-Graphic-QRCode.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    onShowToast('تصویر کد QR با موفقیت دانلود شد!');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-center overflow-hidden"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="بستن"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col items-center mb-5">
              <div className="w-12 h-12 rounded-2xl bg-rose-950/60 border border-rose-800/40 flex items-center justify-center text-rose-400 mb-2">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">کد QR کارت ویزیت دسن گرافیک</h3>
              <p className="text-xs text-slate-400 mt-1">
                برای اسکن و ذخیره سریع کارت ویزیت، دوربین گوشی را مقابل کد زیر بگیرید
              </p>
            </div>

            {/* QR Image Container */}
            <div className="relative mx-auto w-64 h-64 p-3 bg-white rounded-2xl shadow-xl border-4 border-rose-900/40 flex items-center justify-center mb-6">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="QR Code دسن گرافیک"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <div className="text-slate-500 text-xs">در حال ساخت کد QR...</div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCopyLink}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-rose-400" />}
                {copied ? 'کپی شد' : 'کپی لینک'}
              </button>

              <button
                onClick={handleDownloadQR}
                className="p-3 rounded-xl bg-rose-900 hover:bg-rose-800 border border-rose-700 text-xs font-bold text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-rose-950/40"
              >
                <Download className="w-4 h-4" />
                دانلود QR
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
