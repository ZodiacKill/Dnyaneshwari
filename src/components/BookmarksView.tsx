import React from 'react';
import { ALL_OVIS, ALL_CHAPTERS } from '../data/dnyaneshwariData';
import { Ovi } from '../types';
import { OviCard } from './OviCard';
import { Heart, Trash2, MessageSquare } from 'lucide-react';

interface BookmarksViewProps {
  fontSize: 'normal' | 'large' | 'xlarge';
  bookmarks: string[];
  userNotes: Record<string, string>;
  onToggleBookmark: (oviId: string, note?: string) => void;
  onAskAi: (ovi: Ovi) => void;
  onClearAllBookmarks: () => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  fontSize,
  bookmarks,
  userNotes,
  onToggleBookmark,
  onAskAi,
  onClearAllBookmarks,
}) => {
  const bookmarkedOvis = ALL_OVIS.filter(ovi => bookmarks.includes(ovi.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-950 to-orange-950 text-amber-50 rounded-3xl p-6 shadow-md border border-amber-800/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-800/80 border border-amber-600/60 text-amber-200 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>जतन केलेल्या आवडत्या ओव्या ({bookmarkedOvis.length})</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            तुमच्या वैयक्तिक आवडत्या ओव्या
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/90 font-sans mt-1">
            तुम्ही अभ्यासासाठी आणि मननासाठी जतन केलेल्या ओव्या आणि तुमच्या वैयक्तिक टिप्पणी.
          </p>
        </div>

        {bookmarkedOvis.length > 0 && (
          <button
            onClick={onClearAllBookmarks}
            className="flex items-center gap-1.5 bg-rose-900/80 hover:bg-rose-900 text-rose-100 text-xs px-3.5 py-2 rounded-xl border border-rose-700 font-bold transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span>सर्व काढा (Clear All)</span>
          </button>
        )}
      </div>

      {/* Bookmarks List */}
      {bookmarkedOvis.length === 0 ? (
        <div className="bg-amber-50 rounded-2xl p-12 text-center border border-amber-200 max-w-xl mx-auto my-8">
          <Heart className="w-12 h-12 text-amber-300 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-amber-950">
            अद्याप कोणतीही ओवी जतन केलेली नाही
          </h3>
          <p className="text-xs text-amber-800 mt-1 leading-relaxed">
            कोणत्याही ओवीवरील हृदय (❤️) चिन्हावर क्लिक करून तुम्ही ती ओवी येथे जतन करू शकता व स्वतःची टीप जोडू शकता.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookmarkedOvis.map(ovi => {
            const ch = ALL_CHAPTERS.find(c => c.number === ovi.chapterNumber);
            const note = userNotes[ovi.id];

            return (
              <div key={ovi.id} className="space-y-2">
                {note && (
                  <div className="bg-amber-100 border-l-4 border-amber-600 p-3 rounded-r-xl text-xs font-sans text-amber-950 flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-900 font-bold">तुमची टीप:</strong> {note}
                    </div>
                  </div>
                )}
                <OviCard
                  ovi={ovi}
                  chapterTitle={ch?.marathiTitle}
                  fontSize={fontSize}
                  isBookmarked={true}
                  onToggleBookmark={onToggleBookmark}
                  onAskAi={onAskAi}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
