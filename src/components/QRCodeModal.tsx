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

  const isPreview = typeof window !== 'undefined' && (
    window.location.hostname.includes('run.app') ||
    window.location.hostname.includes('localhost') ||
    window.location.hostname.includes('127.0.0.1')
  );
  const cardUrl = isPreview
    ? (businessData.cardUrl || 'https://siralinamdarbinanc-byte.github.io/DESAN/')
    : window.location.href;

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm rounded-3xl bg-white border border-slate-200 p-6 shadow-2xl text-center overflow-hidden text-slate-900"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-[#9E1B22] hover:bg-rose-50 transition-colors cursor-pointer"
              aria-label="بستن"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col items-center mb-5">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-[#9E1B22] mb-2">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">کد QR کارت ویزیت دسن گرافیک</h3>
              <p className="text-xs text-slate-500 mt-1">
                برای اسکن و ورود به کارت ویزیت، دوربین گوشی را مقابل کد زیر بگیرید
              </p>
              <div className="mt-2 text-[11px] font-mono text-[#9E1B22] font-semibold dir-ltr bg-rose-50 px-3 py-1 rounded-full border border-rose-200 inline-block truncate max-w-full">
                {cardUrl}
              </div>
            </div>

            {/* QR Image Container */}
            <div className="relative mx-auto w-64 h-64 p-3 bg-white rounded-2xl shadow-lg border-4 border-[#9E1B22] flex items-center justify-center mb-6">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="QR Code دسن گرافیک"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <div className="text-slate-400 text-xs">در حال ساخت کد QR...</div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCopyLink}
                className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#9E1B22]" />}
                {copied ? 'کپی شد' : 'کپی لینک'}
              </button>

              <button
                onClick={handleDownloadQR}
                className="p-3 rounded-xl bg-[#9E1B22] hover:bg-[#84141A] text-xs font-bold text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-rose-900/20"
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
