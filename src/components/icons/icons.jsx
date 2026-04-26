// All SVG assets as named exports. No inline SVGs anywhere else in the codebase.

// ── Logo marks ────────────────────────────────────────────────────────────────

export function CapLogo({ className = '' }) {
  return (
    <svg
      width="32"
      height="28"
      viewBox="0 0 32 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Cap dome */}
      <ellipse cx="16" cy="13" rx="13" ry="11" fill="#FBE200" />
      {/* Cap band */}
      <rect x="3" y="18" width="26" height="3" rx="1.5" fill="#000000" />
      {/* Cap bill / brim */}
      <path d="M3 21 Q0 22 1 25 Q2 27 6 26 L16 23 Z" fill="#FBE200" />
      {/* Button on top */}
      <circle cx="16" cy="2" r="2" fill="#000000" />
    </svg>
  );
}

export function MaskLogo({ className = '' }) {
  return (
    <svg
      width="44"
      height="22"
      viewBox="0 0 44 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left eye surround */}
      <ellipse cx="11" cy="11" rx="11" ry="10" fill="#FF0A00" />
      {/* Right eye surround */}
      <ellipse cx="33" cy="11" rx="11" ry="10" fill="#FF0A00" />
      {/* Bridge connecting the two */}
      <rect x="11" y="4" width="22" height="14" fill="#FF0A00" />
      {/* Left eyehole */}
      <ellipse cx="11" cy="11" rx="6" ry="6" fill="#1C1D1E" />
      {/* Right eyehole */}
      <ellipse cx="33" cy="11" rx="6" ry="6" fill="#1C1D1E" />
    </svg>
  );
}

// ── Motifs ────────────────────────────────────────────────────────────────────

export function SquiggleArrow({ className = '', color = '#000000' }) {
  return (
    <svg
      width="80"
      height="48"
      viewBox="0 0 80 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 40 C10 30 8 14 20 10 C32 6 28 22 40 18 C52 14 48 4 60 8 C70 12 68 24 72 20"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrowhead */}
      <path
        d="M68 14 L74 20 L64 24"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function MaskingTape({ className = '' }) {
  return (
    <svg
      width="48"
      height="16"
      viewBox="0 0 48 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="48" height="16" rx="2" fill="#E63A2E" opacity="0.85" />
      {/* Tape texture lines */}
      <line x1="0" y1="4" x2="48" y2="4" stroke="#C42E24" strokeWidth="0.5" opacity="0.5" />
      <line x1="0" y1="8" x2="48" y2="8" stroke="#C42E24" strokeWidth="0.5" opacity="0.5" />
      <line x1="0" y1="12" x2="48" y2="12" stroke="#C42E24" strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}

export function CircleArrow({ className = '', color = '#000000' }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="18" cy="18" r="17" stroke={color} strokeWidth="2" fill="none" />
      <path
        d="M13 18 L23 18 M19 14 L23 18 L19 22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PaperPlane({ className = '' }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 14 L26 2 L18 26 L13 17 Z"
        stroke="#000000"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="13" y1="17" x2="26" y2="2" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ── Social icons ──────────────────────────────────────────────────────────────

export function TwitterIcon({ className = '', color = '#000000' }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Twitter / X"
    >
      <path
        d="M2 2 L18 18 M2 18 L18 2"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M2 3 L8 3 L18 17 L12 17 Z"
        fill={color}
        stroke="none"
      />
    </svg>
  );
}

export function LinkedInIcon({ className = '', color = '#000000' }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="LinkedIn"
    >
      <rect x="1" y="1" width="18" height="18" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="5.5" cy="6" r="1.5" fill={color} />
      <rect x="4" y="9" width="3" height="8" rx="0.5" fill={color} />
      <path d="M10 9 h3 v1.5 A3 3 0 0 1 16 13 v4 h-3 v-4 a1 1 0 0 0-3 0 v4 h-3 v-8 h3 Z" fill={color} />
    </svg>
  );
}

// ── UI icons ──────────────────────────────────────────────────────────────────

export function HamburgerIcon({ className = '', color = '#ffffff' }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Open menu"
    >
      <line x1="3" y1="6" x2="21" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="18" x2="21" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className = '', color = '#ffffff' }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Close menu"
    >
      <line x1="4" y1="4" x2="20" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="4" x2="4" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronLeft({ className = '', color = '#000000' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M15 18 L9 12 L15 6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRight({ className = '', color = '#000000' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M9 6 L15 12 L9 18" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlayIcon({ className = '' }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Play video">
      <circle cx="24" cy="24" r="23" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
      <path d="M20 16 L34 24 L20 32 Z" fill="#ffffff" />
    </svg>
  );
}

export function LightningIcon({ className = '' }) {
  return (
    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M7 1 L2 9 L6 9 L5 15 L10 7 L6 7 Z" fill="#FF5F00" stroke="#FF5F00" strokeWidth="0.5" strokeLinejoin="round" />
    </svg>
  );
}

export function BulbIcon({ className = '' }) {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="7" cy="6" r="5" stroke="#73CCFE" strokeWidth="1.5" fill="none" />
      <path d="M5 11 L9 11 M5.5 13 L8.5 13" stroke="#73CCFE" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function DownloadIcon({ className = '', color = '#000000' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M10 2 L10 13 M6 9 L10 13 L14 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 15 L3 17 L17 17 L17 15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MailIcon({ className = '', color = '#000000' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect x="2" y="4" width="16" height="12" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M2 7 L10 12 L18 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
