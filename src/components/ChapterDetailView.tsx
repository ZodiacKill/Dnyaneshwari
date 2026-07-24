import React, { useState } from 'react';
import { Chapter, Ovi } from '../types';
import { OviCard } from './OviCard';
import { ArrowLeft, BookOpen, Search, Filter, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

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

  const filteredOvis = chapter.keyOvis.filter(ovi => {
    const matchesSearch = searchQuery.trim() === '' ||
      ovi.originalMarathi.includes(searchQuery) ||
      ovi.marathiBhavarth.includes(searchQuery) ||
      ovi.englishTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ovi.oviNumber.toString() === searchQuery.trim();

    const matchesFamous = !filterFamousOnly || ovi.isFamous;

    return matchesSearch && matchesFamous;
  });

  return (
    <div className="space-y-6">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-amber-100/80 p-3.5 rounded-2xl border border-amber-200">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-900 bg-amber-200/80 hover:bg-amber-300 px-3 py-1.5 rounded-xl border border-amber-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>सर्व अध्याय सूची कडे (All Chapters)</span>
        </button>

        {/* Chapter Switcher Controls */}
        <div className="flex items-center gap-2">
          <button
            disabled={chapter.number <= 1}
            onClick={() => onSelectChapter(chapter.number - 1)}
            className="p-1.5 rounded-lg bg-amber-200/80 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-amber-900 border border-amber-300"
            title="मागील अध्याय"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-amber-950 px-2">
            अध्याय {chapter.number} / १८
          </span>
          <button
            disabled={chapter.number >= 18}
            onClick={() => onSelectChapter(chapter.number + 1)}
            className="p-1.5 rounded-lg bg-amber-200/80 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-amber-900 border border-amber-300"
            title="पुढील अध्याय"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chapter Banner & Summary Header */}
      <div className="bg-gradient-to-br from-amber-900 via-amber-950 to-orange-950 text-amber-50 rounded-3xl p-6 sm:p-8 shadow-md border border-amber-800/80">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="bg-amber-800 text-amber-200 text-xs font-bold px-3 py-1 rounded-full border border-amber-700">
            {chapter.sanskritName}
          </span>
          <span className="bg-amber-800/60 text-amber-300 text-xs px-2.5 py-1 rounded-full border border-amber-700/60">
            एकूण {chapter.totalOvis} ओव्या
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 mb-2">
          {chapter.marathiTitle}
        </h2>
        <p className="text-xs sm:text-sm text-amber-300/90 font-medium italic mb-4">
          {chapter.englishTitle}
        </p>

        <div className="bg-amber-950/70 p-4 rounded-2xl border border-amber-800/80 text-xs sm:text-sm text-amber-200/95 leading-relaxed space-y-2">
          <p>
            <strong className="text-amber-100">अध्याय सार: </strong>
            {chapter.summaryMarathi}
          </p>
          <p className="italic text-amber-300/80 border-t border-amber-900/80 pt-2">
            {chapter.summaryEnglish}
          </p>
        </div>
      </div>

      {/* Filter / Search within Chapter */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-amber-100/60 p-4 rounded-2xl border border-amber-200">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-amber-700 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`अध्याय ${chapter.number} मधील ओवी किंवा शब्द शोधा (उदा. 'मन', '११')...`}
            className="w-full text-xs sm:text-sm pl-9 pr-4 py-2 bg-white rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-950"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterFamousOnly(!filterFamousOnly)}
            className={`text-xs px-3 py-2 rounded-xl font-medium border transition-colors ${
              filterFamousOnly
                ? 'bg-amber-800 text-amber-100 border-amber-700 font-bold'
                : 'bg-white text-amber-900 border-amber-300 hover:bg-amber-200/60'
            }`}
          >
            {filterFamousOnly ? '✓ फक्त प्रसिद्ध ओव्या' : 'सर्व ओव्या दाखवा'}
          </button>
        </div>
      </div>

      {/* Ovi Cards List */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="font-serif text-lg font-bold text-amber-950">
            अध्याय {chapter.number} मधील ओव्या ({filteredOvis.length})
          </h3>
        </div>

        {filteredOvis.length === 0 ? (
          <div className="bg-amber-50 rounded-2xl p-8 text-center border border-amber-200 my-6">
            <p className="text-sm font-semibold text-amber-900">
              या शोधासाठी ओवी सापडली नाही.
            </p>
            <p className="text-xs text-amber-700 mt-1">
              कृपया वेगळा शोध शब्द किंवा ओवी क्रमांक टाइप करा.
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
            />
          ))
        )}
      </div>
    </div>
  );
};
