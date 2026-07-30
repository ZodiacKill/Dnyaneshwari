// Browser Text-to-Speech for Marathi
let activeUtterance: SpeechSynthesisUtterance | null = null;

export function speakMarathiText(text: string, onEnd?: () => void, rate: number = 0.75) {
  if (!('speechSynthesis' in window)) {
    console.warn("Speech Synthesis is not supported in this browser environment.");
    if (onEnd) onEnd();
    return;
  }

  try {
    // Unpause if speech synthesis is paused
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    window.speechSynthesis.cancel(); // Stop any active speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "mr-IN"; // Marathi
    utterance.rate = rate; // Fixed 0.75x rate
    utterance.pitch = 1.0;

    const assignVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return;
      const marathiVoice = voices.find(v => v.lang.includes("mr") || v.lang.startsWith("mr"));
      const hindiVoice = voices.find(v => v.lang.includes("hi") || v.lang.startsWith("hi"));
      const indianVoice = voices.find(v => v.lang.includes("IN"));
      if (marathiVoice) {
        utterance.voice = marathiVoice;
      } else if (hindiVoice) {
        utterance.voice = hindiVoice;
      } else if (indianVoice) {
        utterance.voice = indianVoice;
      }
    };

    assignVoice();
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        assignVoice();
      };
    }

    let finished = false;
    const handleFinished = () => {
      if (!finished) {
        finished = true;
        activeUtterance = null;
        if (onEnd) onEnd();
      }
    };

    utterance.onend = handleFinished;
    utterance.onerror = (e) => {
      console.warn("Speech synthesis ended or was interrupted:", e);
      handleFinished();
    };

    activeUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error("Error executing speakMarathiText:", err);
    if (onEnd) onEnd();
  }
}

export function stopMarathiSpeech() {
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (error) {
      console.warn("Error stopping Marathi speech:", error);
    }
  }
  activeUtterance = null;
}

// Web Audio API Tanpura Drone Synthesizer
let audioCtx: AudioContext | null = null;
let tanpuraOscillators: OscillatorNode[] = [];
let tanpuraGainNode: GainNode | null = null;
let isTanpuraPlaying = false;

export function toggleTanpuraDrone(play?: boolean): boolean {
  if (typeof play === 'boolean') {
    if (play && !isTanpuraPlaying) {
      startTanpura();
    } else if (!play && isTanpuraPlaying) {
      stopTanpura();
    }
    return isTanpuraPlaying;
  }

  if (isTanpuraPlaying) {
    stopTanpura();
  } else {
    startTanpura();
  }
  return isTanpuraPlaying;
}

function startTanpura() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Base pitch C#3 (approx 138.59 Hz) - Traditional meditative drone
    const baseFreq = 138.59;
    // Pa (Fifth): 207.89 Hz, Sa1: 277.18 Hz, Sa2: 138.59 Hz
    const freqs = [baseFreq * 1.5, baseFreq * 2, baseFreq * 2, baseFreq];

    tanpuraGainNode = audioCtx.createGain();
    tanpuraGainNode.gain.setValueAtTime(0.08, audioCtx.currentTime); // Gentle soothing volume
    tanpuraGainNode.connect(audioCtx.destination);

    tanpuraOscillators = freqs.map((f, idx) => {
      const osc = audioCtx!.createOscillator();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, audioCtx!.currentTime);

      // Add subtle warm vibrato / detune for string shimmer
      const lfo = audioCtx!.createOscillator();
      lfo.frequency.value = 0.2 + idx * 0.1; // slow modulation
      const lfoGain = audioCtx!.createGain();
      lfoGain.gain.value = 1.5;
      lfo.connect(osc.frequency);
      lfo.start();

      osc.connect(tanpuraGainNode!);
      osc.start();
      return osc;
    });

    isTanpuraPlaying = true;
  } catch (err) {
    console.error("Error starting tanpura drone:", err);
  }
}

function stopTanpura() {
  tanpuraOscillators.forEach(osc => {
    try {
      osc.stop();
      osc.disconnect();
    } catch (error) {
      console.warn("Error stopping tanpura oscillator:", error);
    }
  });
  tanpuraOscillators = [];
  if (tanpuraGainNode) {
    try {
      tanpuraGainNode.disconnect();
    } catch (error) {
      console.warn("Error disconnecting tanpura gain node:", error);
    }
  }
  isTanpuraPlaying = false;
}

export function getIsTanpuraPlaying(): boolean {
  return isTanpuraPlaying;
}
