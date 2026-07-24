import React from 'react';

interface LoadingScreenProps {
  message?: string;
  subMessage?: string;
  isFullPage?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "ज्ञानेश्वरी भावार्थदीपिका लोड होत आहे...",
  subMessage = "ॐ नमो जी आद्या । वेदप्रतिपाद्या । जय जय स्वसंवेद्या । आत्मरूपा ॥",
  isFullPage = false,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center transition-all animate-fadeIn ${
        isFullPage
          ? 'fixed inset-0 z-50 bg-[#FDF6E3] text-amber-950'
          : 'py-16 my-6 bg-[#FFFDF8] rounded-3xl border border-[#D4C3A1] shadow-sm'
      }`}
    >
      {/* Sacred Glowing Om & Spinning Lotus Ring */}
      <div className="relative mb-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 flex items-center justify-center text-amber-100 shadow-xl border-2 border-amber-400/80 animate-pulse">
          <span className="font-serif text-4xl sm:text-5xl font-black drop-shadow-md select-none">
            ॐ
          </span>
        </div>

        {/* Orbiting Golden Ring */}
        <div className="absolute inset-0 -m-2 rounded-full border-2 border-dashed border-amber-600/60 animate-spin" style={{ animationDuration: '8s' }} />
      </div>

      {/* Primary Loading Title */}
      <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-950 mb-2">
        {message}
      </h3>

      {/* Sacred Quote / Subtext */}
      <p className="font-serif italic text-xs sm:text-sm text-amber-800/90 max-w-md mx-auto leading-relaxed mb-4">
        "{subMessage}"
      </p>

      {/* Progress Bar Loader */}
      <div className="w-48 sm:w-64 h-1.5 bg-amber-200/80 rounded-full overflow-hidden border border-amber-300">
        <div className="h-full bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 rounded-full animate-pulse w-full" />
      </div>

      <span className="text-[11px] text-amber-700/80 font-medium mt-3">
        संत ज्ञानेश्वर महाराज विरचित भावार्थदीपिका
      </span>
    </div>
  );
};
