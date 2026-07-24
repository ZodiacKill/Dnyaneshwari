// Browser Text-to-Speech for Marathi
export function speakMarathiText(text: string, onEnd?: () => void) {
  if (!('speechSynthesis' in window)) {
    alert("Speech Synthesis is not supported in your browser.");
    return;
  }

  window.speechSynthesis.cancel(); // Stop any active speech

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "mr-IN"; // Marathi
  utterance.rate = 0.85; // Calmer reading pace
  utterance.pitch = 1.0;

  // Fallback to Hindi or default if Marathi voice isn't explicitly found
  const voices = window.speechSynthesis.getVoices();
  const marathiVoice = voices.find(v => v.lang.includes("mr") || v.lang.includes("hi"));
  if (marathiVoice) {
    utterance.voice = marathiVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopMarathiSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
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
    } catch {}
  });
  tanpuraOscillators = [];
  if (tanpuraGainNode) {
    try {
      tanpuraGainNode.disconnect();
    } catch {}
  }
  isTanpuraPlaying = false;
}

export function getIsTanpuraPlaying(): boolean {
  return isTanpuraPlaying;
}
