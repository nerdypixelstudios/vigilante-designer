import { useRef, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../../shared/ThemeContext';
import {
  NavBrandNormal,
  NavBrandFun,
  NavIconWork,
  NavIconSkills,
  NavIconContact,
  NavIconMissions,
  NavIconPing,
  HamburgerIcon,
  CloseIcon,
} from '../../icons/icons';
import styles from './Navigation.module.css';

const normalLinks = [
  { label: 'My Work', href: '#featured-projects', Icon: NavIconWork },
  { label: 'Skills', href: '#skills', Icon: NavIconSkills },
  { label: 'Contact me', href: '#footer', Icon: NavIconContact },
];

const funLinks = [
  { label: 'Successful Missions', href: '#featured-projects', Icon: NavIconMissions },
  { label: 'Superpowers', href: '#skills', Icon: NavIconSkills },
  { label: 'Ping the Vigilante', href: '#footer', Icon: NavIconPing },
];

export default function Navigation() {
  const { isFunMode, toggleMode, toggleStage } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const iconRefs = useRef({});

  const links = isFunMode ? funLinks : normalLinks;

  const triggerIcon = (href, action) => {
    const ref = iconRefs.current[href];
    if (ref?.[action]) ref[action]();
  };

  const toggleText = isFunMode ? 'Hang up the cape' : "Don't click this";
  // Tooltip carries the dare while pristine; once the trick has played out, stay silent.
  const tooltipText = toggleStage === 'complete'
    ? null
    : (isFunMode ? 'Back to the day job ☀️' : 'Resist if you can 🦇');

  return (
    <nav className={styles.navOuter}>
      <div className={`${styles.island} ${isFunMode ? styles.islandFun : styles.islandNormal}`}>
        <div className={styles.navInner}>

          {/* ── Brand (logo only) ── */}
          <Link href="/" className={styles.brand} aria-label="Lohith Savala — home">
            {isFunMode ? <NavBrandFun /> : <NavBrandNormal />}
          </Link>

          {/* ── Desktop nav links (centred) ── */}
          <ul className={`${styles.desktopLinks} hidden md:flex`}>
            {links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`${styles.navLink} ${isFunMode ? styles.navLinkFun : styles.navLinkNormal}`}
                  onMouseEnter={() => triggerIcon(link.href, 'startAnimation')}
                  onMouseLeave={() => triggerIcon(link.href, 'stopAnimation')}
                  onFocus={() => triggerIcon(link.href, 'startAnimation')}
                  onBlur={() => triggerIcon(link.href, 'stopAnimation')}
                >
                  <link.Icon
                    size={20}
                    ref={(el) => { iconRefs.current[link.href] = el; }}
                  />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Right side: toggle (text then knob) + hamburger ── */}
          <div className={styles.rightGroup}>
            <button
              onClick={toggleMode}
              className={styles.togglePill}
              aria-label={isFunMode ? 'Switch to normal mode' : 'Switch to fun mode'}
            >
              <span className={`${styles.toggleLabel} ${isFunMode
                ? 'font-caveat text-fun-ink-50'
                : 'font-dm text-ink-950'
              }`}>
                {toggleText}
              </span>
              <span className={`${styles.toggleKnob} ${isFunMode ? styles.toggleKnobOn : styles.toggleKnobOff}`} />
              {tooltipText && (
                <span className={`${styles.tooltip} ${isFunMode ? styles.tooltipFun : styles.tooltipNormal}`} role="tooltip">
                  {tooltipText}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className={`md:hidden ${styles.hamburger}`}
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen
                ? <CloseIcon color={isFunMode ? '#EEEFEB' : '#1C1D1E'} />
                : <HamburgerIcon color={isFunMode ? '#EEEFEB' : '#1C1D1E'} />
              }
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown ── */}
        {menuOpen && (
          <ul className={styles.mobileMenu}>
            {links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`${styles.mobileLink} ${isFunMode ? styles.mobileLinkFun : styles.mobileLinkNormal}`}
                >
                  <link.Icon size={20} />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
