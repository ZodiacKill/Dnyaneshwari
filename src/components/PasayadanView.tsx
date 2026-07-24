import React, { useState } from 'react';
import { PASAYADAN_VERSES } from '../data/dnyaneshwariData';
import { Volume2, VolumeX, Sparkles, Feather, Heart, Copy, Check } from 'lucide-react';
import { speakMarathiText, stopMarathiSpeech } from '../utils/audioUtils';
import { Ovi } from '../types';

interface PasayadanViewProps {
  fontSize: 'normal' | 'large' | 'xlarge';
  onAskAi: (ovi: Ovi) => void;
  bookmarks: string[];
  onToggleBookmark: (oviId: string, note?: string) => void;
}

export const PasayadanView: React.FC<PasayadanViewProps> = ({
  fontSize,
  onAskAi,
  bookmarks,
  onToggleBookmark,
}) => {
  const [isPlayingFullPasayadan, setIsPlayingFullPasayadan] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const textSizes = {
    normal: { ovi: 'text-lg sm:text-xl', bhavarth: 'text-sm' },
    large: { ovi: 'text-xl sm:text-2xl', bhavarth: 'text-base' },
    xlarge: { ovi: 'text-2xl sm:text-3xl', bhavarth: 'text-lg' },
  };

  const currentSize = textSizes[fontSize];

  const handlePlayFullPasayadan = () => {
    if (isPlayingFullPasayadan) {
      stopMarathiSpeech();
      setIsPlayingFullPasayadan(false);
    } else {
      setIsPlayingFullPasayadan(true);
      const fullPasayadanText = PASAYADAN_VERSES.map(v => `${v.originalMarathi}. ${v.marathiBhavarth}`).join(' . ');
      speakMarathiText(fullPasayadanText, () => {
        setIsPlayingFullPasayadan(false);
      });
    }
  };

  const handleCopyFull = () => {
    const text = PASAYADAN_VERSES.map(v => `${v.originalMarathi}\nभावार्थ: ${v.marathiBhavarth}\n`).join('\n---\n');
    navigator.clipboard.writeText(`संत ज्ञानेश्वर महाराज - पसायदान (Pasayadan):\n\n${text}`);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Sacred Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-amber-950 text-amber-50 rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-800/80 text-center relative overflow-hidden">
        {/* Background Mandala / Feather Accent */}
        <div className="absolute top-2 right-2 opacity-10 pointer-events-none">
          <Feather className="w-48 h-48 text-amber-200" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-800/80 border border-amber-600/60 text-amber-200 px-3.5 py-1 rounded-full text-xs font-bold shadow-inner">
            <Feather className="w-3.5 h-3.5 text-orange-400" />
            <span>सार्वभौम शांतीची विश्वात्मक प्रार्थना</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-black tracking-tight text-amber-100">
            पसायदान (Pasayadan)
          </h2>

          <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-sans">
            "आतां विश्वात्मकें देवें । येणे वाग्यज्ञें तोषावें..." ज्ञानेश्वरीच्या १८ व्या अध्यायाच्या शेवटी संत ज्ञानेश्वर महाराजांनी संपूर्ण जगाच्या कल्याणासाठी, दुष्टांच्या बुद्धीपालटासाठी व सर्व प्राण्यांच्या विश्वात्मक कल्याणासाठी मागितलेला अलौकिक वरप्रसाद.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePlayFullPasayadan}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all ${
                isPlayingFullPasayadan
                  ? 'bg-orange-500 text-amber-950 animate-pulse'
                  : 'bg-amber-100 text-amber-950 hover:bg-amber-200'
              }`}
            >
              {isPlayingFullPasayadan ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isPlayingFullPasayadan ? 'पसायदान थांबवा' : 'संपूर्ण पसायदान ऐका (Recite)'}</span>
            </button>

            <button
              onClick={handleCopyFull}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-amber-800/80 text-amber-100 border border-amber-600/60 hover:bg-amber-800 transition-all"
            >
              {copiedAll ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedAll ? 'कॉपी झाले!' : 'संपूर्ण पसायदान कॉपी करा'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Verses Breakdown */}
      <div className="space-y-5">
        {PASAYADAN_VERSES.map((ovi, idx) => (
          <div
            key={ovi.id}
            className="bg-amber-50/90 rounded-2xl border border-amber-200/90 p-5 sm:p-6 shadow-xs relative overflow-hidden"
          >
            {/* Ovi Number Badge */}
            <div className="flex items-center justify-between mb-3 border-b border-amber-200/60 pb-2">
              <span className="bg-amber-800 text-amber-100 text-xs font-serif font-bold px-3 py-1 rounded-full">
                पसायदान श्लोक {idx + 1} / {PASAYADAN_VERSES.length} (ओवी {ovi.oviNumber})
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onAskAi(ovi)}
                  className="flex items-center gap-1 bg-gradient-to-r from-amber-600 to-orange-600 text-amber-950 font-bold text-xs px-2.5 py-1 rounded-lg shadow-xs hover:brightness-110"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>गूढ अर्थ AI</span>
                </button>
              </div>
            </div>

            {/* Original Marathi Ovi Text */}
            <div className="bg-amber-100/70 p-4 rounded-xl border border-amber-200 text-center sm:text-left mb-3">
              <p className={`font-serif font-bold text-amber-950 leading-relaxed ${currentSize.ovi}`}>
                {ovi.originalMarathi}
              </p>
            </div>

            {/* Marathi Bhavarth & English Translation */}
            <div className="space-y-2 text-amber-900/90 text-xs sm:text-sm leading-relaxed font-sans">
              <p>
                <strong className="text-amber-950 font-semibold">मराठी भावार्थ: </strong>
                {ovi.marathiBhavarth}
              </p>
              <p className="italic text-amber-800/90 border-t border-amber-200/60 pt-2">
                <strong className="not-italic font-semibold text-amber-950">English Meaning: </strong>
                "{ovi.englishTranslation}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
