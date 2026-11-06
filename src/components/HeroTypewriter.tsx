import { useState, useEffect } from 'react';

const PHRASES = [
  'Escultura em fibra de vidro.',
  'Cenografia em fibra de vidro.',
  'Peças de Páscoa em fibra de vidro.',
  'Peças de Carnaval em fibra de vidro.',
  'Peças natalinas em fibra de vidro.',
  'Peças técnicas em fibra de vidro.',
];

export function HeroTypewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCurrentText(PHRASES[0]);
      return;
    }

    const targetPhrase = PHRASES[phraseIndex];
    const typingSpeed = isDeleting ? 28 : 55;
    const pauseBeforeDelete = 2200;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < targetPhrase.length) {
          setCurrentText(targetPhrase.substring(0, currentText.length + 1));
        } else {
          // Finished typing phrase, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(targetPhrase.substring(0, currentText.length - 1));
        } else {
          // Finished deleting, move to next phrase
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, prefersReducedMotion]);

  return (
    <div
      className="text-base sm:text-lg md:text-xl font-medium text-[#2A5FA5] min-h-[2.25rem] sm:min-h-[2.5rem] flex items-center flex-wrap gap-1.5"
      aria-live="polite"
    >
      <span className="text-[#64748B] font-normal">Especialistas em</span>
      <span className="font-semibold text-[#2A5FA5] inline-flex items-center">
        {currentText}
        {!prefersReducedMotion && (
          <span
            className="inline-block w-[2px] h-5 sm:h-6 bg-[#2A5FA5] ml-1 animate-pulse"
            aria-hidden="true"
          />
        )}
      </span>
    </div>
  );
}
