/**
 * Alexa Female Voice Text-to-Speech Service
 * Selects standard female voices (e.g. Microsoft Zira, Samantha, Victoria, Karen, Google UK English Female)
 * and applies pitch tuning to deliver an authentic female Alexa voice experience on Fire TV.
 */

export const speakAlexaFemaleVoice = (text, onEnd, onError) => {
  if (!('speechSynthesis' in window)) return null;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.05;
  utterance.pitch = 1.25; // Pitch tuned for authentic female voice clarity

  const applyFemaleVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    // Preference list for standard high-quality female voices
    const femaleVoice = voices.find((v) =>
      /zira|samantha|victoria|karen|female|catherine|fiona|google us english|alexa/i.test(v.name)
    ) || voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Google')));

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
  };

  applyFemaleVoice();

  // Handle async voice loading in browsers
  if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
    window.speechSynthesis.onvoiceschanged = applyFemaleVoice;
  }

  if (onEnd) utterance.onend = onEnd;
  if (onError) utterance.onerror = onError;

  window.speechSynthesis.speak(utterance);
  return utterance;
};

export const stopAlexaVoice = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
