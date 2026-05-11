import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../shared/ThemeContext';
import styles from './WireframeReveal.module.css';

const wireframeSections = [
  {
    id: 'wireframe-hero',
    src: '/images/wireframe/wireframe-hero.png',
    width: 1920,
    height: 1149,
    alt: 'Hand-drawn opening sketch for the portfolio hero section.',
    priority: true,
  },
  {
    id: 'wireframe-work',
    src: '/images/wireframe/wireframe-work.png',
    width: 1920,
    height: 3741,
    alt: 'Hand-drawn sketch for featured projects and more work sections.',
  },
  {
    id: 'wireframe-skills',
    src: '/images/wireframe/wireframe-skills.png',
    width: 1920,
    height: 1179,
    alt: 'Hand-drawn sketch for the skills section.',
  },
  {
    id: 'wireframe-testimonials',
    src: '/images/wireframe/wireframe-testimonials.png',
    width: 1920,
    height: 1198,
    alt: 'Hand-drawn sketch for the testimonials and closing section.',
  },
];

export default function WireframeReveal() {
  const { toggleMode } = useTheme();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let frame = null;

    function updateNavVisibility() {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const isNearTop = currentScrollY < 16;
        const isScrollingUp = currentScrollY < lastScrollY.current;

        setIsAtTop(isNearTop);
        setIsNavVisible(isNearTop || isScrollingUp);
        lastScrollY.current = currentScrollY;
      });
    }

    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', updateNavVisibility, { passive: true });
    updateNavVisibility();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateNavVisibility);
    };
  }, []);

  return (
    <main className={`${styles.page} ${isAtTop ? styles.pageAtTop : styles.pageScrolled}`}>
      <nav
        className={`${styles.navShell} ${isNavVisible ? styles.navShellVisible : styles.navShellHidden}`}
        aria-label="Wireframe page navigation"
      >
        <div className={styles.navFrame}>
          <Image
            src="/images/wireframe/wireframe-nav.png"
            alt="Hand-drawn portfolio navigation."
            width={1920}
            height={287}
            sizes="100vw"
            className={styles.navImage}
            priority
            unoptimized
          />

          <a href="#wireframe-hero" className={`${styles.hotspot} ${styles.brandHotspot}`}>
            <span className={styles.srOnly}>Back to wireframe top</span>
          </a>
          <a href="#wireframe-work" className={`${styles.hotspot} ${styles.workHotspot}`}>
            <span className={styles.srOnly}>Go to work section</span>
          </a>
          <a href="#wireframe-skills" className={`${styles.hotspot} ${styles.skillsHotspot}`}>
            <span className={styles.srOnly}>Go to skills section</span>
          </a>
          <a href="#wireframe-testimonials" className={`${styles.hotspot} ${styles.contactHotspot}`}>
            <span className={styles.srOnly}>Go to contact section</span>
          </a>
          <button
            type="button"
            className={`${styles.hotspot} ${styles.toggleHotspot}`}
            onClick={toggleMode}
            aria-label="Return to the polished portfolio"
          />
        </div>
      </nav>

      <div className={styles.sectionStack}>
        {wireframeSections.map(section => (
          <section key={section.id} id={section.id} className={styles.section}>
            <Image
              src={section.src}
              alt={section.alt}
              width={section.width}
              height={section.height}
              sizes="100vw"
              className={styles.sectionImage}
              priority={section.priority}
              unoptimized
            />
          </section>
        ))}
      </div>
    </main>
  );
}
