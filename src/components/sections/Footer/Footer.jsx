import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FooterDownloadIcon, FooterLinkedInIcon, FooterMailIcon } from '../../icons/icons';
import styles from './Footer.module.css';

const LINKEDIN_URL = 'https://www.linkedin.com/in/lohith-savala';
const EMAIL_URL = 'mailto:lohith.savala@gmail.com';
const CV_URL = 'https://drive.google.com/file/d/1rpDMAyfdz8aZ9ynHOBxleKSVUe3tzSD6/view?usp=sharing';
const FOOTER_COPYRIGHT = '2025 Lohith Savala';

const footerLinks = [
  {
    label: 'LinkedIn',
    href: LINKEDIN_URL,
    external: true,
    ariaLabel: 'Open Lohith Savala on LinkedIn',
    Icon: FooterLinkedInIcon,
  },
  {
    label: 'Email',
    href: EMAIL_URL,
    external: false,
    ariaLabel: 'Email Lohith Savala',
    Icon: FooterMailIcon,
  },
  {
    label: 'Download CV',
    href: CV_URL,
    external: true,
    ariaLabel: 'Download Lohith Savala CV',
    Icon: FooterDownloadIcon,
  },
];

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(query.matches);

    updatePreference();
    query.addEventListener?.('change', updatePreference);

    return () => query.removeEventListener?.('change', updatePreference);
  }, []);

  return prefersReducedMotion;
}

function FooterLink({ link, variant = 'home' }) {
  const Icon = link.Icon;
  const externalProps = link.external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <a
      href={link.href}
      aria-label={link.ariaLabel}
      className={`${styles.footerLink} ${variant === 'caseStudy' ? styles.caseFooterLink : ''}`}
      {...externalProps}
    >
      <Icon color="currentColor" className={styles.footerLinkIcon} />
      <span>{link.label}</span>
    </a>
  );
}

function FooterLinks({ variant = 'home' }) {
  return (
    <div className={`${styles.footerLinks} ${variant === 'caseStudy' ? styles.caseFooterLinks : ''}`}>
      {footerLinks.map((link) => (
        <FooterLink key={link.label} link={link} variant={variant} />
      ))}
    </div>
  );
}

function FooterAvatar({ variant = 'home' }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (variant === 'caseStudy') {
    return (
      <div className={styles.caseAvatar} aria-hidden="true">
        <Image
          src="/images/footer/footer-avatar.png"
          alt=""
          width={83}
          height={70}
          sizes="83px"
          unoptimized
          className={styles.caseAvatarImage}
        />
      </div>
    );
  }

  return (
    <div className={styles.homeAvatar} aria-hidden="true">
      <div className={styles.homeAvatarDecor}>
        <span className={`${styles.decorPanel} ${styles.decorPanelTop}`} />
        <span className={`${styles.decorPanel} ${styles.decorPanelLeft}`} />
        <span className={`${styles.decorPanel} ${styles.decorPanelRight}`} />
        <span className={`${styles.decorBracket} ${styles.decorBracketLeft}`} />
        <span className={`${styles.decorBracket} ${styles.decorBracketRight}`} />
        <span className={styles.decorSignalLine} />
        <span className={`${styles.decorNode} ${styles.decorNodeOne}`} />
        <span className={`${styles.decorNode} ${styles.decorNodeTwo}`} />
        <span className={`${styles.decorNode} ${styles.decorNodeThree}`} />
      </div>
      {prefersReducedMotion ? (
        <Image
          src="/images/footer/footer-avatar.png"
          alt=""
          width={83}
          height={70}
          sizes="(min-width: 768px) 300px, 180px"
          unoptimized
          className={styles.homeAvatarFallback}
        />
      ) : (
        <video
          src="/videos/footer/footer-animation.mp4"
          autoPlay
          muted
          playsInline
          loop
          className={styles.homeAvatarVideo}
        />
      )}
    </div>
  );
}

function CopyrightLine({ className = '' }) {
  return (
    <p className={`${styles.copyright} ${className}`}>
      &copy; {FOOTER_COPYRIGHT} &mdash; AI-Enabled Product Designer | Updated May 2026
    </p>
  );
}

function CaseStudyTimer() {
  const [secondsSpent, setSecondsSpent] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSecondsSpent((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className={styles.timerValue}>{formatTime(secondsSpent)}</span>
  );
}

function HomeFooter() {
  return (
    <footer id="footer" className={`${styles.footer} ${styles.homeFooter}`}>
      <div className={styles.homeInner}>
        <div className={styles.homeCopy}>
          <p className={styles.statusBadge}>
            <span aria-hidden="true" />
            OPEN TO WORK
          </p>

          <h2 className={styles.homeHeading}>Looking for a Product Designer?</h2>

          <div className={styles.homeActions}>
            <p>Let's talk!</p>
            <FooterLinks />
          </div>

          <CopyrightLine />
        </div>

        <FooterAvatar />
      </div>
    </footer>
  );
}

function CaseStudyFooter() {
  return (
    <footer id="footer" className={`${styles.footer} ${styles.caseFooter}`}>
      <div className={styles.caseInner}>
        <div className={styles.caseTimerBlock}>
          <p className={styles.caseEyebrow}>How curious are you?</p>
          <p className={styles.timerLine}>
            <span>You've spent</span>
            <CaseStudyTimer />
          </p>
          <p className={styles.caseSupport}>exploring the thinking behind this project.</p>
        </div>

        <div className={styles.caseContactWrap}>
          <FooterAvatar variant="caseStudy" />
          <div className={styles.caseContactCard}>
            <h2>
              Want this level of thinking on
              <br />
              your product?
            </h2>
            <FooterLinks variant="caseStudy" />
          </div>
        </div>

        <CopyrightLine className={styles.caseCopyright} />
      </div>
    </footer>
  );
}

export default function Footer({ variant = 'home' }) {
  if (variant === 'caseStudy') {
    return <CaseStudyFooter />;
  }

  return <HomeFooter />;
}
