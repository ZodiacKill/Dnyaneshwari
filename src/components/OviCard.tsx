import React, { useState, useEffect, useRef } from 'react';
import { Ovi } from '../types';
import { Volume2, VolumeX, Heart, Share2, Sparkles, Copy, Check, MessageSquare, Loader2, Wand2 } from 'lucide-react';
import { speakMarathiText, stopMarathiSpeech } from '../utils/audioUtils';
import { ShareModal } from './ShareModal';
import { generateOviContent, getCachedContent, hasCuratedContent, OviGeneratedContent } from '../utils/oviContentService';

interface OviCardProps {
  ovi: Ovi;
  chapterTitle?: string;
  isBookmarked: boolean;
  onToggleBookmark: (oviId: string, note?: string) => void;
  onAskAi: (ovi: Ovi) => void;
  highlightText?: string;
}

export const OviCard: React.FC<OviCardProps> = ({
  ovi,
  chapterTitle,
  isBookmarked,
  onToggleBookmark,
  onAskAi,
  highlightText,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [userNote, setUserNote] = useState('');
  const [activeTab, setActiveTab] = useState<'bhavarth' | 'english' | 'insight'>('bhavarth');

  // AI content generation state
  const [aiContent, setAiContent] = useState<OviGeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [hasDatabaseContent, setHasDatabaseContent] = useState(false);
  const [contentSource, setContentSource] = useState<'database' | 'ai' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Determine if this ovi has real curated content
  const isCurated = hasCuratedContent(ovi.marathiBhavarth, ovi.englishTranslation);

  // Check database for existing content on mount
  useEffect(() => {
    const checkDatabaseContent = async () => {
      if (!isCurated) {
        try {
          const response = await fetch(`/api/bhavarth/chapter/${ovi.chapterNumber}/ovi/${ovi.oviNumber}`);
          if (response.ok) {
            const dbContent = await response.json();
            setAiContent({
              marathiBhavarth: dbContent.marathi_bhavarth || "",
              englishTranslation: dbContent.english_translation || "",
              spiritualInsight: dbContent.spiritual_insight || "",
              isGenerated: true,
            });
            setHasDatabaseContent(true);
            setContentSource('database');
            console.log(`Loaded content from database for ovi ${ovi.id}`);
          }
        } catch (error) {
          console.warn("Failed to check database content:", error);
        }
      }
    };

    checkDatabaseContent();
  }, [ovi.chapterNumber, ovi.oviNumber, isCurated]);

  // Load cached content on mount (fallback if no database content)
  useEffect(() => {
    if (!isCurated && !hasDatabaseContent) {
      const cached = getCachedContent(ovi.id);
      if (cached) {
        setAiContent(cached);
      }
    }
  }, [ovi.id, isCurated, hasDatabaseContent]);

  // Effective content: curated > database AI > cached AI > freshly generated AI
  const effectiveBhavarth = isCurated ? ovi.marathiBhavarth : (aiContent?.marathiBhavarth || "");
  const effectiveEnglish = isCurated ? ovi.englishTranslation : (aiContent?.englishTranslation || "");
  const effectiveInsight = isCurated ? ovi.spiritualInsight : (aiContent?.spiritualInsight || "");
  const hasContent = !!(effectiveBhavarth || effectiveEnglish || effectiveInsight);

  const handleGenerateContent = async (retryCount = 0) => {
    if (isGenerating || isCurated) return;

    setIsGenerating(true);
    setGenerateError(null);
    setHasDatabaseContent(false);
    setContentSource(null);

    try {
      // The generateOviContent function now automatically checks database first
      const content = await generateOviContent(
        ovi.id,
        ovi.originalMarathi,
        ovi.chapterNumber,
        ovi.oviNumber
      );
      setAiContent(content);
      setContentSource('ai');
      console.log(`Generated new AI content for ovi ${ovi.id}`);
    } catch (err: any) {
      // Retry on network errors or rate limits
      if (retryCount < 2 && (err.message?.includes('network') || err.message?.includes('rate') || err.message?.includes('timeout'))) {
        console.log(`Retrying content generation for ovi ${ovi.id} (attempt ${retryCount + 1})`);
        setTimeout(() => {
          handleGenerateContent(retryCount + 1);
        }, 2000 * (retryCount + 1)); // Exponential backoff
        return;
      }
      setGenerateError(err.message || "Content generation failed");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSpeech = () => {
    if (isPlayingAudio) {
      stopMarathiSpeech();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      const bhavarth = effectiveBhavarth;
      const textToSpeak = bhavarth
        ? `${ovi.originalMarathi}. भावार्थ: ${bhavarth}`
        : ovi.originalMarathi;
      speakMarathiText(
        textToSpeak,
        () => {
          setIsPlayingAudio(false);
        },
        0.75
      );
    }
  };

  const handleCopy = () => {
    let fullText = `ज्ञानेश्वरी अध्याय ${ovi.chapterNumber}, ओवी ${ovi.oviNumber}\n\n${ovi.originalMarathi}`;
    if (effectiveBhavarth) {
      fullText += `\n\nमराठी भावार्थ:\n${effectiveBhavarth}`;
    }
    if (effectiveEnglish) {
      fullText += `\n\nEnglish Translation:\n${effectiveEnglish}`;
    }
    if (effectiveInsight) {
      fullText += `\n\nगूढ अर्थ व बोध:\n${effectiveInsight}`;
    }
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleSaveBookmark = () => {
    onToggleBookmark(ovi.id, userNote);
    setShowNoteInput(false);
  };

  return (
    <div
      ref={cardRef}
      id={`ovi-${ovi.id}`}
      className="bg-[#FFFDF8] rounded-2xl border border-[#D4C3A1] shadow-xs hover:shadow-md transition-all p-5 sm:p-6 mb-5 relative group overflow-hidden"
    >
      {/* Decorative Golden Left Accent Bar */}
      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-[#78350F] via-amber-600 to-[#451A03] rounded-l-2xl" />

      {/* Header Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/80 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="bg-[#78350F] text-amber-100 font-serif font-bold text-xs sm:text-sm px-3 py-1 rounded-full shadow-xs">
            अध्याय {ovi.chapterNumber} | ओवी {ovi.oviNumber}
          </span>
          {chapterTitle && (
            <span className="text-xs text-amber-900 font-medium truncate max-w-[200px] sm:max-w-xs">
              {chapterTitle}
            </span>
          )}
          
          {aiContent?.isGenerated && (
            <span className="bg-violet-100 text-violet-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-violet-200 flex items-center gap-0.5">
              <Wand2 className="w-2.5 h-2.5" />
              AI
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          {/* Audio Recitation */}
          <button
            onClick={handleSpeech}
            title={isPlayingAudio ? "वाचन थांबवा" : "ओवी ऐका (Read Ovi)"}
            className={`p-2 rounded-xl transition-all ${
              isPlayingAudio
                ? 'bg-amber-600 text-amber-950 font-bold animate-pulse ring-2 ring-amber-400 shadow-md'
                : 'bg-amber-100 text-amber-950 hover:bg-amber-200 border border-amber-300/80'
            }`}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4 text-amber-950" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Bookmark */}
          <button
            onClick={() => setShowNoteInput(!showNoteInput)}
            title={isBookmarked ? "जतन केले आहे" : "ओवी जतन करा"}
            className={`p-2 rounded-xl transition-colors border ${
              isBookmarked
                ? 'bg-rose-100 text-rose-600 border-rose-300'
                : 'bg-amber-100 text-amber-950 border-amber-300/80 hover:bg-amber-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-rose-600 text-rose-600' : ''}`} />
          </button>

          {/* Copy */}
          <button
            onClick={handleCopy}
            title="ओवी कॉपी करा"
            className="p-2 rounded-xl bg-amber-100 text-amber-950 hover:bg-amber-200 border border-amber-300/80 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            title="शेअर करा"
            className="p-2 rounded-xl bg-amber-100 text-amber-950 hover:bg-amber-200 border border-amber-300/80 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Ask AI */}
          <button
            onClick={() => onAskAi(ovi)}
            className="flex items-center gap-1 bg-[#78350F] text-amber-100 font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs hover:bg-[#5B2508] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>चिंतन AI</span>
          </button>
        </div>
      </div>

      {/* Bookmark Note Drawer */}
      {showNoteInput && (
        <div className="bg-amber-100/90 border border-amber-300 rounded-xl p-3 mb-4 transition-all">
          <div className="flex items-center gap-1 text-xs font-bold text-amber-950 mb-1">
            <MessageSquare className="w-3.5 h-3.5 text-amber-800" />
            <span>तुमची वैयक्तिक टीप (Personal Reflection Note):</span>
          </div>
          <input
            type="text"
            value={userNote}
            onChange={(e) => setUserNote(e.target.value)}
            placeholder="उदा. या ओवीने मला मनाची शांती दिली..."
            className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 mb-2"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowNoteInput(false)}
              className="text-xs text-amber-900 hover:underline px-2 py-1 font-medium"
            >
              रद्द
            </button>
            <button
              onClick={handleSaveBookmark}
              className="text-xs bg-[#78350F] text-amber-100 px-3 py-1 rounded-md font-bold hover:bg-[#5B2508]"
            >
              {isBookmarked ? 'टीप अद्यतन करा' : 'जतन करा'}
            </button>
          </div>
        </div>
      )}

      {/* Main Original Marathi Ovi Text */}
      <div className="my-3 text-center sm:text-left px-3 sm:px-4 py-3 rounded-xl border border-amber-200/80 bg-[#FAF4E5] shadow-inner">
        <p className="font-serif font-bold text-amber-950 text-lg sm:text-xl leading-relaxed">
          {ovi.originalMarathi}
        </p>
      </div>

      {/* Content Source Indicator */}
      {contentSource && (
        <div className="mt-2 flex items-center justify-center">
          {contentSource === 'database' && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-800 text-xs font-medium rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>From Database</span>
            </div>
          )}
          {contentSource === 'ai' && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full border border-blue-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>AI Generated</span>
            </div>
          )}
        </div>
      )}

      {/* Database Loading Indicator */}
      {!isCurated && !aiContent && !generateError && !contentSource && (
        <div className="mt-2 flex items-center justify-center">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full border border-gray-200">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
            <span>Checking database...</span>
          </div>
        </div>
      )}

      {/* Content Loading State */}
      {isGenerating && (
        <div className="mt-3 flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-200 animate-pulse">
          <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
          <span className="text-sm text-emerald-700 font-medium">
            भावार्थ तयार होत आहे... (Generating bhavarth with AI...)
          </span>
        </div>
      )}

      {/* Generation Error */}
      {generateError && !isGenerating && (
        <div className="mt-3 flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-200">
          <span className="text-sm text-red-700">{generateError}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleGenerateContent();
            }}
            className="text-xs bg-emerald-600 text-white px-3 py-1 rounded-lg font-bold hover:bg-emerald-700 flex items-center gap-1"
          >
            <Wand2 className="w-3 h-3" />
            पुन्हा प्रयत्न करा
          </button>
        </div>
      )}

      {/* Marathi Bhavarth - always shown if available */}
      {effectiveBhavarth && (
        <div className="mt-3 pt-3 border-t border-amber-200/80">
          <p className="text-amber-950 font-sans text-sm sm:text-base leading-relaxed">
            <strong className="text-amber-900 font-serif">भावार्थ: </strong>
            {effectiveBhavarth}
          </p>
        </div>
      )}

      {/* English & Bodh Tabs - shown if available */}
      {(effectiveEnglish || effectiveInsight) && (
        <div className="mt-3">
          <div className="flex items-center border-b border-amber-200/80 mb-2 gap-2">
            {effectiveBhavarth && (
              <button
                onClick={() => setActiveTab('bhavarth')}
                className={`pb-1.5 px-3 text-xs font-semibold border-b-2 transition-all ${
                  activeTab === 'bhavarth'
                    ? 'border-[#78350F] text-amber-950 font-bold'
                    : 'border-transparent text-amber-800 hover:text-amber-950'
                }`}
              >
                मराठी भावार्थ
              </button>
            )}
            {effectiveEnglish && (
              <button
                onClick={() => setActiveTab('english')}
                className={`pb-1.5 px-3 text-xs font-semibold border-b-2 transition-all ${
                  activeTab === 'english'
                    ? 'border-[#78350F] text-amber-950 font-bold'
                    : 'border-transparent text-amber-800 hover:text-amber-950'
                }`}
              >
                English Translation
              </button>
            )}
            {effectiveInsight && (
              <button
                onClick={() => setActiveTab('insight')}
                className={`pb-1.5 px-3 text-xs font-semibold border-b-2 transition-all ${
                  activeTab === 'insight'
                    ? 'border-[#78350F] text-amber-950 font-bold'
                    : 'border-transparent text-amber-800 hover:text-amber-950'
                }`}
              >
                गूढ अर्थ व बोध
              </button>
            )}
          </div>

          <div className="pt-1">
            {activeTab === 'english' && effectiveEnglish && (
              <p className="text-amber-950 font-sans italic text-sm leading-relaxed">
                <strong className="text-amber-950 not-italic font-semibold">English Meaning: </strong>
                "{effectiveEnglish}"
              </p>
            )}

            {activeTab === 'insight' && effectiveInsight && (
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                <p className="text-amber-950 font-sans text-sm leading-relaxed">
                  <strong className="text-amber-950 font-serif">आध्यात्मिक बोध: </strong>
                  {effectiveInsight}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Generate Bhavarth Button - shown if no content and not loading */}
      {!hasContent && !isGenerating && !generateError && (
        <div className="mt-3 flex justify-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleGenerateContent();
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-xl font-bold text-sm hover:from-emerald-700 hover:to-teal-700 shadow-md transition-all"
          >
            <Wand2 className="w-4 h-4" />
            भावार्थ तयार करा (Generate Bhavarth)
          </button>
        </div>
      )}

      {/* Topic Tags */}
      {ovi.tags && ovi.tags.length > 0 && (
        <div className="mt-4 pt-3 border-t border-amber-200/80 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-amber-800 font-medium">विषय:</span>
          {ovi.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] bg-amber-100 text-amber-950 px-2.5 py-0.5 rounded-full border border-amber-300 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          ovi={ovi}
          chapterTitle={chapterTitle}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};
