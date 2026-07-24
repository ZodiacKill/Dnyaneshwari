import React, { useState, useEffect } from 'react';
import { ALL_CHAPTERS } from './data/dnyaneshwariData';
import { Header } from './components/Header';
import { ChapterGrid } from './components/ChapterGrid';
import { ChapterDetailView } from './components/ChapterDetailView';
import { PasayadanView } from './components/PasayadanView';
import { SearchModule } from './components/SearchModule';
import { DailyOvi } from './components/DailyOvi';
import { BookmarksView } from './components/BookmarksView';
import { AiChintanModal } from './components/AiChintanModal';
import { LoadingScreen } from './components/LoadingScreen';
import { StatusBar } from './components/StatusBar';
import { Ovi } from './types';
import { toggleTanpuraDrone } from './utils/audioUtils';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chapters' | 'search' | 'pasayadan' | 'daily' | 'bookmarks' | 'ai'>('chapters');
  const [selectedChapterNum, setSelectedChapterNum] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isTanpuraPlaying, setIsTanpuraPlaying] = useState<boolean>(false);
  const [isInitialAppLoading, setIsInitialAppLoading] = useState<boolean>(true);
  const [isTabLoading, setIsTabLoading] = useState<boolean>(false);

  // Bookmarks & User Notes state stored in localStorage
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dnyaneshwari_bookmarks');
      return saved ? JSON.parse(saved) : ["18.1790", "2.11", "12.145"];
    } catch {
      return ["18.1790", "2.11", "12.145"];
    }
  });

  const [userNotes, setUserNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('dnyaneshwari_user_notes');
      return saved ? JSON.parse(saved) : { "18.1790": "विश्वशांतीची महान प्रार्थना" };
    } catch {
      return { "18.1790": "विश्वशांतीची महान प्रार्थना" };
    }
  });

  // AI Modal State
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiContextOvi, setAiContextOvi] = useState<Ovi | null>(null);

  // Initial Boot Loading Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialAppLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard shortcut Alt+S for Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        setActiveTab('search');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save Bookmarks & Notes to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('dnyaneshwari_bookmarks', JSON.stringify(bookmarks));
    } catch {}
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem('dnyaneshwari_user_notes', JSON.stringify(userNotes));
    } catch {}
  }, [userNotes]);

  const handleToggleBookmark = (oviId: string, note?: string) => {
    if (bookmarks.includes(oviId)) {
      setBookmarks(prev => prev.filter(id => id !== oviId));
      if (note !== undefined) {
        const copy = { ...userNotes };
        delete copy[oviId];
        setUserNotes(copy);
      }
    } else {
      setBookmarks(prev => [...prev, oviId]);
      if (note) {
        setUserNotes(prev => ({ ...prev, [oviId]: note }));
      }
    }
  };

  const handleClearAllBookmarks = () => {
    if (window.confirm("तुम्हाला खरोखरच सर्व जतन केलेल्या ओव्या काढायच्या आहेत का?")) {
      setBookmarks([]);
      setUserNotes({});
    }
  };

  const handleToggleTanpura = () => {
    const newState = toggleTanpuraDrone();
    setIsTanpuraPlaying(newState);
  };

  const handleOpenAiWithOvi = (ovi: Ovi) => {
    setAiContextOvi(ovi);
    setAiModalOpen(true);
  };

  const handleNavTabChange = (tab: 'chapters' | 'search' | 'pasayadan' | 'daily' | 'bookmarks' | 'ai') => {
    if (tab === 'ai') {
      setAiContextOvi(null);
      setAiModalOpen(true);
    } else {
      setIsTabLoading(true);
      setActiveTab(tab);
      setTimeout(() => {
        setIsTabLoading(false);
      }, 200);
    }
  };

  const handleSelectChapter = (num: number) => {
    setSelectedChapterNum(num);
    setActiveTab('chapters');
  };

  const currentChapter = selectedChapterNum !== null
    ? ALL_CHAPTERS.find(c => c.number === selectedChapterNum)
    : null;

  if (isInitialAppLoading) {
    return (
      <LoadingScreen
        isFullPage
        message="ज्ञानेश्वरी भावार्थदीपिका ग्रंथात आपले स्वागत आहे..."
        subMessage="ॐ नमो जी आद्या । वेदप्रतिपाद्या । जय जय स्वसंवेद्या । आत्मरूपा ॥"
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF6E3] text-[#2D241E] font-sans flex flex-col selection:bg-amber-200 selection:text-amber-950">
      
      {/* Top Main Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavTabChange}
        isTanpuraPlaying={isTanpuraPlaying}
        onToggleTanpura={handleToggleTanpura}
        fontSize={fontSize}
        setFontSize={setFontSize}
        bookmarkCount={bookmarks.length}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {isTabLoading ? (
          <LoadingScreen
            message="ज्ञानेश्वरी श्लोक व भावार्थ लोड होत आहे..."
          />
        ) : (
          <>
            {activeTab === 'chapters' && (
              selectedChapterNum !== null && currentChapter ? (
                <ChapterDetailView
                  chapter={currentChapter}
                  onBack={() => setSelectedChapterNum(null)}
                  onSelectChapter={handleSelectChapter}
                  fontSize={fontSize}
                  bookmarks={bookmarks}
                  onToggleBookmark={handleToggleBookmark}
                  onAskAi={handleOpenAiWithOvi}
                />
              ) : (
                <ChapterGrid
                  chapters={ALL_CHAPTERS}
                  onSelectChapter={handleSelectChapter}
                />
              )
            )}

            {activeTab === 'search' && (
              <SearchModule
                fontSize={fontSize}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                onAskAi={handleOpenAiWithOvi}
                onSelectChapter={handleSelectChapter}
              />
            )}

            {activeTab === 'pasayadan' && (
              <PasayadanView
                fontSize={fontSize}
                onAskAi={handleOpenAiWithOvi}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
              />
            )}

            {activeTab === 'daily' && (
              <DailyOvi
                fontSize={fontSize}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                onAskAi={handleOpenAiWithOvi}
              />
            )}

            {activeTab === 'bookmarks' && (
              <BookmarksView
                fontSize={fontSize}
                bookmarks={bookmarks}
                userNotes={userNotes}
                onToggleBookmark={handleToggleBookmark}
                onAskAi={handleOpenAiWithOvi}
                onClearAllBookmarks={handleClearAllBookmarks}
              />
            )}
          </>
        )}
      </main>

      {/* AI Spiritual Assistant Modal */}
      {aiModalOpen && (
        <AiChintanModal
          initialOvi={aiContextOvi}
          onClose={() => {
            setAiModalOpen(false);
            setAiContextOvi(null);
          }}
        />
      )}

      {/* Bottom High-Density Status Bar */}
      <StatusBar
        isTanpuraPlaying={isTanpuraPlaying}
        onToggleTanpura={handleToggleTanpura}
        onOpenSearch={() => handleNavTabChange('search')}
        onOpenAi={() => handleNavTabChange('ai')}
      />
    </div>
  );
}
