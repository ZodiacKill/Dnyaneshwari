import React from 'react';
import { Volume2, VolumeX, Search, BookOpen, Key, Sparkles } from 'lucide-react';

interface StatusBarProps {
  isTanpuraPlaying: boolean;
  onToggleTanpura: () => void;
  onOpenSearch: () => void;
  onOpenAi: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  isTanpuraPlaying,
  onToggleTanpura,
  onOpenSearch,
  onOpenAi,
}) => {
  return (
    <footer className="sticky bottom-0 z-30 bg-[#2D241E] text-amber-200 border-t border-amber-800/80 px-4 py-2 text-xs font-sans shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left Stats */}
        <div className="flex items-center gap-4 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5 text-amber-100 font-serif font-bold">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>१८ संपूर्ण अध्याय | ९,०३३ ओव्या</span>
          </div>
          <span className="text-amber-700 hidden sm:inline">|</span>
          <span className="text-amber-300/80 hidden sm:inline">
            भावार्थदीपिका आवृत्ती ४.२ (अमृतवाणी)
          </span>
        </div>

        {/* Shortcuts & Actions */}
        <div className="flex items-center gap-2 text-[11px]">
          {/* Quick Search Shortcut */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1 bg-amber-900/60 hover:bg-amber-800 text-amber-200 px-2.5 py-1 rounded-md border border-amber-700/60 transition-colors"
          >
            <Search className="w-3 h-3 text-amber-400" />
            <span>शोध (Search)</span>
            <span className="bg-amber-950 text-amber-300 text-[9px] px-1 rounded font-mono hidden md:inline">Alt+S</span>
          </button>

          {/* AI Helper Shortcut */}
          <button
            onClick={onOpenAi}
            className="flex items-center gap-1 bg-amber-800 hover:bg-amber-700 text-amber-100 px-2.5 py-1 rounded-md border border-amber-600 transition-colors font-bold"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>चिंतन AI</span>
          </button>

          {/* Audio Drone */}
          <button
            onClick={onToggleTanpura}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] transition-colors border ${
              isTanpuraPlaying
                ? 'bg-amber-600 text-amber-950 font-bold border-amber-400 animate-pulse'
                : 'bg-amber-900/40 text-amber-300 border-amber-800/80 hover:bg-amber-800/60'
            }`}
          >
            {isTanpuraPlaying ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
            <span>{isTanpuraPlaying ? 'तानपुरा चालू' : 'तानपुरा'}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
