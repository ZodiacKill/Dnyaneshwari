import React, { useState, useEffect, useMemo } from 'react';
import { Chapter, Ovi } from '../types';
import { OviCard } from './OviCard';
import { ArrowLeft, Search, ChevronLeft, ChevronRight, Menu, Sparkles, Hash, Layers } from 'lucide-react';
import { ChapterSidebarIndex } from './ChapterSidebarIndex';
import { LoadingScreen } from './LoadingScreen';
import { ALL_CHAPTERS, getAllOvisForChapter } from '../data/dnyaneshwariData';

interface ChapterDetailViewProps {
  chapter: Chapter;
  onBack: () => void;
  onSelectChapter: (num: number) => void;
  bookmarks: string[];
  onToggleBookmark: (oviId: string, note?: string) => void;
  onAskAi: (ovi: Ovi) => void;
}

const PAGE_SIZE = 20;

export const ChapterDetailView: React.FC<ChapterDetailViewProps> = ({
  chapter,
  onBack,
  onSelectChapter,
  bookmarks,
  onToggleBookmark,
  onAskAi,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jumpOviNum, setJumpOviNum] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Trigger smooth loading screen when chapter number changes
  useEffect(() => {
    setIsLoading(true);
    setCurrentPage(1);
    setSearchQuery('');
    setJumpOviNum('');
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

  // Get all ovis for the chapter
  const activeOvisSource = useMemo(() => {
    return getAllOvisForChapter(chapter.number);
  }, [chapter]);

  // Filter ovis by search query or direct jump
  const filteredOvis = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const jump = jumpOviNum.trim();

    return activeOvisSource.filter(ovi => {
      if (jump !== '') {
        return ovi.oviNumber.toString() === jump;
      }
      if (q === '') return true;

      return (
        ovi.originalMarathi.toLowerCase().includes(q) ||
        ovi.marathiBhavarth.toLowerCase().includes(q) ||
        ovi.englishTranslation.toLowerCase().includes(q) ||
        ovi.oviNumber.toString() === q
      );
    });
  }, [activeOvisSource, searchQuery, jumpOviNum]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, jumpOviNum]);

  // Calculate paginated slice for better performance
  const totalPages = Math.ceil(filteredOvis.length / PAGE_SIZE) || 1;
  const paginatedOvis = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredOvis.slice(start, start + PAGE_SIZE);
  }, [filteredOvis, currentPage, searchQuery, jumpOviNum]);

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

            {/* Search & Jump Controls */}
            <div className="bg-[#FFFDF8] p-4 rounded-2xl border border-[#D4C3A1] shadow-xs space-y-3">

              {/* Search + Direct Jump Input */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 text-amber-700 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`अध्याय ${chapter.number} मधील ओवी किंवा शब्द शोधा...`}
                    className="w-full text-xs sm:text-sm pl-9 pr-4 py-2 bg-amber-50/60 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-950 font-medium"
                  />
                </div>

                {/* Direct Ovi Jump */}
                <div className="relative w-40">
                  <Hash className="w-3.5 h-3.5 text-amber-700 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="1"
                    max={chapter.totalOvis}
                    value={jumpOviNum}
                    onChange={(e) => setJumpOviNum(e.target.value)}
                    placeholder={`ओवी क्रमांक (१-${chapter.totalOvis})`}
                    className="w-full text-xs pl-8 pr-3 py-2 bg-amber-50/60 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-950 font-medium"
                  />
                </div>

                {(searchQuery || jumpOviNum) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setJumpOviNum('');
                    }}
                    className="text-xs text-amber-800 hover:text-amber-950 font-bold underline px-2"
                  >
                    शोधा रीसेट करा
                  </button>
                )}
              </div>
            </div>

            {/* Ovi Cards List Header & Pagination Controls */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 px-1">
                <h3 className="font-serif text-lg font-bold text-amber-950 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-800" />
                  <span>
                    अध्याय {chapter.number} - ओव्या (एकूण {filteredOvis.length})
                  </span>
                </h3>

                {/* Top Pagination if multiple pages */}
                {totalPages > 1 && (
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
                    <button
                      disabled={currentPage <= 1}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 disabled:opacity-40 disabled:cursor-not-allowed border border-amber-300"
                    >
                      मागील
                    </button>
                    <span>पान {currentPage} / {totalPages}</span>
                    <button
                      disabled={currentPage >= totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 disabled:opacity-40 disabled:cursor-not-allowed border border-amber-300"
                    >
                      पुढील
                    </button>
                  </div>
                )}
              </div>

              {paginatedOvis.length === 0 ? (
                <div className="bg-[#FFFDF8] rounded-2xl p-8 text-center border border-[#D4C3A1] my-6">
                  <p className="text-sm font-bold text-amber-950">
                    या शोधासाठी अथवा ओवी क्रमांकासाठी (१ ते {chapter.totalOvis}) कोणतीही ओवी सापडली नाही.
                  </p>
                  <p className="text-xs text-amber-800 mt-1">
                    कृपया ओवी क्रमांक १ ते {chapter.totalOvis} मधील प्रविष्ट करा.
                  </p>
                </div>
              ) : (
                paginatedOvis.map(ovi => (
                  <OviCard
                    key={ovi.id}
                    ovi={ovi}
                    chapterTitle={chapter.marathiTitle}
                    isBookmarked={bookmarks.includes(ovi.id)}
                    onToggleBookmark={onToggleBookmark}
                    onAskAi={onAskAi}
                    highlightText={searchQuery}
                  />
                ))
              )}

              {/* Bottom Pagination controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-6 pt-4 border-t border-amber-200/80">
                  <button
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 disabled:opacity-40 disabled:cursor-not-allowed border border-amber-300 text-amber-950 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>मागील पान</span>
                  </button>

                  <span className="text-xs font-bold font-serif text-amber-950 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                    पान {currentPage} / {totalPages} (ओवी {(currentPage - 1) * PAGE_SIZE + 1} ते {Math.min(currentPage * PAGE_SIZE, filteredOvis.length)})
                  </span>

                  <button
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 disabled:opacity-40 disabled:cursor-not-allowed border border-amber-300 text-amber-950 transition-colors"
                  >
                    <span>पुढील पान</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
