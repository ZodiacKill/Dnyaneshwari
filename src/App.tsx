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
import { Ovi } from './types';
import { toggleTanpuraDrone, getIsTanpuraPlaying } from './utils/audioUtils';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chapters' | 'search' | 'pasayadan' | 'daily' | 'bookmarks' | 'ai'>('chapters');
  const [selectedChapterNum, setSelectedChapterNum] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isTanpuraPlaying, setIsTanpuraPlaying] = useState<boolean>(false);

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

  // AI Modal
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiContextOvi, setAiContextOvi] = useState<Ovi | null>(null);

  // Save Bookmarks to LocalStorage
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
      setActiveTab(tab);
      if (tab === 'chapters') {
        // preserve or reset chapter selection
      }
    }
  };

  const currentChapter = selectedChapterNum !== null
    ? ALL_CHAPTERS.find(c => c.number === selectedChapterNum)
    : null;

  return (
    <div className="min-h-screen bg-[#faf6ef] text-amber-950 font-sans flex flex-col selection:bg-amber-200 selection:text-amber-950">
      
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
        {activeTab === 'chapters' && (
          selectedChapterNum !== null && currentChapter ? (
            <ChapterDetailView
              chapter={currentChapter}
              onBack={() => setSelectedChapterNum(null)}
              onSelectChapter={(num) => setSelectedChapterNum(num)}
              fontSize={fontSize}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
              onAskAi={handleOpenAiWithOvi}
            />
          ) : (
            <ChapterGrid
              chapters={ALL_CHAPTERS}
              onSelectChapter={(num) => setSelectedChapterNum(num)}
            />
          )
        )}

        {activeTab === 'search' && (
          <SearchModule
            fontSize={fontSize}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onAskAi={handleOpenAiWithOvi}
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

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-200 border-t border-amber-800/80 py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h4 className="font-serif font-bold text-lg text-amber-100 flex items-center justify-center md:justify-start gap-2">
              <span>ॐ</span>
              <span>ज्ञानेश्वरी - भावार्थदीपिका</span>
            </h4>
            <p className="text-xs text-amber-300/80 mt-1">
              संत ज्ञानेश्वर महाराज विरचित मराठी भावार्थदीपिका | Dnyaneshwari Holy Scripture App
            </p>
          </div>

          <div className="text-xs text-amber-300/70 space-y-1">
            <p>"अवघा रंग एक झाला । रंगी रंगला श्रीरंग ॥"</p>
            <p className="text-[11px] text-amber-400/80">
              विश्वशांती व आत्मोद्धारासाठी समर्पित
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
