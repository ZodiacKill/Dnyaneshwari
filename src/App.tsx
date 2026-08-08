import React, { useState, useEffect } from 'react';
import { ALL_CHAPTERS } from './data/dnyaneshwariData';
import { Header } from './components/Header';
import { ChapterGrid } from './components/ChapterGrid';
import { ChapterDetailView } from './components/ChapterDetailView';
import { PasayadanView } from './components/PasayadanView';
import { SearchModule } from './components/SearchModule';
import { AiChintanModal } from './components/AiChintanModal';
import { LoadingScreen } from './components/LoadingScreen';
import { Ovi } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chapters' | 'search' | 'pasayadan' | 'ai'>('chapters');
  const [selectedChapterNum, setSelectedChapterNum] = useState<number | null>(null);
  const [isInitialAppLoading, setIsInitialAppLoading] = useState<boolean>(true);
  const [isTabLoading, setIsTabLoading] = useState<boolean>(false);


  // AI Modal State
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiContextOvi, setAiContextOvi] = useState<Ovi | null>(null);

  // Initial Boot Loading Timer & Deep Link Parsing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialAppLoading(false);

      // Parse share link parameters: ?ch=X&ovi=Y
      try {
        const params = new URLSearchParams(window.location.search);
        const chParam = params.get('ch');
        const oviParam = params.get('ovi');

        if (chParam) {
          const chNum = parseInt(chParam, 10);
          if (!isNaN(chNum) && chNum >= 1 && chNum <= 18) {
            setSelectedChapterNum(chNum);
            setActiveTab('chapters');

            if (oviParam) {
              setTimeout(() => {
                const targetId = oviParam.includes('.') ? `ovi-${oviParam}` : `ovi-${chNum}.${oviParam}`;
                const el = document.getElementById(targetId);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  el.classList.add('ring-4', 'ring-amber-500', 'ring-offset-2');
                  setTimeout(() => {
                    el.classList.remove('ring-4', 'ring-amber-500', 'ring-offset-2');
                  }, 3500);
                }
              }, 400);
            }
          }
        }
      } catch (e) {
        console.warn("Could not parse share URL:", e);
      }
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


  const handleOpenAiWithOvi = (ovi: Ovi) => {
    setAiContextOvi(ovi);
    setAiModalOpen(true);
  };

  const handleNavTabChange = (tab: 'chapters' | 'search' | 'pasayadan' | 'ai') => {
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
                onAskAi={handleOpenAiWithOvi}
                onSelectChapter={handleSelectChapter}
              />
            )}

            {activeTab === 'pasayadan' && (
              <PasayadanView
                onAskAi={handleOpenAiWithOvi}
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
    </div>
  );
}
