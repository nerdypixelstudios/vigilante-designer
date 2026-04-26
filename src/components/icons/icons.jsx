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

export function WhiteSwirlyArrow({ className = '', color = '#ffffff' }) {
  return (
    <svg
      width="185"
      height="167"
      viewBox="0 0 138.75 125.249995"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <clipPath id="wsa-clip-1">
          <path d="M 0.289062 26 L 135 26 L 135 105 L 0.289062 105 Z" clipRule="nonzero" />
        </clipPath>
        <clipPath id="wsa-clip-2">
          <path d="M 115.222656 0 L 137.992188 97.269531 L 23.296875 124.117188 L 0.527344 26.84375 Z" clipRule="nonzero" />
        </clipPath>
      </defs>
      <g clipPath="url(#wsa-clip-1)">
        <g clipPath="url(#wsa-clip-2)">
          <path
            fill={color}
            fillRule="evenodd"
            d="M 133.777344 81.078125 C 133.378906 80.414062 132.628906 79.992188 131.800781 80.050781 C 130.328125 80.175781 128.863281 80.199219 127.394531 80.175781 C 125.992188 80.152344 124.59375 80.050781 123.191406 80.003906 C 121.015625 79.9375 118.871094 79.957031 116.691406 79.933594 C 116 79.859375 115.375 80.355469 115.296875 81.046875 C 115.222656 81.742188 115.71875 82.367188 116.414062 82.445312 C 117.9375 82.789062 119.425781 83.1875 120.960938 83.496094 C 121.988281 83.703125 123.023438 83.867188 124.0625 84 C 124.507812 84.058594 124.953125 84.105469 125.398438 84.152344 C 114.128906 91.019531 102.417969 96.25 90.277344 98.605469 C 77.519531 101.082031 64.289062 100.363281 50.601562 95.027344 C 42.632812 91.917969 34.613281 85.886719 29.667969 78.371094 C 24.902344 71.125 23.019531 62.464844 27.09375 53.75 C 34.945312 58.746094 43.582031 62.375 52.679688 63.917969 C 57.652344 64.757812 64.800781 64.664062 70.34375 62.308594 C 74.417969 60.578125 77.632812 57.648438 78.8125 53.15625 C 79.988281 48.679688 78.738281 44.808594 76.210938 41.695312 C 72.691406 37.359375 66.558594 34.5625 61.371094 33.792969 C 54.542969 32.789062 46.753906 33.945312 39.882812 36.984375 C 33.894531 39.632812 28.617188 43.710938 25.207031 48.960938 L 25.078125 48.871094 C 16.511719 42.921875 9 35.347656 3.039062 27.242188 C 2.628906 26.683594 1.839844 26.558594 1.273438 26.964844 C 0.710938 27.378906 0.585938 28.167969 0.996094 28.726562 C 7.027344 37.144531 14.65625 45.03125 23.398438 51.261719 L 23.753906 51.511719 L 23.683594 51.652344 C 19.675781 59.835938 20.179688 68.007812 23.394531 75.324219 C 28.074219 85.960938 38.605469 94.75 49.097656 98.863281 C 63.570312 104.542969 77.570312 105.324219 91.074219 102.730469 C 103.949219 100.253906 116.375 94.695312 128.3125 87.355469 C 128.242188 87.628906 128.175781 87.90625 128.113281 88.183594 C 127.738281 89.808594 127.429688 91.449219 127.199219 93.097656 C 126.96875 94.734375 126.847656 96.351562 126.621094 97.957031 C 126.449219 98.632812 126.859375 99.316406 127.535156 99.488281 C 128.210938 99.65625 128.898438 99.25 129.070312 98.574219 C 129.835938 96.417969 130.582031 94.234375 131.242188 91.992188 C 131.664062 90.5625 132.027344 89.117188 132.480469 87.707031 C 132.953125 86.242188 133.480469 84.796875 134.144531 83.417969 C 134.515625 82.613281 134.339844 81.695312 133.777344 81.078125 Z M 28.527344 51.140625 C 36.121094 55.875 44.453125 59.289062 53.210938 60.667969 C 57.660156 61.371094 64.042969 61.277344 68.972656 59.121094 C 72.015625 57.792969 74.492188 55.644531 75.347656 52.265625 C 76.386719 48.171875 74.585938 44.824219 71.746094 42.355469 C 68.703125 39.710938 64.480469 38.046875 60.832031 37.535156 C 54.667969 36.667969 47.65625 37.78125 41.46875 40.550781 C 36.191406 42.914062 31.507812 46.492188 28.527344 51.140625 Z"
          />
        </g>
      </g>
    </svg>
  );
}

export function HandDrawnCircleArrow({ className = '', bgColor = '#000000', arrowColor = '#ffffff' }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 33.820312 33.820312"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="16.910156" cy="16.910156" r="16.910156" fill={bgColor} />
      <path
        fill={arrowColor}
        fillRule="nonzero"
        d="M 26.703125 15.871094 C 26.648438 15.628906 26.476562 15.378906 26.5 15.179688 C 26.585938 14.464844 26.140625 14.246094 25.585938 14.070312 C 23.242188 13.3125 20.859375 12.730469 18.40625 12.441406 C 17.527344 12.335938 17.3125 12.566406 17.503906 13.40625 C 17.53125 13.507812 17.570312 13.609375 17.597656 13.714844 C 17.695312 14.0625 17.964844 14.222656 18.292969 14.164062 C 18.617188 14.101562 18.90625 14.179688 19.203125 14.234375 C 19.960938 14.382812 20.710938 14.554688 21.460938 14.714844 C 21.484375 14.753906 21.488281 14.792969 21.472656 14.835938 C 20.660156 14.90625 19.847656 15 19.035156 15.035156 C 16.949219 15.125 14.902344 15.613281 12.792969 15.515625 C 11.789062 15.472656 10.769531 15.632812 9.769531 15.773438 C 8.980469 15.882812 8.183594 15.828125 7.402344 15.988281 C 7.003906 16.070312 6.933594 16.167969 7.167969 16.484375 C 7.632812 17.113281 8.117188 17.742188 9.082031 17.539062 C 9.25 17.503906 9.433594 17.519531 9.609375 17.503906 C 11.253906 17.339844 12.902344 17.25 14.550781 17.148438 C 16.332031 17.039062 18.113281 16.917969 19.894531 16.800781 C 20.488281 16.761719 21.082031 16.707031 21.734375 16.65625 C 21.550781 16.941406 21.316406 17.023438 21.121094 17.152344 C 20.464844 17.589844 19.878906 18.113281 19.277344 18.613281 C 18.355469 19.378906 18.75 20.402344 19.199219 21.027344 C 19.285156 21.144531 19.394531 21.210938 19.511719 21.050781 C 19.863281 20.570312 20.394531 20.28125 20.875 19.953125 C 22.265625 19.003906 23.71875 18.152344 25.171875 17.304688 C 25.550781 17.082031 25.929688 16.863281 26.308594 16.648438 C 26.617188 16.476562 26.796875 16.285156 26.703125 15.871094 Z"
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
