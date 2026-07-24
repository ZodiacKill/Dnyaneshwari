import React, { useState, useTransition, useMemo } from 'react';
import { ALL_OVIS, TOPIC_TAGS, ALL_CHAPTERS } from '../data/dnyaneshwariData';
import { Ovi, Chapter } from '../types';
import { OviCard } from './OviCard';
import { Search, Tag, BookOpen, RotateCcw, ChevronRight, Sparkles, Filter } from 'lucide-react';

interface SearchModuleProps {
  bookmarks: string[];
  onToggleBookmark: (oviId: string, note?: string) => void;
  onAskAi: (ovi: Ovi) => void;
  onSelectChapter?: (num: number) => void;
}

// Convert Devanagari numerals (०-९) to ASCII digits (0-9)
const normalizeSearchQuery = (input: string): string => {
  const devanagariMap: Record<string, string> = {
    '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
    '५': '5', '६': '6', '७': '7', '८': '8', '९': '9'
  };
  return input
    .replace(/[०-९]/g, match => devanagariMap[match] || match)
    .trim()
    .toLowerCase();
};

export const SearchModule: React.FC<SearchModuleProps> = ({
  bookmarks,
  onToggleBookmark,
  onAskAi,
  onSelectChapter,
}) => {
  const [rawQuery, setRawQuery] = useState('');
  const [query, setQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number | 'all'>('all');
  const [selectedTag, setSelectedTag] = useState<string | 'all'>('all');
  const [filterType, setFilterType] = useState<'all' | 'chapters' | 'ovis'>('all');
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (val: string) => {
    setRawQuery(val);
    startTransition(() => {
      setQuery(val);
    });
  };

  const handleResetFilters = () => {
    setRawQuery('');
    setQuery('');
    setSelectedChapter('all');
    setSelectedTag('all');
    setFilterType('all');
  };

  const normalizedQuery = useMemo(() => normalizeSearchQuery(query), [query]);

  // Search matching chapters
  const matchedChapters = useMemo(() => {
    if (!normalizedQuery) return [];
    return ALL_CHAPTERS.filter(ch => {
      const chNumStr = ch.number.toString();
      const marathiNum = ['०','१','२','३','४','५','६','७','८','९'][ch.number] || '';
      return (
        ch.marathiTitle.toLowerCase().includes(normalizedQuery) ||
        ch.englishTitle.toLowerCase().includes(normalizedQuery) ||
        ch.sanskritName.toLowerCase().includes(normalizedQuery) ||
        ch.summaryMarathi.toLowerCase().includes(normalizedQuery) ||
        ch.summaryEnglish.toLowerCase().includes(normalizedQuery) ||
        ch.themes.some(t => t.toLowerCase().includes(normalizedQuery)) ||
        chNumStr === normalizedQuery ||
        `अध्याय ${chNumStr}`.includes(normalizedQuery) ||
        `अध्याय ${marathiNum}`.includes(normalizedQuery)
      );
    });
  }, [normalizedQuery]);

  // Search matching ovis
  const matchedOvis = useMemo(() => {
    return ALL_OVIS.filter(ovi => {
      // Search query match
      const q = normalizedQuery;
      const oviNumStr = `${ovi.chapterNumber}.${ovi.oviNumber}`;

      const matchesQuery = !q ||
        ovi.originalMarathi.toLowerCase().includes(q) ||
        ovi.marathiBhavarth.toLowerCase().includes(q) ||
        ovi.englishTranslation.toLowerCase().includes(q) ||
        ovi.spiritualInsight.toLowerCase().includes(q) ||
        ovi.id === q ||
        oviNumStr === q ||
        ovi.tags.some(t => t.toLowerCase().includes(q));

      // Chapter filter
      const matchesChapter = selectedChapter === 'all' || ovi.chapterNumber === selectedChapter;

      // Tag filter
      const matchesTag = selectedTag === 'all' || ovi.tags.includes(selectedTag);

      return matchesQuery && matchesChapter && matchesTag;
    });
  }, [normalizedQuery, selectedChapter, selectedTag]);

  const totalResultsCount = (filterType === 'ovis' ? 0 : matchedChapters.length) + matchedOvis.length;

  return (
    <div className="space-y-6">
      {/* Search Header Banner */}
      <div className="bg-gradient-to-br from-[#78350F] via-[#5B2508] to-[#2D241E] text-amber-50 rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-800/80 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-800/80 text-amber-200 text-xs font-bold px-3 py-1 rounded-full border border-amber-700/80">
              १-१८ अध्याय शोधयंत्र
            </span>
            <span className="text-xs text-amber-300/80 font-medium hidden sm:inline">
              (Dnyaneshwari Universal Search)
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 mb-2">
            ज्ञानेश्वरी शोधयंत्र व विषय सूची
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/90 font-sans leading-relaxed">
            ओवी, अध्याय, भावार्थ, इंग्रजी अनुवाद किंवा विषयानुरूप शोध घ्या. (उदा. 'कर्म', 'भक्ती', 'स्थितप्रज्ञ', '2.11', 'अध्याय १२').
          </p>

          {/* Search Input Box */}
          <div className="mt-5 relative">
            <Search className="w-5 h-5 text-amber-700 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={rawQuery}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="येथे शब्द किंवा अध्याय क्रमांक लिहा (उदा. 'कर्मयोगी', 'पसायदान', '12.145', 'अध्याय ६')..."
              className="w-full pl-12 pr-24 py-3.5 text-sm sm:text-base bg-[#FFFDF8] text-amber-950 rounded-2xl border-2 border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-500/30 font-medium shadow-inner"
            />
            {rawQuery && (
              <button
                onClick={() => handleInputChange('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold rounded-full px-3 py-1 transition-colors"
              >
                रीसेट
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Controls & Topic Tags */}
      <div className="bg-[#FFFDF8] p-4 sm:p-5 rounded-2xl border border-[#D4C3A1] shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Chapter Filter Dropdown */}
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-900" />
            <span className="text-xs font-bold text-amber-950">अध्याय निवड:</span>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="text-xs px-3 py-2 bg-amber-50/80 rounded-xl border border-amber-300 font-medium text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">सर्व १८ अध्याय (All 18 Chapters)</option>
              {ALL_CHAPTERS.map(ch => (
                <option key={ch.number} value={ch.number}>
                  अध्याय {ch.number}: {ch.sanskritName}
                </option>
              ))}
            </select>
          </div>

          {/* Result Type Tabs */}
          <div className="flex items-center gap-1 bg-amber-100/80 p-1 rounded-xl border border-amber-300/80 text-xs font-medium">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterType === 'all' ? 'bg-[#78350F] text-amber-100 font-bold' : 'text-amber-900 hover:bg-amber-200/80'
              }`}
            >
              सर्व ({totalResultsCount})
            </button>
            <button
              onClick={() => setFilterType('chapters')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterType === 'chapters' ? 'bg-[#78350F] text-amber-100 font-bold' : 'text-amber-900 hover:bg-amber-200/80'
              }`}
            >
              अध्याय ({matchedChapters.length})
            </button>
            <button
              onClick={() => setFilterType('ovis')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterType === 'ovis' ? 'bg-[#78350F] text-amber-100 font-bold' : 'text-amber-900 hover:bg-amber-200/80'
              }`}
            >
              ओव्या ({matchedOvis.length})
            </button>
          </div>

          {/* Clear Filters Button */}
          {(query || selectedChapter !== 'all' || selectedTag !== 'all' || filterType !== 'all') && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 text-xs text-amber-900 font-bold bg-amber-200/80 hover:bg-amber-300 px-3 py-1.5 rounded-xl border border-amber-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>फिल्टर्स रिसेट करा</span>
            </button>
          )}
        </div>

        {/* Topic Tag Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-1">
          <span className="text-xs font-bold text-amber-950 shrink-0 mr-1 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-amber-800" />
            <span>विषय टॅग:</span>
          </span>

          <button
            onClick={() => setSelectedTag('all')}
            className={`text-xs px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedTag === 'all'
                ? 'bg-[#78350F] text-amber-100 font-bold'
                : 'bg-amber-50 text-amber-950 border border-amber-300/80 hover:bg-amber-100'
            }`}
          >
            सर्व
          </button>

          {TOPIC_TAGS.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedTag(tag)}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedTag === tag
                  ? 'bg-[#78350F] text-amber-100 font-bold'
                  : 'bg-amber-50 text-amber-950 border border-amber-300/80 hover:bg-amber-100'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Skeleton Indicator */}
      {isPending && (
        <div className="py-8 text-center bg-[#FFFDF8] rounded-2xl border border-[#D4C3A1]">
          <div className="w-8 h-8 mx-auto border-3 border-amber-600 border-t-transparent rounded-full animate-spin mb-2" />
          <p className="text-xs font-bold text-amber-950">ज्ञानेश्वरीतील ग्रंथात शोध सुरू आहे...</p>
        </div>
      )}

      {/* Search Results */}
      {!isPending && (
        <div className="space-y-6">

          {/* Section A: Matched Chapters */}
          {filterType !== 'ovis' && matchedChapters.length > 0 && (
            <div>
              <h3 className="font-serif text-lg font-bold text-amber-950 mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-800" />
                <span>सापडलेले अध्याय ({matchedChapters.length})</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchedChapters.map(ch => (
                  <div
                    key={ch.number}
                    onClick={() => onSelectChapter && onSelectChapter(ch.number)}
                    className="bg-[#FFFDF8] rounded-2xl border border-[#D4C3A1] hover:border-amber-600 p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-[#78350F] text-amber-100 text-xs font-serif font-bold px-2.5 py-1 rounded-lg">
                          अध्याय {ch.number}
                        </span>
                        <span className="text-[11px] text-amber-800 font-medium">
                          {ch.totalOvis} ओव्या
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-amber-950 text-base group-hover:text-amber-800">
                        {ch.marathiTitle}
                      </h4>
                      <p className="text-xs text-amber-900/80 line-clamp-2 mt-1">
                        {ch.summaryMarathi}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-amber-200/60 flex items-center justify-between text-xs font-bold text-amber-800">
                      <span>अध्याय उघडा</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section B: Matched Ovis */}
          {filterType !== 'chapters' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-bold text-amber-950 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-800" />
                  <span>सापडलेल्या ओव्या ({matchedOvis.length})</span>
                </h3>
              </div>

              {matchedOvis.length === 0 && matchedChapters.length === 0 ? (
                <div className="bg-[#FFFDF8] rounded-2xl p-8 text-center border border-[#D4C3A1]">
                  <p className="text-sm font-bold text-amber-950">
                    कोणतीही ओवी किंवा अध्याय सापडला नाही.
                  </p>
                  <p className="text-xs text-amber-800 mt-1">
                    कृपया शोध शब्द तपासून पुन्हा प्रयत्न करा.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-4 text-xs bg-[#78350F] text-amber-100 px-4 py-2 rounded-xl font-bold hover:bg-[#5B2508]"
                  >
                    सर्व फिल्टर्स रीसेट करा
                  </button>
                </div>
              ) : (
                matchedOvis.map(ovi => {
                  const ch = ALL_CHAPTERS.find(c => c.number === ovi.chapterNumber);
                  return (
                    <OviCard
                      key={ovi.id}
                      ovi={ovi}
                      chapterTitle={ch?.marathiTitle}
                      isBookmarked={bookmarks.includes(ovi.id)}
                      onToggleBookmark={onToggleBookmark}
                      onAskAi={onAskAi}
                      highlightText={query}
                    />
                  );
                })
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
};
