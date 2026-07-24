import React, { useState } from 'react';
import { FAMOUS_OVIS, ALL_CHAPTERS } from '../data/dnyaneshwariData';
import { Ovi } from '../types';
import { OviCard } from './OviCard';
import { SimpleAudioPlayer } from './SimpleAudioPlayer';
import { Sun, RefreshCw, Sparkles, Compass } from 'lucide-react';

interface DailyOviProps {
  fontSize: 'normal' | 'large' | 'xlarge';
  bookmarks: string[];
  onToggleBookmark: (oviId: string, note?: string) => void;
  onAskAi: (ovi: Ovi) => void;
}

export const DailyOvi: React.FC<DailyOviProps> = ({
  fontSize,
  bookmarks,
  onToggleBookmark,
  onAskAi,
}) => {
  // Select daily verse based on day of year, or allow user to pick a new random contemplation Ovi
  const getTodayIndex = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear % FAMOUS_OVIS.length;
  };

  const [currentIndex, setCurrentIndex] = useState(getTodayIndex());
  const [activeAudioOvi, setActiveAudioOvi] = useState<Ovi | null>(null);

  const currentOvi = FAMOUS_OVIS[currentIndex] || FAMOUS_OVIS[0];
  const currentChapter = ALL_CHAPTERS.find(c => c.number === currentOvi.chapterNumber);

  const handleNextOvi = () => {
    setActiveAudioOvi(null);
    setCurrentIndex((prev) => (prev + 1) % FAMOUS_OVIS.length);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-amber-950 text-amber-50 rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-800/80 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 bg-amber-800/80 border border-amber-600/60 text-amber-200 px-3.5 py-1 rounded-full text-xs font-bold mb-3 shadow-inner">
          <Sun className="w-4 h-4 text-amber-400" />
          <span>दैनंदिन चिंतन ओवी (Daily Contemplation)</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-amber-100 mb-2">
          आजची बोध ओवी
        </h2>
        <p className="text-xs sm:text-sm text-amber-200/90 font-sans max-w-xl mx-auto mb-4">
          ज्ञानेश्वरीतील अलौकिक सुभाषित. दररोज एका ओवीचे मनन करा व जीवनात आत्मशांतीचा अनुभव घ्या.
        </p>

        <button
          onClick={handleNextOvi}
          className="inline-flex items-center gap-2 bg-amber-100 text-amber-950 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md hover:bg-amber-200 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>दुसरी चिंतन ओवी पहा (Next Verse)</span>
        </button>
      </div>

      {/* Contemplation Prompt Box */}
      <div className="bg-amber-100/80 rounded-2xl p-4 border border-amber-300 text-amber-950 flex items-start gap-3 shadow-xs">
        <Compass className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm leading-relaxed">
          <strong className="text-amber-900 block font-bold">आजच्या मननाचा संदेश:</strong>
          या ओवीचा संदेश तुमच्या दैनंदिन कामात व विचारात कसा उतरवता येईल याचा क्षणभर विचार करा. खालील "चिंतन AI" बटणावर क्लिक करून सविस्तर मार्गदर्शन मिळवा.
        </div>
      </div>

      {/* Active Audio Player */}
      {activeAudioOvi && (
        <SimpleAudioPlayer
          ovi={activeAudioOvi}
          chapterTitle={currentChapter?.marathiTitle}
          onClose={() => setActiveAudioOvi(null)}
          onNextOvi={handleNextOvi}
          onPrevOvi={() => {
            setCurrentIndex((prev) => (prev - 1 + FAMOUS_OVIS.length) % FAMOUS_OVIS.length);
          }}
          hasNext={true}
          hasPrev={true}
        />
      )}

      {/* The Ovi Card */}
      <OviCard
        ovi={currentOvi}
        chapterTitle={currentChapter?.marathiTitle}
        fontSize={fontSize}
        isBookmarked={bookmarks.includes(currentOvi.id)}
        onToggleBookmark={onToggleBookmark}
        onAskAi={onAskAi}
        onPlayAudio={(ovi) => setActiveAudioOvi(ovi)}
        isAudioActive={activeAudioOvi?.id === currentOvi.id}
      />
    </div>
  );
};
