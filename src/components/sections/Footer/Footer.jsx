import { useTheme } from '../../shared/ThemeContext';
import { DownloadIcon, MailIcon, LinkedInIcon } from '../../icons/icons';
import styles from './Footer.module.css';

export default function Footer() {
  const { isFunMode } = useTheme();

  // Normal mode is now a dark footer — creates a bookend with the black nav
  const sectionBg = isFunMode ? 'bg-fun-surface-black' : 'bg-ink-950';
  const headlineColor = 'text-fun-ink-50';

  return (
    <footer id="footer" className={`${sectionBg} ${styles.footer}`}>

      {/* ── Fun mode: Gotham skyline ── */}
      {isFunMode && (
        <div className={styles.gothamSky} aria-hidden="true">
          <div className={styles.skyline} />
        </div>
      )}

      <div className={styles.inner}>

        {/* ── Headline ── */}
        <h2 className={isFunMode
          ? `font-rock-salt ${headlineColor} leading-rock-salt ${styles.h2Fun}`
          : `font-cabinet font-extrabold ${headlineColor} ${styles.h2Normal}`
        }>
          {isFunMode
            ? "Bat-signal's busted\nfrom last night's chaos…"
            : "Let's Build Something\nThoughtful"}
        </h2>

        {/* ── Actions ── */}
        <div className={styles.actions}>
          <a
            href="#"
            className={`${styles.actionBtn} ${isFunMode
              ? 'bg-fun-accent-yellow text-fun-surface-black font-caveat font-bold'
              : 'bg-accent-yellow text-ink-950 font-dm font-extrabold'
            } text-base`}
          >
            <DownloadIcon color="#000000" className={styles.actionIcon} />
            {isFunMode ? 'Grab My Secret Files' : 'Download Portfolio'}
          </a>

          <a
            href="mailto:lohith@example.com"
            className={`${styles.actionBtn} ${isFunMode
              ? 'border-2 border-fun-ink-700 text-fun-ink-50 font-caveat font-bold'
              : 'border-2 border-fun-ink-100 text-fun-ink-50 font-dm font-extrabold'
            } text-base`}
          >
            <MailIcon color="#EEEFEB" className={styles.actionIcon} />
            {isFunMode ? 'Email the Batcave' : 'Email Me'}
          </a>

          <div className={styles.socials}>
            <p className={`font-dm text-xs text-fun-ink-500 mb-2 font-extrabold uppercase tracking-widest`}>
              {isFunMode ? 'Find Me in Gotham' : 'LinkedIn'}
            </p>
            <div className={styles.socialLinks}>
              <a
                href="https://www.linkedin.com/in/lohith-savala"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={styles.socialIcon}
              >
                <LinkedInIcon color="#EEEFEB" />
              </a>
            </div>
          </div>
        </div>

        {/* ── Copyright ── */}
        <p className={`font-dm text-xs text-fun-ink-700 ${styles.copyright}`}>
          {isFunMode
            ? '© Lohith Savala — Vigilante, off-duty designer, professional pixel pusher.'
            : '© 2025 Lohith Savala — AI-Enabled Product Designer.'}
        </p>

      </div>
    </footer>
  );
}
