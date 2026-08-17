import React from 'react';
import { Chapter } from '../types';
import { BookOpen, ChevronRight, X } from 'lucide-react';

interface ChapterSidebarIndexProps {
  chapters: Chapter[];
  selectedChapterNumber: number;
  onSelectChapter: (chapterNum: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const ChapterSidebarIndex: React.FC<ChapterSidebarIndexProps> = ({
  chapters,
  selectedChapterNumber,
  onSelectChapter,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-amber-950/40 backdrop-blur-xs lg:hidden"
      />

      {/* Sidebar Panel */}
      <aside className="fixed lg:sticky top-16 left-0 z-50 lg:z-10 w-72 h-[calc(100vh-4rem)] bg-[#F9F4E8] border-r border-[#D4C3A1] shadow-xl flex flex-col transition-transform duration-200 ease-in-out">
        {/* Header */}
        <div className="p-4 bg-amber-950 text-amber-50 flex items-center justify-between border-b border-amber-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif font-bold text-sm">
              अध्याय सूची (१ ते १८)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-amber-800 text-amber-300 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chapters List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chapters.map((ch) => {
            const isSelected = ch.number === selectedChapterNumber;
            return (
              <button
                key={ch.number}
                onClick={() => {
                  onSelectChapter(ch.number);
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-2 border ${
                  isSelected
                    ? 'bg-[#78350F] text-amber-50 border-[#78350F] shadow-sm font-bold'
                    : 'bg-white/60 text-amber-950 hover:bg-amber-100/80 border-amber-200/60'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-6 h-6 rounded-lg text-xs font-serif font-bold flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-amber-200 text-amber-950'
                        : 'bg-amber-800/10 text-amber-900'
                    }`}
                  >
                    {ch.number}
                  </span>
                  <div className="truncate">
                    <p className="text-xs font-serif font-semibold truncate leading-tight">
                      {ch.sanskritName}
                    </p>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-200' : 'text-amber-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-amber-100/80 border-t border-amber-300/80 text-[11px] text-amber-900 font-medium text-center">
          संत ज्ञानेश्वर महाराज विरचित १८ संपूर्ण अध्याय
        </div>
      </aside>
    </>
  );
};
