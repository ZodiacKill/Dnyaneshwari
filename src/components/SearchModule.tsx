import React, { useState } from 'react';
import { ALL_OVIS, TOPIC_TAGS, ALL_CHAPTERS } from '../data/dnyaneshwariData';
import { Ovi } from '../types';
import { OviCard } from './OviCard';
import { Search, Filter, Tag, BookOpen, RotateCcw } from 'lucide-react';

interface SearchModuleProps {
  fontSize: 'normal' | 'large' | 'xlarge';
  bookmarks: string[];
  onToggleBookmark: (oviId: string, note?: string) => void;
  onAskAi: (ovi: Ovi) => void;
}

export const SearchModule: React.FC<SearchModuleProps> = ({
  fontSize,
  bookmarks,
  onToggleBookmark,
  onAskAi,
}) => {
  const [query, setQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number | 'all'>('all');
  const [selectedTag, setSelectedTag] = useState<string | 'all'>('all');

  const filteredOvis = ALL_OVIS.filter(ovi => {
    // Search query match
    const q = query.trim().toLowerCase();
    const matchesQuery = !q ||
      ovi.originalMarathi.toLowerCase().includes(q) ||
      ovi.marathiBhavarth.toLowerCase().includes(q) ||
      ovi.englishTranslation.toLowerCase().includes(q) ||
      ovi.spiritualInsight.toLowerCase().includes(q) ||
      ovi.id === q ||
      `${ovi.chapterNumber}.${ovi.oviNumber}` === q;

    // Chapter filter
    const matchesChapter = selectedChapter === 'all' || ovi.chapterNumber === selectedChapter;

    // Tag filter
    const matchesTag = selectedTag === 'all' || ovi.tags.includes(selectedTag);

    return matchesQuery && matchesChapter && matchesTag;
  });

  const handleResetFilters = () => {
    setQuery('');
    setSelectedChapter('all');
    setSelectedTag('all');
  };

  return (
    <div className="space-y-6">
      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-950 to-orange-950 text-amber-50 rounded-3xl p-6 shadow-md border border-amber-800/80">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
          ज्ञानेश्वरी शोधयंत्र (Dnyaneshwari Search)
        </h2>
        <p className="text-xs sm:text-sm text-amber-200/90 font-sans">
          ओवी, शब्द, भावार्थ किंवा विषयानुसार संपूर्ण ज्ञानेश्वरीतील अध्यायांमध्ये शोधा. (Search across original Ovis, Marathi Bhavarth, and English translations).
        </p>

        {/* Input Field */}
        <div className="mt-4 relative">
          <Search className="w-5 h-5 text-amber-600 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="येथे शब्द टाइप करा (उदा. 'कर्म', 'भक्ती', 'मन', 'पसायदान', '12.145')..."
            className="w-full pl-12 pr-10 py-3 text-sm sm:text-base bg-amber-50 text-amber-950 rounded-2xl border-2 border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-500/30 font-medium shadow-inner"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-full px-2 py-0.5"
            >
              रीसेट
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-amber-100/70 p-4 rounded-2xl border border-amber-200 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Chapter Filter Dropdown */}
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-800" />
            <span className="text-xs font-bold text-amber-950">अध्याय शोधा:</span>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="text-xs px-3 py-1.5 bg-white rounded-xl border border-amber-300 font-medium text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">सर्व १८ अध्याय (All Chapters)</option>
              {ALL_CHAPTERS.map(ch => (
                <option key={ch.number} value={ch.number}>
                  अध्याय {ch.number}: {ch.sanskritName}
                </option>
              ))}
            </select>
          </div>

          {/* Reset button */}
          {(query || selectedChapter !== 'all' || selectedTag !== 'all') && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-xs text-amber-800 hover:text-amber-950 font-bold bg-amber-200/80 px-2.5 py-1 rounded-lg border border-amber-300"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>सर्व फिल्टर्स काढा</span>
            </button>
          )}
        </div>

        {/* Topic Tag Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1">
          <span className="text-xs font-bold text-amber-900 shrink-0 mr-1 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-amber-700" />
            <span>विषय:</span>
          </span>

          <button
            onClick={() => setSelectedTag('all')}
            className={`text-xs px-2.5 py-1 rounded-lg font-medium whitespace-nowrap ${
              selectedTag === 'all'
                ? 'bg-amber-800 text-amber-100 font-bold'
                : 'bg-white text-amber-900 border border-amber-300/60'
            }`}
          >
            सर्व विषय
          </button>

          {TOPIC_TAGS.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedTag(tag)}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium whitespace-nowrap ${
                selectedTag === tag
                  ? 'bg-amber-800 text-amber-100 font-bold'
                  : 'bg-white text-amber-900 border border-amber-300/60'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header & List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-bold text-amber-950">
            शोधाचे निकाल ({filteredOvis.length} ओव्या सापडल्या)
          </h3>
        </div>

        {filteredOvis.length === 0 ? (
          <div className="bg-amber-50 rounded-2xl p-8 text-center border border-amber-200">
            <p className="text-sm font-bold text-amber-900">
              कोणतीही ओवी सापडली नाही.
            </p>
            <p className="text-xs text-amber-700 mt-1">
              कृपया शोध शब्द किंवा निवडलेले फिल्टर्स तपासून पुन्हा प्रयत्न करा.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-3 text-xs bg-amber-800 text-amber-100 px-4 py-2 rounded-xl font-bold"
            >
              फिल्टर्स रिसेट करा
            </button>
          </div>
        ) : (
          filteredOvis.map(ovi => {
            const ch = ALL_CHAPTERS.find(c => c.number === ovi.chapterNumber);
            return (
              <OviCard
                key={ovi.id}
                ovi={ovi}
                chapterTitle={ch?.marathiTitle}
                fontSize={fontSize}
                isBookmarked={bookmarks.includes(ovi.id)}
                onToggleBookmark={onToggleBookmark}
                onAskAi={onAskAi}
                highlightText={query}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
