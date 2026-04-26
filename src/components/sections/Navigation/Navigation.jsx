import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../../shared/ThemeContext';
import { CapLogo, MaskLogo, HamburgerIcon, CloseIcon } from '../../icons/icons';
import styles from './Navigation.module.css';

const normalLinks = [
  { label: 'My Work', href: '#featured-projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact me', href: '#footer' },
];

const funLinks = [
  { label: 'Successful Missions', href: '#featured-projects' },
  { label: 'Superpowers', href: '#skills' },
  { label: 'Ping the Vigilante', href: '#footer' },
];

export default function Navigation() {
  const { isFunMode, toggleMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = isFunMode ? funLinks : normalLinks;
  const navBg = isFunMode ? 'bg-fun-surface-black' : 'bg-ink-950';
  const linkColor = isFunMode
    ? 'text-fun-ink-50 font-caveat text-fun-h4'
    : 'text-fun-ink-50 font-dm font-extrabold text-sm';

  return (
    <nav className={`${navBg} sticky top-0 z-50 ${styles.nav}`}>
      <div className={styles.navInner}>

        {/* ── Logo ── */}
        <Link href="/" className={styles.logo}>
          {isFunMode ? <MaskLogo /> : <CapLogo />}
          <span className={isFunMode
            ? 'font-caveat font-bold text-fun-ink-50 text-fun-h4 ml-2'
            : 'font-dm font-extrabold text-fun-ink-50 text-sm ml-2'
          }>
            {isFunMode ? "IT'S LOHITH" : 'Lohith Savala'}
          </span>
        </Link>

        {/* ── Toggle (centred) ── */}
        <button
          onClick={toggleMode}
          className={`${styles.togglePill} ${isFunMode ? styles.togglePillFun : styles.togglePillNormal}`}
          aria-label={isFunMode ? 'Switch to normal mode' : 'Switch to fun mode'}
          title={!isFunMode ? 'Tell me the truth about this guy 🤫' : undefined}
        >
          <span className={`${styles.toggleKnob} ${isFunMode ? styles.toggleKnobOn : styles.toggleKnobOff}`} />
          <span className={isFunMode
            ? 'font-caveat font-bold text-fun-ink-50 text-base'
            : 'font-dm font-extrabold text-ink-950 text-sm'
          }>
            Make it fun!
          </span>
        </button>

        {/* ── Desktop nav links ── */}
        <ul className={`${styles.desktopLinks} hidden md:flex items-center gap-6`}>
          {links.map(link => (
            <li key={link.href}>
              <a href={link.href} className={`${linkColor} hover:opacity-70 transition-opacity`}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden ml-auto"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen
            ? <CloseIcon color={isFunMode ? '#EEEFEB' : '#EEEFEB'} />
            : <HamburgerIcon color={isFunMode ? '#EEEFEB' : '#EEEFEB'} />
          }
        </button>
      </div>

      {/* ── Mobile dropdown ── */}
      {menuOpen && (
        <ul className={`${navBg} md:hidden flex flex-col gap-0 border-t border-fun-ink-900`}>
          {links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-6 py-4 ${linkColor} border-b border-fun-ink-900 hover:opacity-70`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
