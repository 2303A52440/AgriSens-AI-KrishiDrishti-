/**
 * 100% Offline Multilingual Text-To-Speech (TTS) Service
 * Uses native Web SpeechSynthesis API available on edge browsers/SoC Web Views.
 */
export function speakAdvisory(text, langCode = 'hi-IN', onEndCallback = () => {}) {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser environment.');
    onEndCallback();
    return;
  }

  // Stop any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Map 2-letter language code to BCP 47 tag
  const langMap = {
    'en': 'en-IN',
    'hi': 'hi-IN',
    'te': 'te-IN',
    'ta': 'ta-IN',
    'kn': 'kn-IN',
    'mr': 'mr-IN',
    'bn': 'bn-IN',
    'pa': 'pa-IN',
    'gu': 'gu-IN'
  };

  utterance.lang = langMap[langCode] || 'hi-IN';
  utterance.rate = 0.9; // Slightly slower for clear rural audio clarity
  utterance.pitch = 1.0;

  utterance.onend = () => {
    onEndCallback();
  };

  utterance.onerror = (e) => {
    console.error('TTS Error:', e);
    onEndCallback();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
