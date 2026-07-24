import React, { useState, useEffect } from 'react';
import { Chapter, Ovi } from '../types';
import { OviCard } from './OviCard';
import { SimpleAudioPlayer } from './SimpleAudioPlayer';
import { ArrowLeft, BookOpen, Search, ChevronLeft, ChevronRight, Menu, Tag, Sparkles, Volume2, Radio } from 'lucide-react';
import { ChapterSidebarIndex } from './ChapterSidebarIndex';
import { LoadingScreen } from './LoadingScreen';
import { ALL_CHAPTERS } from '../data/dnyaneshwariData';

interface ChapterDetailViewProps {
  chapter: Chapter;
  onBack: () => void;
  onSelectChapter: (num: number) => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  bookmarks: string[];
  onToggleBookmark: (oviId: string, note?: string) => void;
  onAskAi: (ovi: Ovi) => void;
}

export const ChapterDetailView: React.FC<ChapterDetailViewProps> = ({
  chapter,
  onBack,
  onSelectChapter,
  fontSize,
  bookmarks,
  onToggleBookmark,
  onAskAi,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFamousOnly, setFilterFamousOnly] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeAudioOvi, setActiveAudioOvi] = useState<Ovi | null>(null);

  // Trigger smooth loading screen when chapter number changes
  useEffect(() => {
    setIsLoading(true);
    setActiveAudioOvi(null);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [chapter.number]);

  const handleChapterChange = (num: number) => {
    if (num >= 1 && num <= 18) {
      onSelectChapter(num);
    }
  };

  const filteredOvis = chapter.keyOvis.filter(ovi => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = q === '' ||
      ovi.originalMarathi.toLowerCase().includes(q) ||
      ovi.marathiBhavarth.toLowerCase().includes(q) ||
      ovi.englishTranslation.toLowerCase().includes(q) ||
      ovi.oviNumber.toString() === q;

    const matchesFamous = !filterFamousOnly || ovi.isFamous;

    return matchesSearch && matchesFamous;
  });

  // Calculate prev/next Ovi for Audio Player
  const currentAudioIndex = activeAudioOvi
    ? chapter.keyOvis.findIndex(o => o.id === activeAudioOvi.id)
    : -1;

  const handleNextAudioOvi = () => {
    if (currentAudioIndex >= 0 && currentAudioIndex < chapter.keyOvis.length - 1) {
      setActiveAudioOvi(chapter.keyOvis[currentAudioIndex + 1]);
    }
  };

  const handlePrevAudioOvi = () => {
    if (currentAudioIndex > 0) {
      setActiveAudioOvi(chapter.keyOvis[currentAudioIndex - 1]);
    }
  };

  return (
    <div className="flex gap-6 relative items-start">
      {/* Collapsible Chapter Quick Sidebar */}
      <ChapterSidebarIndex
        chapters={ALL_CHAPTERS}
        selectedChapterNumber={chapter.number}
        onSelectChapter={handleChapterChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Chapter Reader Content */}
      <div className="flex-1 min-w-0 space-y-6">

        {/* Top Control Bar & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFFDF8] p-3.5 rounded-2xl border border-[#D4C3A1] shadow-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-950 bg-amber-200/80 hover:bg-amber-300 px-3 py-1.5 rounded-xl border border-amber-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>सर्व अध्याय सूची</span>
            </button>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-1 text-xs font-bold bg-[#78350F] text-amber-100 hover:bg-[#5B2508] px-3 py-1.5 rounded-xl transition-colors"
            >
              <Menu className="w-4 h-4" />
              <span className="hidden sm:inline">अध्याय इंडेक्स (१-१८)</span>
            </button>
          </div>

          {/* Previous / Next Chapter Controls */}
          <div className="flex items-center gap-2">
            <button
              disabled={chapter.number <= 1}
              onClick={() => handleChapterChange(chapter.number - 1)}
              className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 disabled:opacity-40 disabled:cursor-not-allowed text-amber-950 border border-amber-300 transition-colors"
              title="मागील अध्याय"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-amber-950 px-2 font-serif">
              अध्याय {chapter.number} / १८
            </span>
            <button
              disabled={chapter.number >= 18}
              onClick={() => handleChapterChange(chapter.number + 1)}
              className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 disabled:opacity-40 disabled:cursor-not-allowed text-amber-950 border border-amber-300 transition-colors"
              title="पुढील अध्याय"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sticky / Active Audio Player Component for currently viewed Ovi */}
        {activeAudioOvi && (
          <div className="sticky top-16 z-30 transition-all">
            <SimpleAudioPlayer
              ovi={activeAudioOvi}
              chapterTitle={chapter.marathiTitle}
              onClose={() => setActiveAudioOvi(null)}
              onNextOvi={handleNextAudioOvi}
              onPrevOvi={handlePrevAudioOvi}
              hasNext={currentAudioIndex < chapter.keyOvis.length - 1}
              hasPrev={currentAudioIndex > 0}
            />
          </div>
        )}

        {/* Loading overlay when switching chapters */}
        {isLoading ? (
          <LoadingScreen
            message={`अध्याय ${chapter.number}: ${chapter.sanskritName} लोड होत आहे...`}
            subMessage={chapter.marathiTitle}
          />
        ) : (
          <>
            {/* Chapter Header Banner */}
            <div className="bg-gradient-to-br from-[#78350F] via-[#5B2508] to-[#2D241E] text-amber-50 rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-800/80">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-amber-800 text-amber-100 text-xs font-bold px-3 py-1 rounded-full border border-amber-700/80 font-serif">
                    अध्याय {chapter.number}: {chapter.sanskritName}
                  </span>
                  <span className="bg-amber-900/80 text-amber-200 text-xs px-2.5 py-1 rounded-full border border-amber-700/60">
                    एकूण {chapter.totalOvis} ओव्या
                  </span>
                </div>

                <button
                  onClick={() => {
                    if (chapter.keyOvis.length > 0) {
                      setActiveAudioOvi(chapter.keyOvis[0]);
                    }
                  }}
                  className="flex items-center gap-1.5 text-xs bg-amber-700/60 hover:bg-amber-600 text-amber-100 px-3 py-1.5 rounded-full border border-amber-600/60 transition-colors shadow-xs"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>ऑडिओ ऐका (Audio Recitation)</span>
                </button>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 mb-2">
                {chapter.marathiTitle}
              </h2>
              <p className="text-xs sm:text-sm text-amber-200/90 font-medium italic mb-4">
                {chapter.englishTitle}
              </p>

              <div className="bg-amber-950/70 p-4 rounded-2xl border border-amber-800/80 text-xs sm:text-sm text-amber-200/95 leading-relaxed space-y-2">
                <p>
                  <strong className="text-amber-100 font-serif">अध्याय सार: </strong>
                  {chapter.summaryMarathi}
                </p>
                <p className="italic text-amber-300/80 border-t border-amber-900/80 pt-2">
                  {chapter.summaryEnglish}
                </p>
              </div>
            </div>

            {/* Filter / Search within Chapter */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFFDF8] p-4 rounded-2xl border border-[#D4C3A1] shadow-xs">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="w-4 h-4 text-amber-700 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`अध्याय ${chapter.number} मधील ओवी किंवा शब्द शोधा...`}
                  className="w-full text-xs sm:text-sm pl-9 pr-4 py-2 bg-amber-50/60 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-950 font-medium"
                />
              </div>

              <button
                onClick={() => setFilterFamousOnly(!filterFamousOnly)}
                className={`text-xs px-3.5 py-2 rounded-xl font-bold border transition-colors ${
                  filterFamousOnly
                    ? 'bg-[#78350F] text-amber-100 border-[#78350F]'
                    : 'bg-amber-100 text-amber-950 border-amber-300 hover:bg-amber-200'
                }`}
              >
                {filterFamousOnly ? '✓ प्रसिद्ध ओव्या' : 'सर्व ओव्या'}
              </button>
            </div>

            {/* Ovi Cards List */}
            <div>
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="font-serif text-lg font-bold text-amber-950 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-800" />
                  <span>अध्याय {chapter.number} मधील ओव्या ({filteredOvis.length})</span>
                </h3>
              </div>

              {filteredOvis.length === 0 ? (
                <div className="bg-[#FFFDF8] rounded-2xl p-8 text-center border border-[#D4C3A1] my-6">
                  <p className="text-sm font-bold text-amber-950">
                    या शोधासाठी कोणतीही ओवी सापडली नाही.
                  </p>
                  <p className="text-xs text-amber-800 mt-1">
                    कृपया शोध शब्द तपासून पुन्हा प्रयत्न करा.
                  </p>
                </div>
              ) : (
                filteredOvis.map(ovi => (
                  <OviCard
                    key={ovi.id}
                    ovi={ovi}
                    chapterTitle={chapter.marathiTitle}
                    fontSize={fontSize}
                    isBookmarked={bookmarks.includes(ovi.id)}
                    onToggleBookmark={onToggleBookmark}
                    onAskAi={onAskAi}
                    highlightText={searchQuery}
                    onPlayAudio={(selectedOvi) => setActiveAudioOvi(selectedOvi)}
                    isAudioActive={activeAudioOvi?.id === ovi.id}
                  />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
