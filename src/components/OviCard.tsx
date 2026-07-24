import React, { useState } from 'react';
import { Ovi } from '../types';
import { Volume2, VolumeX, Heart, Share2, Sparkles, Copy, Check, MessageSquare } from 'lucide-react';
import { speakMarathiText, stopMarathiSpeech } from '../utils/audioUtils';

interface OviCardProps {
  ovi: Ovi;
  chapterTitle?: string;
  fontSize: 'normal' | 'large' | 'xlarge';
  isBookmarked: boolean;
  onToggleBookmark: (oviId: string, note?: string) => void;
  onAskAi: (ovi: Ovi) => void;
  highlightText?: string;
}

export const OviCard: React.FC<OviCardProps> = ({
  ovi,
  chapterTitle,
  fontSize,
  isBookmarked,
  onToggleBookmark,
  onAskAi,
  highlightText,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [userNote, setUserNote] = useState('');
  const [activeTab, setActiveTab] = useState<'bhavarth' | 'english' | 'insight'>('bhavarth');

  const textSizes = {
    normal: { ovi: 'text-lg sm:text-xl', bhavarth: 'text-sm sm:text-base' },
    large: { ovi: 'text-xl sm:text-2xl', bhavarth: 'text-base sm:text-lg' },
    xlarge: { ovi: 'text-2xl sm:text-3xl', bhavarth: 'text-lg sm:text-xl' },
  };

  const currentSize = textSizes[fontSize];

  const handleSpeech = () => {
    if (isPlayingAudio) {
      stopMarathiSpeech();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      speakMarathiText(`${ovi.originalMarathi}. भावार्थ: ${ovi.marathiBhavarth}`, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  const handleCopy = () => {
    const fullText = `ज्ञानेश्वरी अध्याय ${ovi.chapterNumber}, ओवी ${ovi.oviNumber}\n\n${ovi.originalMarathi}\n\nमराठी भावार्थ:\n${ovi.marathiBhavarth}\n\nEnglish Translation:\n${ovi.englishTranslation}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `ज्ञानेश्वरी ओवी ${ovi.chapterNumber}.${ovi.oviNumber}`,
        text: `${ovi.originalMarathi}\n- भावार्थ: ${ovi.marathiBhavarth}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const handleSaveBookmark = () => {
    onToggleBookmark(ovi.id, userNote);
    setShowNoteInput(false);
  };

  return (
    <div
      id={`ovi-${ovi.id}`}
      className="bg-amber-50/80 rounded-2xl border border-amber-200/90 shadow-sm hover:shadow-md transition-all p-5 sm:p-6 mb-5 relative group overflow-hidden"
    >
      {/* Decorative Golden Left Accent Bar */}
      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-500 via-orange-500 to-amber-700 rounded-l-2xl" />

      {/* Header Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="bg-amber-800 text-amber-100 font-serif font-bold text-xs sm:text-sm px-3 py-1 rounded-full shadow-xs">
            अध्याय {ovi.chapterNumber} | ओवी {ovi.oviNumber}
          </span>
          {chapterTitle && (
            <span className="text-xs text-amber-800 font-medium truncate max-w-[200px] sm:max-w-xs">
              {chapterTitle}
            </span>
          )}
          {ovi.isFamous && (
            <span className="bg-amber-200 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
              प्रसिद्ध ओवी
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          {/* Audio Recitation */}
          <button
            onClick={handleSpeech}
            title={isPlayingAudio ? "गायन थांबवा" : "ओवी ऐका (Audio)"}
            className={`p-2 rounded-lg transition-colors ${
              isPlayingAudio
                ? 'bg-orange-500 text-amber-950 font-bold animate-pulse'
                : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
            }`}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Bookmark */}
          <button
            onClick={() => setShowNoteInput(!showNoteInput)}
            title={isBookmarked ? "जतन केले आहे" : "ओवी जतन करा"}
            className={`p-2 rounded-lg transition-colors ${
              isBookmarked
                ? 'bg-rose-100 text-rose-600'
                : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-rose-600 text-rose-600' : ''}`} />
          </button>

          {/* Copy */}
          <button
            onClick={handleCopy}
            title="ओवी कॉपी करा"
            className="p-2 rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            title="शेअर करा"
            className="p-2 rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Ask AI */}
          <button
            onClick={() => onAskAi(ovi)}
            className="flex items-center gap-1 bg-gradient-to-r from-amber-600 to-orange-600 text-amber-950 font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm hover:brightness-110 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-950" />
            <span>चिंतन AI</span>
          </button>
        </div>
      </div>

      {/* Bookmark Note Drawer */}
      {showNoteInput && (
        <div className="bg-amber-100/90 border border-amber-300/80 rounded-xl p-3 mb-4 transition-all">
          <div className="flex items-center gap-1 text-xs font-bold text-amber-900 mb-1">
            <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
            <span>तुमची वैयक्तिक टीप (Personal Reflection Note):</span>
          </div>
          <input
            type="text"
            value={userNote}
            onChange={(e) => setUserNote(e.target.value)}
            placeholder="उदा. या ओवीने मला मनाची शांती दिली..."
            className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 mb-2"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowNoteInput(false)}
              className="text-xs text-amber-800 hover:underline px-2 py-1"
            >
              रद्द
            </button>
            <button
              onClick={handleSaveBookmark}
              className="text-xs bg-amber-800 text-amber-100 px-3 py-1 rounded-md font-medium hover:bg-amber-900"
            >
              {isBookmarked ? 'टीप अद्यतन करा' : 'जतन करा'}
            </button>
          </div>
        </div>
      )}

      {/* Main Original Marathi Ovi Text */}
      <div className="my-3 text-center sm:text-left px-2 sm:px-4 py-3 bg-amber-100/60 rounded-xl border border-amber-200/80 shadow-inner">
        <p className={`font-serif font-bold text-amber-950 leading-relaxed ${currentSize.ovi} tracking-wide`}>
          {ovi.originalMarathi}
        </p>
      </div>

      {/* View Tabs: Marathi Bhavarth / English Translation / Spiritual Insight */}
      <div className="mt-4">
        <div className="flex items-center border-b border-amber-200/80 mb-3 gap-2">
          <button
            onClick={() => setActiveTab('bhavarth')}
            className={`pb-2 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'bhavarth'
                ? 'border-amber-800 text-amber-950 font-bold'
                : 'border-transparent text-amber-700 hover:text-amber-900'
            }`}
          >
            मराठी भावार्थ
          </button>
          <button
            onClick={() => setActiveTab('english')}
            className={`pb-2 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'english'
                ? 'border-amber-800 text-amber-950 font-bold'
                : 'border-transparent text-amber-700 hover:text-amber-900'
            }`}
          >
            English Translation
          </button>
          <button
            onClick={() => setActiveTab('insight')}
            className={`pb-2 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'insight'
                ? 'border-amber-800 text-amber-950 font-bold'
                : 'border-transparent text-amber-700 hover:text-amber-900'
            }`}
          >
            गूढ अर्थ व बोध
          </button>
        </div>

        {/* Tab Content */}
        <div className="pt-1">
          {activeTab === 'bhavarth' && (
            <p className={`text-amber-900/90 leading-relaxed ${currentSize.bhavarth} font-sans`}>
              <strong className="text-amber-950">भावार्थ: </strong>
              {ovi.marathiBhavarth}
            </p>
          )}

          {activeTab === 'english' && (
            <p className={`text-amber-900/90 leading-relaxed ${currentSize.bhavarth} font-sans italic`}>
              <strong className="text-amber-950 not-italic font-semibold">English Meaning: </strong>
              "{ovi.englishTranslation}"
            </p>
          )}

          {activeTab === 'insight' && (
            <div className="bg-amber-100/50 p-3 rounded-xl border border-amber-200">
              <p className={`text-amber-900/90 leading-relaxed ${currentSize.bhavarth} font-sans`}>
                <strong className="text-amber-950">आध्यात्मिक बोध: </strong>
                {ovi.spiritualInsight}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Topic Tags */}
      {ovi.tags && ovi.tags.length > 0 && (
        <div className="mt-4 pt-3 border-t border-amber-200/50 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-amber-700/80 font-medium">विषय:</span>
          {ovi.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] bg-amber-200/60 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300/60 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
