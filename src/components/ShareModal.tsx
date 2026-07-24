import React, { useState } from 'react';
import { Ovi } from '../types';
import { Share2, Copy, Check, Link2, X, ExternalLink, MessageCircle, Send, Sparkles } from 'lucide-react';

interface ShareModalProps {
  ovi: Ovi;
  chapterTitle?: string;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ ovi, chapterTitle, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedFullText, setCopiedFullText] = useState(false);
  const [copiedMarathiOnly, setCopiedMarathiOnly] = useState(false);

  // Construct shareable link
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const shareableUrl = `${origin}${pathname}?ch=${ovi.chapterNumber}&ovi=${ovi.oviNumber}`;

  // Formatted Full Text
  const fullFormattedText = `॥ श्री ज्ञानेश्वरी ॥
अध्याय ${ovi.chapterNumber} | ओवी ${ovi.oviNumber}${chapterTitle ? ` (${chapterTitle})` : ''}

${ovi.originalMarathi}

भावार्थ:
${ovi.marathiBhavarth}

English Translation:
"${ovi.englishTranslation}"

वाचा व चिंतन करा: ${shareableUrl}`;

  // Formatted Marathi Text Only
  const marathiOnlyText = `॥ श्री ज्ञानेश्वरी (अध्याय ${ovi.chapterNumber}, ओवी ${ovi.oviNumber}) ॥

${ovi.originalMarathi}

भावार्थ: ${ovi.marathiBhavarth}
${shareableUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleCopyFullText = () => {
    navigator.clipboard.writeText(fullFormattedText);
    setCopiedFullText(true);
    setTimeout(() => setCopiedFullText(false), 2200);
  };

  const handleCopyMarathiOnly = () => {
    navigator.clipboard.writeText(marathiOnlyText);
    setCopiedMarathiOnly(true);
    setTimeout(() => setCopiedMarathiOnly(false), 2200);
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `ज्ञानेश्वरी अध्याय ${ovi.chapterNumber} ओवी ${ovi.oviNumber}`,
        text: `${ovi.originalMarathi}\n\n भावार्थ: ${ovi.marathiBhavarth}`,
        url: shareableUrl,
      }).catch((err) => {
        console.log("Share cancelled or failed:", err);
      });
    } else {
      handleCopyFullText();
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullFormattedText)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareableUrl)}&text=${encodeURIComponent(`${ovi.originalMarathi}\n- भावार्थ: ${ovi.marathiBhavarth}`)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FFFDF8] border-2 border-[#D4C3A1] rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#78350F] via-amber-900 to-[#451A03] text-amber-100 p-4 sm:p-5 flex items-center justify-between border-b border-amber-700/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-800/80 rounded-xl border border-amber-600/60">
              <Share2 className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-amber-100 flex items-center gap-2">
                <span>ओवी शेअर करा</span>
              </h3>
              <p className="text-xs text-amber-200/90 font-sans">
                अध्याय {ovi.chapterNumber} • ओवी {ovi.oviNumber}
                {chapterTitle ? ` (${chapterTitle})` : ''}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900 text-amber-200 hover:text-white transition-colors border border-amber-700/60"
            title="बंद करा"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-5 space-y-5 overflow-y-auto font-sans">
          
          {/* Shareable Link Box */}
          <div className="bg-amber-100/60 p-3.5 rounded-xl border border-amber-300/90">
            <label className="block text-xs font-bold text-amber-950 mb-1.5 flex items-center gap-1.5">
              <Link2 className="w-4 h-4 text-amber-800" />
              <span>थेट शेअर करण्यायोग्य लिंक (Shareable Link):</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareableUrl}
                className="flex-1 text-xs px-3 py-2 bg-white rounded-lg border border-amber-300 text-amber-950 font-mono select-all focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                onClick={handleCopyLink}
                className={`flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-lg transition-all border ${
                  copiedLink
                    ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                    : 'bg-[#78350F] text-amber-100 border-[#78350F] hover:bg-[#5B2508]'
                }`}
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>कॉपी झाली!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>लिंक कॉपी करा</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Copy Text Options */}
          <div>
            <span className="block text-xs font-bold text-amber-950 mb-2 flex items-center gap-1.5">
              <Copy className="w-4 h-4 text-amber-800" />
              <span>मजकूर कॉपी पर्याय (Copy Text Options):</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={handleCopyFullText}
                className={`flex items-center justify-center gap-2 text-xs font-bold p-2.5 rounded-xl border transition-all ${
                  copiedFullText
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-400'
                    : 'bg-amber-100/90 hover:bg-amber-200/90 text-amber-950 border-amber-300'
                }`}
              >
                {copiedFullText ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-amber-800" />}
                <span>संपूर्ण भावार्थासह कॉपी</span>
              </button>

              <button
                onClick={handleCopyMarathiOnly}
                className={`flex items-center justify-center gap-2 text-xs font-bold p-2.5 rounded-xl border transition-all ${
                  copiedMarathiOnly
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-400'
                    : 'bg-amber-100/90 hover:bg-amber-200/90 text-amber-950 border-amber-300'
                }`}
              >
                {copiedMarathiOnly ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-amber-800" />}
                <span>केवळ मराठी ओवी कॉपी</span>
              </button>
            </div>
          </div>

          {/* Direct External Apps Share */}
          <div>
            <span className="block text-xs font-bold text-amber-950 mb-2 flex items-center gap-1.5">
              <Send className="w-4 h-4 text-amber-800" />
              <span>सोशल मीडियावर थेट पाठवा (Direct Social Share):</span>
            </span>

            <div className="flex flex-wrap items-center gap-2">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white px-3 py-2.5 rounded-xl border border-emerald-700 shadow-xs transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              {/* Telegram */}
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 text-xs font-bold bg-sky-700 hover:bg-sky-800 text-white px-3 py-2.5 rounded-xl border border-sky-600 shadow-xs transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Telegram</span>
              </a>

              {/* System Native Share if supported */}
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  onClick={handleNativeShare}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs font-bold bg-[#78350F] hover:bg-[#5B2508] text-amber-100 px-4 py-2.5 rounded-xl border border-amber-700 shadow-xs transition-all"
                >
                  <Share2 className="w-4 h-4 text-amber-300" />
                  <span>सिस्टम शेअर (More...)</span>
                </button>
              )}
            </div>
          </div>

          {/* Visual Preview Box */}
          <div className="border border-amber-300/80 rounded-xl p-3 bg-[#FAF4E5] shadow-inner">
            <span className="block text-[11px] font-bold text-amber-800 mb-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>शेअरिंग पूर्वदृश्य (Preview):</span>
            </span>
            <p className="font-serif font-bold text-amber-950 text-sm leading-relaxed my-1">
              {ovi.originalMarathi}
            </p>
            <p className="text-xs text-amber-900 font-sans line-clamp-2">
              <strong className="font-serif">भावार्थ: </strong>
              {ovi.marathiBhavarth}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-amber-100/80 p-3 sm:px-5 border-t border-amber-300 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs font-bold bg-amber-900 hover:bg-amber-950 text-amber-100 px-4 py-2 rounded-xl transition-all"
          >
            बंद करा (Close)
          </button>
        </div>

      </div>
    </div>
  );
};
