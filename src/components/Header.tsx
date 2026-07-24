import React from 'react';
import { BookOpen, Search, Heart, Sparkles, Volume2, VolumeX, Sun, Feather, Type } from 'lucide-react';

interface HeaderProps {
  activeTab: 'chapters' | 'search' | 'pasayadan' | 'daily' | 'bookmarks' | 'ai';
  setActiveTab: (tab: 'chapters' | 'search' | 'pasayadan' | 'daily' | 'bookmarks' | 'ai') => void;
  isTanpuraPlaying: boolean;
  onToggleTanpura: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  bookmarkCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isTanpuraPlaying,
  onToggleTanpura,
  fontSize,
  setFontSize,
  bookmarkCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#2D241E] text-amber-50 backdrop-blur-md border-b border-amber-900/80 shadow-lg">
      {/* Top sacred accent bar */}
      <div className="h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Logo & Title */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('chapters')}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 flex items-center justify-center text-amber-100 font-bold shadow-md border border-amber-400/50 shrink-0 group-hover:scale-105 transition-transform">
              <span className="font-serif text-2xl font-black">ॐ</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-amber-100">
                  मराठी ज्ञानेश्वरी
                </h1>
                <span className="text-[11px] bg-amber-800/80 text-amber-200 px-2 py-0.5 rounded-md border border-amber-700/60 font-medium hidden sm:inline-block">
                  भावार्थदीपिका
                </span>
              </div>
              <p className="text-[11px] text-amber-300/80 font-sans">
                संत ज्ञानेश्वर महाराज विरचित १८ अध्यायांचे ग्रंथालय
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('chapters')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'chapters'
                  ? 'bg-[#78350F] text-amber-100 shadow-sm border border-amber-600/60'
                  : 'text-amber-200/90 hover:bg-amber-900/60 hover:text-amber-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>अध्याय (१-१८)</span>
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'search'
                  ? 'bg-[#78350F] text-amber-100 shadow-sm border border-amber-600/60'
                  : 'text-amber-200/90 hover:bg-amber-900/60 hover:text-amber-100'
              }`}
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span>शोध (Search)</span>
            </button>

            <button
              onClick={() => setActiveTab('pasayadan')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'pasayadan'
                  ? 'bg-[#78350F] text-amber-100 shadow-sm border border-amber-600/60'
                  : 'text-amber-200/90 hover:bg-amber-900/60 hover:text-amber-100'
              }`}
            >
              <Feather className="w-4 h-4 text-amber-400" />
              <span>पसायदान</span>
            </button>

            <button
              onClick={() => setActiveTab('daily')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'daily'
                  ? 'bg-[#78350F] text-amber-100 shadow-sm border border-amber-600/60'
                  : 'text-amber-200/90 hover:bg-amber-900/60 hover:text-amber-100'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-400" />
              <span>आजची ओवी</span>
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'ai'
                  ? 'bg-amber-500 text-amber-950 shadow-md'
                  : 'bg-amber-900/80 text-amber-200 hover:bg-amber-800 border border-amber-700/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>चिंतन AI</span>
            </button>
          </nav>

          {/* Quick Controls */}
          <div className="flex items-center gap-2">
            {/* Tanpura Audio Drone */}
            <button
              onClick={onToggleTanpura}
              title={isTanpuraPlaying ? "तानपुरा बंद करा" : "तानपुरा ध्वनी सुरू करा"}
              className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-xl transition-all border ${
                isTanpuraPlaying
                  ? 'bg-amber-600 text-amber-950 border-amber-400 font-bold animate-pulse'
                  : 'bg-amber-900/40 text-amber-300 border-amber-800 hover:bg-amber-900/80'
              }`}
            >
              {isTanpuraPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden lg:inline">{isTanpuraPlaying ? 'तानपुरा चालू' : 'तानपुरा'}</span>
            </button>

            {/* Font Size Selector */}
            <div className="flex items-center gap-1 bg-amber-950/80 rounded-xl border border-amber-700/80 p-1 shadow-inner">
              <span className="text-[11px] font-bold text-amber-300/80 px-1 hidden sm:inline-flex items-center gap-1">
                <Type className="w-3.5 h-3.5 text-amber-400" />
                <span>अक्षर</span>
              </span>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2.5 py-1 text-xs rounded-lg transition-all font-black ${
                  fontSize === 'normal'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 shadow-md ring-2 ring-amber-300 scale-105'
                    : 'text-amber-200/90 hover:text-amber-100 hover:bg-amber-900/60'
                }`}
                title="सामान्य अक्षर आकार (Normal Font)"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2.5 py-1 text-xs rounded-lg transition-all font-black ${
                  fontSize === 'large'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 shadow-md ring-2 ring-amber-300 scale-105'
                    : 'text-amber-200/90 hover:text-amber-100 hover:bg-amber-900/60'
                }`}
                title="मोठे अक्षर आकार (Large Font)"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2.5 py-1 text-xs rounded-lg transition-all font-black ${
                  fontSize === 'xlarge'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 shadow-md ring-2 ring-amber-300 scale-105'
                    : 'text-amber-200/90 hover:text-amber-100 hover:bg-amber-900/60'
                }`}
                title="खूप मोठे अक्षर आकार (Extra Large Font)"
              >
                A++
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
