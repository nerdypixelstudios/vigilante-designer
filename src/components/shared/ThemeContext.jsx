import { createContext, useContext, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'lsavala.toggleStage';
// How long after the toggle is clicked before we actually flip the mode.
// During this window the blackout layer rises to full opacity, so the visual
// mode change happens hidden behind it — the bats clear and the new mode
// is "revealed" rather than instantly swapped.
const MODE_FLIP_DELAY_MS = 280;
// Banner fires alongside the overlay — appears against the black wash with
// bats flying around it, stays visible through the reveal.
const BANNER_DELAY_AFTER_BATS_MS = 280;

const ThemeContext = createContext({
  isFunMode: false,
  toggleMode: () => {},
  toggleStage: 'pristine',
  bannerEvent: null,
  dismissBanner: () => {},
  revealEvent: null,
  dismissReveal: () => {},
});

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

const FUN_BANNER = () => ({
  id: Date.now(),
  mode: 'fun',
  headline: 'What have you done?',
  caption: "You weren't supposed to find this side.",
  accent: '🦇',
});

const NORMAL_BANNER = () => ({
  id: Date.now(),
  mode: 'normal',
  intro: 'Now that you know the secret,',
  headline: "don't tell anyone.",
  accent: '🤫',
});

export function ThemeProvider({ children }) {
  const [isFunMode, setIsFunMode] = useState(false);
  const [toggleStage, setToggleStage] = useState('pristine');
  const [bannerEvent, setBannerEvent] = useState(null);
  const [revealEvent, setRevealEvent] = useState(null);
  const bannerTimer = useRef(null);
  const flipTimer = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    if (saved === 'seen-reveal' || saved === 'complete') {
      setToggleStage(saved);
    }
    return () => {
      if (bannerTimer.current) clearTimeout(bannerTimer.current);
      if (flipTimer.current) clearTimeout(flipTimer.current);
    };
  }, []);

  function persistStage(stage) {
    setToggleStage(stage);
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(STORAGE_KEY, stage);
    }
  }

  function scheduleBanner(event, delayMs) {
    if (bannerTimer.current) clearTimeout(bannerTimer.current);
    if (delayMs <= 0) {
      setBannerEvent(event);
      return;
    }
    bannerTimer.current = setTimeout(() => setBannerEvent(event), delayMs);
  }

  function toggleMode() {
    const reduced = prefersReducedMotion();

    // Beat 1 — the dramatic reveal. Pristine → fun.
    // Blackout rises BEFORE the mode flip so the toggle UI doesn't update
    // visibly until it's hidden behind the black wash.
    if (toggleStage === 'pristine' && !isFunMode) {
      persistStage('seen-reveal');
      if (reduced) {
        setIsFunMode(true);
        scheduleBanner(FUN_BANNER(), 200);
        return;
      }
      setRevealEvent({ id: Date.now() });
      if (flipTimer.current) clearTimeout(flipTimer.current);
      flipTimer.current = setTimeout(() => setIsFunMode(true), MODE_FLIP_DELAY_MS);
      scheduleBanner(FUN_BANNER(), BANNER_DELAY_AFTER_BATS_MS);
      return;
    }

    // Beat 2 — the wink. First flip back from fun → normal.
    if (toggleStage === 'seen-reveal' && isFunMode) {
      persistStage('complete');
      setIsFunMode(false);
      scheduleBanner(NORMAL_BANNER(), 0);
      return;
    }

    // Subsequent toggles: silent flip, no banner, no bats.
    setIsFunMode(prev => !prev);
  }

  function dismissBanner() {
    setBannerEvent(null);
  }

  function dismissReveal() {
    setRevealEvent(null);
  }

  return (
    <ThemeContext.Provider value={{
      isFunMode,
      toggleMode,
      toggleStage,
      bannerEvent,
      dismissBanner,
      revealEvent,
      dismissReveal,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
