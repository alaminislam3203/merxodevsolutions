'use client';

// Web Audio API Synthesizer for Instant Chat & Admin Notification Sounds
// Zero external MP3 dependencies — works instantaneously in all modern browsers.

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Soft, pleasant 2-tone pop sound for visitors when AI or Live Admin replies
 */
export function playVisitorMessageSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Note 1: Warm E5
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now);
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.12);

    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.23);
  } catch {
    // Ignore if browser blocked autoplay before user interaction
  }
}

/**
 * Crisp, clear 2-note chime for Admin Dashboard when a new visitor message arrives
 */
export function playAdminAlertSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [
      { freq: 587.33, start: 0, duration: 0.16 },   // D5
      { freq: 880.0, start: 0.13, duration: 0.28 }, // A5
    ];

    notes.forEach(({ freq, start, duration }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + start);

      gain.gain.setValueAtTime(0.001, now + start);
      gain.gain.exponentialRampToValueAtTime(0.28, now + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + start + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + start);
      osc.stop(now + start + duration + 0.02);
    });
  } catch {
    // Ignore if blocked
  }
}

/**
 * Urgent 3-note bell chime when a visitor clicks "Talk to Live Admin" / requests human help
 */
export function playUrgentAdminRing() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [
      { freq: 659.25, start: 0, duration: 0.14 },    // E5
      { freq: 783.99, start: 0.14, duration: 0.14 }, // G5
      { freq: 1046.5, start: 0.28, duration: 0.35 }, // C6
      { freq: 783.99, start: 0.65, duration: 0.14 }, // G5
      { freq: 1046.5, start: 0.79, duration: 0.4 },  // C6
    ];

    notes.forEach(({ freq, start, duration }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + start);

      gain.gain.setValueAtTime(0.001, now + start);
      gain.gain.exponentialRampToValueAtTime(0.32, now + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + start + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + start);
      osc.stop(now + start + duration + 0.02);
    });
  } catch {
    // Ignore if blocked
  }
}

