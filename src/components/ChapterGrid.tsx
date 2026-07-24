import React, { useState } from 'react';
import { Chapter } from '../types';
import { BookOpen, ChevronRight, Tag, Sparkles } from 'lucide-react';

interface ChapterGridProps {
  chapters: Chapter[];
  onSelectChapter: (chapterNumber: number) => void;
}

export const ChapterGrid: React.FC<ChapterGridProps> = ({ chapters, onSelectChapter }) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('all');

  const allThemes = Array.from(
    new Set(chapters.flatMap(c => c.themes))
  );

  const filteredChapters = selectedTheme === 'all'
    ? chapters
    : chapters.filter(c => c.themes.includes(selectedTheme));

  return (
    <div className="space-y-6">
      {/* Hero Intro Banner */}
      <div className="bg-gradient-to-br from-[#78350F] via-[#5B2508] to-[#2D241E] text-amber-50 rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-800/80 relative overflow-hidden">
        {/* Decorative Background Om pattern */}
        <div className="absolute -right-8 -bottom-10 opacity-10 font-serif text-[180px] pointer-events-none select-none text-amber-200">
          ॐ
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-amber-800/80 border border-amber-600/60 text-amber-200 px-3 py-1 rounded-full text-xs font-bold mb-3 shadow-inner font-serif">
            <span>अध्याय १ ते १८ संपूर्ण ज्ञानेश्वरी</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-amber-100 mb-3 leading-snug">
            संत ज्ञानेश्वर महाराज कृत भावार्थदीपिका
          </h2>
          <p className="text-amber-200/90 text-sm sm:text-base leading-relaxed font-sans mb-4">
            श्रीमद्भगवद्गीतेवरील सुलभ व रसाळ प्राकृत मराठीतील अद्वितीय ग्रंथ. १८ अध्यायांचे मूळ श्लोक, संत ज्ञानेश्वरांची ओवी, मराठी भावार्थ व इंग्रजी भाषांतरासह अभ्यासा.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-amber-300/90 pt-3 border-t border-amber-800/80">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>१८ संपूर्ण अध्याय (18 Chapters)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>९,०००+ ओव्या भावार्थासह</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-300"></span>
              <span>पसायदान व चिंतन AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Filter Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-[#FFFDF8] p-3.5 rounded-2xl border border-[#D4C3A1] shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
          <Tag className="w-4 h-4 text-amber-800" />
          <span>विषयानुसार अध्याय शोधा:</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => setSelectedTheme('all')}
            className={`text-xs px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all ${
              selectedTheme === 'all'
                ? 'bg-[#78350F] text-amber-100 shadow-xs'
                : 'bg-amber-50 text-amber-950 hover:bg-amber-100 border border-amber-300/60'
            }`}
          >
            सर्व अध्याय ({chapters.length})
          </button>
          {allThemes.slice(0, 8).map((theme, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedTheme(theme)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                selectedTheme === theme
                  ? 'bg-[#78350F] text-amber-100 font-bold shadow-xs'
                  : 'bg-amber-50 text-amber-950 hover:bg-amber-100 border border-amber-300/60'
              }`}
            >
              #{theme}
            </button>
          ))}
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredChapters.map((chapter) => (
          <div
            key={chapter.number}
            onClick={() => onSelectChapter(chapter.number)}
            className="bg-[#FFFDF8] rounded-2xl border border-[#D4C3A1] hover:border-amber-600 shadow-xs hover:shadow-md transition-all cursor-pointer p-5 flex flex-col justify-between group relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-9 h-9 rounded-xl bg-[#78350F] text-amber-100 font-serif font-bold text-sm flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  {chapter.number}
                </span>
                <span className="text-xs bg-amber-100 text-amber-950 font-bold px-2.5 py-0.5 rounded-full border border-amber-300">
                  {chapter.totalOvis} ओव्या
                </span>
              </div>

              <h3 className="font-serif text-lg font-bold text-amber-950 mb-1 group-hover:text-amber-800 transition-colors">
                {chapter.marathiTitle}
              </h3>
              <p className="text-xs text-amber-900/80 font-medium italic mb-3">
                {chapter.englishTitle}
              </p>

              <p className="text-xs text-amber-950/80 leading-relaxed font-sans line-clamp-3 mb-4">
                {chapter.summaryMarathi}
              </p>
            </div>

            {/* Bottom Themes & Arrow */}
            <div className="pt-3 border-t border-amber-200/80 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {chapter.themes.slice(0, 2).map((t, idx) => (
                  <span key={idx} className="text-[10px] bg-amber-100/80 text-amber-900 px-2 py-0.5 rounded border border-amber-300/60 font-medium">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex items-center text-xs font-bold text-amber-900 group-hover:translate-x-1 transition-transform">
                <span>अध्याय वाचा</span>
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
