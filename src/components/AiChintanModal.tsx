import React, { useState, useEffect, useRef } from 'react';
import { Ovi } from '../types';
import { Sparkles, Send, X, Bot, BookOpen, Copy, Check, RefreshCw, MessageSquare, Volume2, VolumeX } from 'lucide-react';

interface AiChintanModalProps {
  initialOvi?: Ovi | null;
  onClose: () => void;
}

export const AiChintanModal: React.FC<AiChintanModalProps> = ({ initialOvi, onClose }) => {
  const [question, setQuestion] = useState('');
  const [selectedOvi, setSelectedOvi] = useState<Ovi | null>(initialOvi || null);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const samplePrompts = [
    "मनावरील ताण आणि चिंता घालवण्यासाठी ज्ञानेश्वरी काय सांगते?",
    "अध्याय ६ अनुसार मनाची एकाग्रता व ध्यान कसे साधावे?",
    "स्थितप्रज्ञाची लक्षणे रोजच्या आयुष्यात कशी आणावीत?",
    "पसायदानाचा विश्वात्मक शांतीचा संदेश काय आहे?",
    "निष्काम कर्मयोगाचे आचरण कसे करावे?"
  ];

  // Auto-generate if opened for a specific Ovi
  useEffect(() => {
    if (initialOvi) {
      handleAskGemini("या ओवीचा सखोल आध्यात्मिक अर्थ, भावार्थ व रोजच्या आयुष्यातील उपयोग स्पष्ट करा.", initialOvi);
    }
  }, [initialOvi]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (speechRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleAskGemini = async (queryText: string, oviContext: Ovi | null) => {
    setLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const response = await fetch('/api/ai-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: queryText,
          mode: oviContext ? 'explain-ovi' : 'general-question',
          verseContext: oviContext ? {
            chapterNumber: oviContext.chapterNumber,
            chapterTitle: `अध्याय ${oviContext.chapterNumber}`,
            oviNumber: oviContext.oviNumber,
            originalMarathi: oviContext.originalMarathi,
            marathiBhavarth: oviContext.marathiBhavarth,
            englishTranslation: oviContext.englishTranslation,
          } : null,
        }),
      });

      // Handle different response formats
      let responseData;
      let contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        // Handle plain text or HTML responses
        responseData = { answer: await response.text() };
      }

      if (!response.ok) {
        throw new Error(responseData.error || 'उत्तर मिळवताना त्रुटी आली.');
      }

      setAnswer(responseData.answer);
    } catch (err: any) {
      console.error("AI Chintan error:", err);
      setError(err.message || 'काहीतरी तांत्रिक अडचण आली. कृपया पुन्हा प्रयत्न करा.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() && !selectedOvi) return;
    handleAskGemini(question || "या ओवीचे सखोल चिंतन सांगा.", selectedOvi);
  };

  const handleCopyAnswer = () => {
    if (answer) {
      navigator.clipboard.writeText(answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTextToSpeech = () => {
    if (!answer) return;

    // Cancel any ongoing speech
    if (speechRef.current) {
      window.speechSynthesis.cancel();
      speechRef.current = null;
      setIsReading(false);
      setIsPaused(false);
      return;
    }

    // Create new speech utterance
    const utterance = new SpeechSynthesisUtterance(answer);
    utterance.lang = 'mr-IN'; // Marathi language
    utterance.rate = 0.8; // Slightly slower for better comprehension
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsReading(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsReading(false);
      setIsPaused(false);
      speechRef.current = null;
    };

    utterance.onerror = () => {
      setIsReading(false);
      setIsPaused(false);
      speechRef.current = null;
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePauseResume = () => {
    if (!speechRef.current) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-amber-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-amber-50 rounded-3xl border border-amber-300 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden my-auto">

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-900 via-amber-950 to-orange-950 text-amber-50 p-5 flex items-center justify-between border-b border-amber-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-amber-950 font-bold shadow-md">
              <Sparkles className="w-5 h-5 text-amber-950" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold">
                ज्ञान-संवाद AI (Dnyaneshwari AI Assistant)
              </h3>
              <p className="text-xs text-amber-300/80">
                संत ज्ञानेश्वर महाराजांच्या विचारांवर आधारित ज्ञानचिंतन
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-amber-800/80 text-amber-200 hover:text-amber-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">

          {/* Context Ovi Banner if selected */}
          {selectedOvi && (
            <div className="bg-amber-100/90 border border-amber-300 rounded-2xl p-4 relative">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  संदर्भ ओवी: अध्याय {selectedOvi.chapterNumber}, ओवी {selectedOvi.oviNumber}
                </span>
                <button
                  onClick={() => setSelectedOvi(null)}
                  className="text-amber-700 hover:text-amber-950 text-xs underline"
                >
                  ओवी काढणे
                </button>
              </div>
              <p className="font-serif font-bold text-amber-950 text-sm sm:text-base my-1">
                {selectedOvi.originalMarathi}
              </p>
              <p className="text-xs text-amber-900/80 italic">
                भावार्थ: {selectedOvi.marathiBhavarth}
              </p>
            </div>
          )}

          {/* Prompt Suggestion Chips */}
          {!answer && !loading && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-amber-900 block">
                काही विचारलेले प्रश्न (Sample Spiritual Queries):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {samplePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuestion(prompt);
                      handleAskGemini(prompt, selectedOvi);
                    }}
                    className="text-xs text-left bg-white text-amber-950 hover:bg-amber-200/80 px-3 py-1.5 rounded-xl border border-amber-300/80 transition-colors shadow-2xs font-medium"
                  >
                    💡 {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question Form Input */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="ज्ञानेश्वरी किंवा अध्यात्माबद्दल तुमचा प्रश्न येथे विचारा (उदा. 'मनावरील ताण कसा घालवावा?')..."
                rows={3}
                className="w-full text-xs sm:text-sm p-3 bg-white text-amber-950 rounded-2xl border-2 border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium resize-none shadow-inner"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-amber-700">
                * Gemini AI द्वारे ज्ञानेश्वरी संदर्भांसह उत्तर दिले जाते.
              </span>

              <button
                type="submit"
                disabled={loading || (!question.trim() && !selectedOvi)}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 text-amber-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-950" />
                    <span>चिंतन करत आहे...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-amber-950" />
                    <span>प्रश्न विचारा</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Loading Indicator */}
          {loading && (
            <div className="bg-amber-100/60 rounded-2xl p-8 text-center border border-amber-200 space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-300/80 text-amber-900 flex items-center justify-center mx-auto animate-bounce">
                <Bot className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-amber-950">
                ज्ञानेश्वरीतील आध्यात्मिक अमृताचा शोध घेतला जात आहे...
              </p>

            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-rose-100 border border-rose-300 text-rose-900 p-4 rounded-2xl text-xs sm:text-sm font-medium">
              ❌ {error}
            </div>
          )}

          {/* AI Response Display */}
          {answer && (
            <div className="bg-white rounded-2xl border border-amber-300/90 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-amber-700" />
                  <span className="font-bold text-amber-950 text-sm">ज्ञानेश्वरी चिंतन उत्तर:</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Text-to-Speech Controls */}
                  <button
                    onClick={handleTextToSpeech}
                    disabled={!answer}
                    className="flex items-center gap-1 text-xs text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isReading ? (
                      <VolumeX className="w-3.5 h-3.5" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                    <span>{isReading ? 'बंद करा' : 'ऐका'}</span>
                  </button>

                  {/* Pause/Resume button */}
                  {isReading && (
                    <button
                      onClick={handlePauseResume}
                      className="flex items-center gap-1 text-xs text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-lg font-semibold transition-colors"
                    >
                      {isPaused ? (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>सुरू करा</span>
                        </>
                      ) : (
                        <>
                          <VolumeX className="w-3.5 h-3.5" />
                          <span>थांबवा</span>
                        </>
                      )}
                    </button>
                  )}

                  {/* Copy button */}
                  <button
                    onClick={handleCopyAnswer}
                    className="flex items-center gap-1 text-xs text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-lg font-semibold transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'कॉपी झाले' : 'कॉपी करा'}</span>
                  </button>
                </div>
              </div>

              {/* Formatted Answer Body */}
              <div className="text-amber-950 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans space-y-2">
                {answer}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
