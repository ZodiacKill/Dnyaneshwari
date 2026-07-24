import React, { useState, useEffect, useRef } from 'react';
import { Ovi } from '../types';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  ChevronLeft,
  ChevronRight,
  Music,
  Radio,
  Sparkles,
  FastForward,
  Rewind
} from 'lucide-react';
import { speakMarathiText, stopMarathiSpeech } from '../utils/audioUtils';

interface SimpleAudioPlayerProps {
  ovi: Ovi;
  chapterTitle?: string;
  onClose?: () => void;
  onNextOvi?: () => void;
  onPrevOvi?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export const SimpleAudioPlayer: React.FC<SimpleAudioPlayerProps> = ({
  ovi,
  chapterTitle,
  onClose,
  onNextOvi,
  onPrevOvi,
  hasNext = false,
  hasPrev = false,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [speechProgress, setSpeechProgress] = useState(0);
  const [showFullOviText, setShowFullOviText] = useState(false);

  const isAudioFileAvailable = Boolean(ovi.audioUrl && ovi.audioUrl.trim().length > 0);

  // Handle switching Ovi - reset state and autoplay
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setSpeechProgress(0);

    // Stop any existing Speech
    stopMarathiSpeech();

    if (isAudioFileAvailable && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.playbackRate = playbackSpeed;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      // Auto-start Marathi speech synthesis recitation if no audioUrl
      handlePlaySpeech();
    }

    return () => {
      stopMarathiSpeech();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [ovi.id]);

  // Audio element event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (onNextOvi && hasNext) {
        onNextOvi();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onNextOvi, hasNext]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (isAudioFileAvailable && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    } else {
      // Speech fallback mode
      if (isPlaying) {
        stopMarathiSpeech();
        setIsPlaying(false);
      } else {
        handlePlaySpeech();
      }
    }
  };

