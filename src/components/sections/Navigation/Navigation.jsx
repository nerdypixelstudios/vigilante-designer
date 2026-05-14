import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Tooltip from '../../shared/Tooltip';
import { useTheme } from '../../shared/ThemeContext';
import {
  NavIconWork,
  NavIconSkills,
  NavIconContact,
  NavIconDownload,
  NavIconMissions,
  NavIconPing,
  HamburgerIcon,
  CloseIcon,
  ChevronLeft,
} from '../../icons/icons';
import styles from './Navigation.module.css';

const CV_URL = 'https://drive.google.com/file/d/1rpDMAyfdz8aZ9ynHOBxleKSVUe3tzSD6/view?usp=sharing';

const normalLinks = [
  { label: 'My Work', href: '#featured-projects', Icon: NavIconWork },
  { label: 'Skills', href: '#skills', Icon: NavIconSkills },
  { label: 'Contact me', href: '#footer', Icon: NavIconContact },
  { label: 'Download CV', href: CV_URL, Icon: NavIconDownload, external: true },
];

const funLinks = [
  { label: 'Successful Missions', href: '#featured-projects', Icon: NavIconMissions },
  { label: 'Superpowers', href: '#skills', Icon: NavIconSkills },
  { label: 'Ping the Vigilante', href: '#footer', Icon: NavIconPing },
];

export default function Navigation({
  links,
  showToggle = true,
  backHref,
  backLabel = 'Back',
}) {
  const { isFunMode, toggleMode, toggleStage } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const iconRefs = useRef({});
  const islandRef = useRef(null);

  const activeLinks = links ?? (isFunMode ? funLinks : normalLinks);
  const brandSrc = isFunMode
    ? '/favicons/favicon-fun.png'
    : '/favicons/favicon-normal.png';

  const triggerIcon = (href, action) => {
    const ref = iconRefs.current[href];
    if (ref?.[action]) ref[action]();
  };

  const toggleText = isFunMode ? 'Hang up the cape' : 'Do not click this!';
  const tooltipText = toggleStage === 'complete'
    ? null
    : (isFunMode ? 'Back to the day job' : 'Resist if you can');

  const handleNavLinkClick = (event, href) => {
    if (!href?.startsWith('#') || typeof window === 'undefined') {
      return;
    }

    const targetId = href.slice(1);
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    setMenuOpen(false);

    const navBottom = islandRef.current?.getBoundingClientRect().bottom ?? 0;
    const scrollOffset = navBottom + 16;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - scrollOffset;

    window.history.replaceState(null, '', href);
    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: 'smooth',
    });
  };

  return (
    <nav className={styles.navOuter}>
      <div className={styles.navStack}>
        <div
          ref={islandRef}
          className={`${styles.island} ${isFunMode ? styles.islandFun : styles.islandNormal}`}
        >
          <div className={styles.navInner}>
            <Link href="/" className={styles.brand} aria-label="Lohith Savala - home">
              <Image
                src={brandSrc}
                alt=""
                width={44}
                height={44}
                className={styles.brandMark}
                priority
                unoptimized
              />
            </Link>

            <ul className={`${styles.desktopLinks} hidden md:flex`}>
              {activeLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className={`${styles.navLink} ${isFunMode ? styles.navLinkFun : styles.navLinkNormal}`}
                    onClick={(event) => handleNavLinkClick(event, link.href)}
                    onMouseEnter={() => triggerIcon(link.href, 'startAnimation')}
                    onMouseLeave={() => triggerIcon(link.href, 'stopAnimation')}
                    onFocus={() => triggerIcon(link.href, 'startAnimation')}
                    onBlur={() => triggerIcon(link.href, 'stopAnimation')}
                  >
                    {link.Icon && (
                      <link.Icon
                        size={20}
                        ref={(el) => { iconRefs.current[link.href] = el; }}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className={styles.rightGroup}>
              {backHref && (
                <Link
                  href={backHref}
                  className={`${styles.navLink} ${isFunMode ? styles.navLinkFun : styles.navLinkNormal}`}
                >
                  <ChevronLeft color={isFunMode ? 'var(--color-fun-ink-50)' : 'var(--color-ink-950)'} />
                  {backLabel}
                </Link>
              )}

              {showToggle && (
                <button
                  onClick={toggleMode}
                  className={styles.togglePill}
                  aria-label={isFunMode ? 'Switch to normal mode' : 'Switch to fun mode'}
                >
                  {tooltipText ? (
                    <Tooltip
                      content={tooltipText}
                      variant={isFunMode ? 'fun' : 'normal'}
                      position="bottom"
                      focusable={false}
                      className={styles.toggleTooltip}
                    >
                      <span className={`${styles.toggleLabel} ${isFunMode
                        ? 'font-caveat text-fun-ink-50'
                        : 'font-dm text-ink-950'
                      }`}
                      >
                        {toggleText}
                      </span>
                      <span className={`${styles.toggleKnob} ${isFunMode ? styles.toggleKnobOn : styles.toggleKnobOff}`} />
                    </Tooltip>
                  ) : (
                    <>
                      <span className={`${styles.toggleLabel} ${isFunMode
                        ? 'font-caveat text-fun-ink-50'
                        : 'font-dm text-ink-950'
                      }`}
                      >
                        {toggleText}
                      </span>
                      <span className={`${styles.toggleKnob} ${isFunMode ? styles.toggleKnobOn : styles.toggleKnobOff}`} />
                    </>
                  )}
                </button>
              )}

              <button
                className={`md:hidden ${styles.hamburger}`}
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav-menu"
              >
                {menuOpen
                  ? <CloseIcon color={isFunMode ? '#EEEFEB' : '#1C1D1E'} />
                  : <HamburgerIcon color={isFunMode ? '#EEEFEB' : '#1C1D1E'} />
                }
              </button>
            </div>
          </div>
        </div>

        <div
          id="mobile-nav-menu"
          className={`${styles.mobileMenuShell} ${menuOpen ? styles.mobileMenuShellOpen : ''} ${isFunMode ? styles.mobileMenuShellFun : styles.mobileMenuShellNormal}`}
          aria-hidden={!menuOpen}
        >
          <ul className={styles.mobileMenu}>
            {activeLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  onClick={(event) => {
                    handleNavLinkClick(event, link.href);
                    setMenuOpen(false);
                  }}
                  className={`${styles.mobileLink} ${isFunMode ? styles.mobileLinkFun : styles.mobileLinkNormal}`}
                >
                  {link.Icon && <link.Icon size={20} />}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
