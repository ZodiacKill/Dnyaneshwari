import React from 'react';
import { BookOpen, Search, Heart, Sparkles, Volume2, VolumeX, Type, Sun, Feather } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-amber-950/95 text-amber-50 backdrop-blur-md border-b border-amber-800/60 shadow-lg">
      {/* Top sacred accent bar */}
      <div className="h-1 bg-gradient-to-r from-amber-600 via-orange-400 to-amber-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('chapters')}>
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-amber-950 font-bold shadow-md border border-amber-300/40 shrink-0">
              <span className="font-serif text-2xl font-black">ॐ</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-amber-100 drop-shadow-sm">
                  मराठी ज्ञानेश्वरी
                </h1>
                <span className="text-xs bg-amber-800/80 text-amber-200 px-2 py-0.5 rounded-full border border-amber-700/60 hidden sm:inline-block">
                  भावार्थ व भाषांतर
                </span>
              </div>
              <p className="text-xs text-amber-300/80 font-sans">
                संत ज्ञानेश्वर महाराज विरचित भावार्थदीपिका | Dnyaneshwari Scriptures
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab('chapters')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'chapters'
                  ? 'bg-amber-800 text-amber-100 shadow-inner border border-amber-600/50'
                  : 'text-amber-200/90 hover:bg-amber-900/60 hover:text-amber-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>अध्याय (१-१८)</span>
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'search'
                  ? 'bg-amber-800 text-amber-100 shadow-inner border border-amber-600/50'
                  : 'text-amber-200/90 hover:bg-amber-900/60 hover:text-amber-100'
              }`}
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span>शोध (Search)</span>
            </button>

            <button
              onClick={() => setActiveTab('pasayadan')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'pasayadan'
                  ? 'bg-amber-800 text-amber-100 shadow-inner border border-amber-600/50'
                  : 'text-amber-200/90 hover:bg-amber-900/60 hover:text-amber-100'
              }`}
            >
              <Feather className="w-4 h-4 text-orange-400" />
              <span>पसायदान</span>
            </button>

            <button
              onClick={() => setActiveTab('daily')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'daily'
                  ? 'bg-amber-800 text-amber-100 shadow-inner border border-amber-600/50'
                  : 'text-amber-200/90 hover:bg-amber-900/60 hover:text-amber-100'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-400" />
              <span>आजची ओवी</span>
            </button>

            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all relative ${
                activeTab === 'bookmarks'
                  ? 'bg-amber-800 text-amber-100 shadow-inner border border-amber-600/50'
                  : 'text-amber-200/90 hover:bg-amber-900/60 hover:text-amber-100'
              }`}
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>जतन</span>
              {bookmarkCount > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {bookmarkCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'ai'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-amber-950 font-bold shadow-md'
                  : 'bg-amber-900/80 text-amber-200 hover:bg-amber-800 border border-amber-700/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>ज्ञान-संवाद AI</span>
            </button>
          </nav>

          {/* Quick Audio & Font Controls */}
          <div className="flex items-center gap-2">
            {/* Tanpura Audio Drone */}
            <button
              onClick={onToggleTanpura}
              title={isTanpuraPlaying ? "तानपुरा ध्वनी बंद करा" : "तानपुरा ध्वनी सुरू करा (Ambient Drone)"}
              className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-all border ${
                isTanpuraPlaying
                  ? 'bg-orange-600 text-amber-950 border-orange-400 font-bold animate-pulse'
                  : 'bg-amber-900/40 text-amber-300 border-amber-800 hover:bg-amber-900/80'
              }`}
            >
              {isTanpuraPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden lg:inline">{isTanpuraPlaying ? 'तानपुरा चालू' : 'तानपुरा'}</span>
            </button>

            {/* Font Size Adjuster */}
            <div className="flex items-center bg-amber-900/60 rounded-lg border border-amber-800/80 p-0.5">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 text-xs rounded ${
                  fontSize === 'normal' ? 'bg-amber-700 text-amber-100 font-bold' : 'text-amber-400 hover:text-amber-200'
                }`}
                title="सामान्य अक्षर"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 text-xs rounded ${
                  fontSize === 'large' ? 'bg-amber-700 text-amber-100 font-bold' : 'text-amber-400 hover:text-amber-200'
                }`}
                title="मोठे अक्षर"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-0.5 text-xs rounded ${
                  fontSize === 'xlarge' ? 'bg-amber-700 text-amber-100 font-bold' : 'text-amber-400 hover:text-amber-200'
                }`}
                title="मोठे देवनागरी अक्षर"
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