  const handlePlaySpeech = () => {
    setIsPlaying(true);
    speakMarathiText(`${ovi.originalMarathi}. भावार्थ: ${ovi.marathiBhavarth}`, () => {
      setIsPlaying(false);
      setSpeechProgress(100);
    });
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current && isAudioFileAvailable) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    setIsMuted(v === 0);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.85;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const skipSeconds = (secs: number) => {
    if (audioRef.current && isAudioFileAvailable) {
      audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + secs));
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-r from-[#2D241E] via-[#451A03] to-[#2D241E] text-amber-50 rounded-2xl border-2 border-amber-600/80 p-4 sm:p-5 shadow-2xl relative overflow-hidden transition-all animate-fadeIn">
      {/* Background audio file element if audioUrl exists */}
      {isAudioFileAvailable && (
        <audio
          ref={audioRef}
          src={ovi.audioUrl}
          preload="metadata"
        />
      )}

      {/* Decorative Sound Wave Graphic Accent */}
      <div className="absolute top-0 right-0 -mt-6 -mr-6 opacity-10 pointer-events-none select-none text-amber-400 font-serif text-9xl">
        ॐ
      </div>

      {/* Top Header info row */}
      <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-amber-800/80">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-amber-950 font-bold shrink-0 shadow-md">
            {isPlaying ? (
              <Radio className="w-4 h-4 animate-pulse text-amber-950" />
            ) : (
              <Music className="w-4 h-4 text-amber-950" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="bg-amber-800/80 text-amber-200 text-[11px] font-serif font-bold px-2.5 py-0.5 rounded-md border border-amber-700">
                अध्याय {ovi.chapterNumber} | ओवी {ovi.oviNumber}
              </span>
              <span className="text-[10px] text-amber-300/80 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-900 font-medium hidden sm:inline">
                {isAudioFileAvailable ? 'ध्वनी मुद्रित ध्वनीफित (Audio Recitation)' : 'वाचन स्वर (Speech Recitation)'}
              </span>
            </div>
            {chapterTitle && (
              <p className="text-xs text-amber-200/90 font-medium truncate mt-0.5">
                {chapterTitle}
              </p>
            )}
          </div>
        </div>

        {/* Right close player button */}
        {onClose && (
          <button
            onClick={() => {
              stopMarathiSpeech();
              if (audioRef.current) audioRef.current.pause();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-amber-900/60 hover:bg-amber-800 text-amber-300 hover:text-amber-100 transition-colors"
            title="ऑडिओ प्लेयर बंद करा"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Ovi Text Snippet / Toggle view */}
      <div className="bg-amber-950/70 p-3 rounded-xl border border-amber-900/80 mb-3.5">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] text-amber-400 font-bold font-serif flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>ओवी गायन / वाचन:</span>
          </span>
          <button
            onClick={() => setShowFullOviText(!showFullOviText)}
            className="text-[10px] text-amber-300 hover:underline font-medium"
          >
            {showFullOviText ? 'संक्षिप्त करा' : 'पूर्ण ओवी पहा'}
          </button>
        </div>

        <p className={`font-serif font-bold text-amber-100 leading-relaxed text-sm sm:text-base ${showFullOviText ? '' : 'line-clamp-2'}`}>
          {ovi.originalMarathi}
        </p>

        {showFullOviText && (
          <p className="text-xs text-amber-200/90 font-sans mt-2 pt-2 border-t border-amber-900/80 italic">
            भावार्थ: {ovi.marathiBhavarth}
          </p>
        )}
      </div>

      {/* Audio Timeline & Scrubber Bar */}
      {isAudioFileAvailable ? (
        <div className="space-y-1 mb-3">
          <div className="flex items-center justify-between text-[11px] text-amber-300 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span className="text-amber-400 font-sans font-bold text-[10px]">
              {isPlaying ? 'ध्वनी मुद्रण सुरू...' : 'विराम (Paused)'}
            </span>
            <span>{formatTime(duration)}</span>
          </div>

          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-amber-950 rounded-lg appearance-none cursor-pointer accent-amber-400 border border-amber-800"
          />
        </div>
      ) : (
        /* Speech progress indicator fallback */
        <div className="mb-3 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-amber-300 font-sans">
            <span className="text-amber-300 font-medium">मराठी स्वर वाचन</span>
            <span className="text-amber-400 font-bold">
              {isPlaying ? 'वाचन सुरू आहे...' : 'सुरू करण्यासाठी प्ले दाबा'}
            </span>
          </div>

          <div className="w-full h-1.5 bg-amber-950 rounded-full overflow-hidden border border-amber-800">
            <div
              className={`h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300 ${
                isPlaying ? 'animate-pulse w-full' : 'w-0'
              }`}
            />
          </div>
        </div>
      )}

      {/* Primary Player Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        
        {/* Left: Previous / Fast Rewind */}
        <div className="flex items-center gap-1.5">
          <button
            disabled={!hasPrev}
            onClick={onPrevOvi}
            className="p-2 rounded-xl bg-amber-900/60 hover:bg-amber-800 text-amber-200 disabled:opacity-30 disabled:cursor-not-allowed border border-amber-700/60 transition-colors"
            title="मागील ओवी"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {isAudioFileAvailable && (
            <button
              onClick={() => skipSeconds(-5)}
              className="p-2 rounded-xl bg-amber-900/60 hover:bg-amber-800 text-amber-200 border border-amber-700/60 transition-colors"
              title="-५ सेकंद मागे"
            >
              <Rewind className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Center: Main Play / Pause Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-amber-950 shadow-xl transition-all transform hover:scale-105 active:scale-95 border-2 ${
              isPlaying
                ? 'bg-amber-400 border-amber-200 ring-4 ring-amber-500/30'
                : 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 border-amber-300'
            }`}
            title={isPlaying ? "विराम (Pause)" : "ऐका (Play)"}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-amber-950 text-amber-950" />
            ) : (
              <Play className="w-6 h-6 fill-amber-950 text-amber-950 ml-0.5" />
            )}
          </button>
        </div>

        {/* Right: Fast Forward / Next */}
        <div className="flex items-center gap-1.5">
          {isAudioFileAvailable && (
            <button
              onClick={() => skipSeconds(5)}
              className="p-2 rounded-xl bg-amber-900/60 hover:bg-amber-800 text-amber-200 border border-amber-700/60 transition-colors"
              title="+५ सेकंद पुढे"
            >
              <FastForward className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            disabled={!hasNext}
            onClick={onNextOvi}
            className="p-2 rounded-xl bg-amber-900/60 hover:bg-amber-800 text-amber-200 disabled:opacity-30 disabled:cursor-not-allowed border border-amber-700/60 transition-colors"
            title="पुढील ओवी"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Secondary Bar: Speed & Volume */}
        <div className="w-full flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-amber-900/60 text-xs">
          
          {/* Speed Controls */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-amber-300/80 font-medium">गती:</span>
            {[0.75, 1.0, 1.25, 1.5].map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                className={`px-2 py-0.5 text-[10px] rounded font-mono transition-colors ${
                  playbackSpeed === speed
                    ? 'bg-amber-500 text-amber-950 font-bold'
                    : 'bg-amber-950 text-amber-300 hover:bg-amber-900'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-1 text-amber-300 hover:text-amber-100 transition-colors"
              title={isMuted ? "अनम्यूट करा" : "म्यूट करा"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-amber-950 rounded appearance-none cursor-pointer accent-amber-400"
            />
          </div>

        </div>

      </div>
    </div>
  );
};
