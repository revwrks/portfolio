/**
 * REVWORKS PROCEDURAL AUDIO DSP ENGINE
 * Synthesized exclusively via the Web Audio API — Zero external MP3 bloat.
 * Reverse-engineered from Phantom Land (55Hz ambient sub-bass drone) & Mat Voyce (tactile spring pops).
 */

let audioCtx: AudioContext | null = null;
let soundEnabled = true;
let ambientOsc: OscillatorNode | null = null;
let ambientGain: GainNode | null = null;

export function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function toggleSound(forceState?: boolean): boolean {
  if (forceState !== undefined) {
    soundEnabled = forceState;
  } else {
    soundEnabled = !soundEnabled;
  }

  if (!soundEnabled) {
    stopAmbientDrone();
  } else {
    startAmbientDrone();
  }

  return soundEnabled;
}

/**
 * 55Hz Cinematic Sub-Bass Ambient Drone (Phantom Land style)
 * Creates a subtle, subconscious cyberpunk architectural depth.
 */
export function startAmbientDrone(volume: number = 0.015) {
  if (!soundEnabled || typeof window === "undefined") return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ambientOsc) {
      stopAmbientDrone();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(55, ctx.currentTime); // 55Hz deep fundamental

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(110, ctx.currentTime);

    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 3.0); // Soft 3s fade in

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    ambientOsc = osc;
    ambientGain = gain;
  } catch {
    // Ignore audio context errors gracefully
  }
}

export function stopAmbientDrone() {
  if (!ambientGain || !ambientOsc) return;
  try {
    const ctx = getAudioContext();
    if (ctx && ambientGain) {
      ambientGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
      setTimeout(() => {
        if (ambientOsc) {
          ambientOsc.stop();
          ambientOsc.disconnect();
          ambientOsc = null;
          ambientGain = null;
        }
      }, 850);
    }
  } catch {
    ambientOsc = null;
    ambientGain = null;
  }
}

/**
 * Mechanical Keyboard Switch Click (Cappen / Industrial tactile buttons)
 */
export function playMechanicalClick(freq: number = 1200) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.025);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch {
    // Graceful fallback
  }
}

/**
 * Elastic Spring Pop (Mat Voyce rubber-band bounce feedback)
 */
export function playElasticPop(pitch: number = 440) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(pitch, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(pitch * 1.6, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.065);
  } catch {
    // Graceful fallback
  }
}

/**
 * Micro Telemetry Tick (Photoyoshi 10ms high-speed counter ticker)
 */
export function playTelemetryTick() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(2400, ctx.currentTime);

    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.008);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.01);
  } catch {
    // Graceful fallback
  }
}

/**
 * Anamorphic Shutter Whoosh (Pantheon Media 7-Bar Page Transition)
 */
export function playShutterWhoosh() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * 0.18;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.12);
    filter.Q.value = 3.0;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 0.18);
  } catch {
    // Graceful fallback
  }
}

/**
 * Convenience unified audio facade
 */
export const sound = {
  playClick: (freq?: number) => playMechanicalClick(freq),
  playTick: () => playTelemetryTick(),
  playPop: (pitch?: number) => playElasticPop(pitch),
  playCardClick: () => {
    playMechanicalClick(1400);
    setTimeout(() => playElasticPop(520), 40);
  },
  playDrone: (duration?: number) => {
    startAmbientDrone(0.02);
    if (duration) {
      setTimeout(() => stopAmbientDrone(), duration * 1000);
    }
  },
  playWhoosh: () => playShutterWhoosh(),
};

