import Image from 'next/image';
import { useTheme } from '../../shared/ThemeContext';
import { WhiteSwirlyArrow, HandDrawnCircleArrow, SmallArrow } from '../../icons/icons';
import styles from './Hero.module.css';

const normalProjects = [
  { num: '01', label: 'SAT LMS', sub: 'Adaptive learning app', href: '/case-studies/sat-lms' },
  { num: '02', label: 'S.P.A.R.K. Presenter', sub: 'Scalable learning content stack', href: '/case-studies/spark-presenter' },
  { num: '03', label: 'e-GMAT Website', sub: 'Public marketing site', href: '#' },
  { num: '04', label: 'NEURON', sub: 'GMAT practice platform', href: '#' },
];

const funProjects = [
  { num: '01', label: 'SAT LMS', sub: 'Adaptive learning app', href: '/case-studies/sat-lms' },
  { num: '02', label: 'S.P.A.R.K. Presenter', sub: 'Scalable learning content stack', href: '/case-studies/spark-presenter' },
  { num: '03', label: 'e-GMAT Website', sub: 'Public marketing site', href: '#' },
  { num: '04', label: 'NEURON', sub: 'GMAT practice platform', href: '#' },
];

export default function Hero() {
  const { isFunMode } = useTheme();

  const bg = isFunMode ? 'bg-fun-surface-black' : 'bg-accent-yellow';
  const projects = isFunMode ? funProjects : normalProjects;

  const iconVars = isFunMode
    ? {
        '--swirly-arrow-color': 'var(--color-fun-accent-red)',
        '--role-arrow-bg': 'var(--color-fun-accent-red)',
        '--role-arrow-fg': 'var(--color-fun-ink-50)',
        '--portrait-fade-bg': 'var(--color-fun-surface-black)',
      }
    : {
        '--swirly-arrow-color': 'var(--color-surface-white)',
        '--role-arrow-bg': 'var(--color-ink-950)',
        '--role-arrow-fg': 'var(--color-surface-white)',
        '--portrait-fade-bg': 'var(--color-accent-yellow)',
      };

  return (
    <section id="hero" className={`${bg} ${styles.hero}`} style={iconVars}>
      <div className={styles.heroInner}>
        <div className={styles.h1Row}>
          {isFunMode ? (
            <>
              <p className={`font-dm font-extrabold text-fun-ink-300 ${styles.h1FunSmall}`}>
                Product Designer by Day,
              </p>
              <h1 className={`font-rock-salt text-fun-ink-50 leading-rock-salt ${styles.h1Fun}`}>
                Vigilante by Night!
              </h1>
            </>
          ) : (
            <>
              <p className={`font-dm text-ink-800 ${styles.kicker}`}>
                Hi, I am <strong className={styles.kickerBold}>Lohith!</strong>
              </p>
              <h1 className={`font-cabinet font-extrabold text-ink-950 ${styles.h1Normal}`}>
                Product Designer
              </h1>
              <p className={`font-dm text-ink-950 ${styles.roleStrip}`}>
                seasoned in <strong className={styles.roleStripBold}>end-to-end web design.</strong>
              </p>
              <Image
                src="/images/hero/hero-experience-sticker.svg"
                alt="7 plus years of design at scale"
                width={148}
                height={148}
                className={styles.experienceSticker}
                unoptimized
              />
            </>
          )}
        </div>

        <div className={styles.midRow}>
          <div className={styles.zoneLeft}>
            {isFunMode ? (
              <p className={`font-caveat text-fun-ink-300 ${styles.subPitchFun}`}>
                Spotted in Gotham after hours with product spec in one hand.
                <br />
                Builds in the dark, ships before sunrise.
              </p>
            ) : (
              <p className={`font-dm text-ink-800 ${styles.proofClaim}`}>
                <strong className={styles.proofClaimLead}>Shipped 4 products in 6 months</strong>
                {' '} - ~3x my pre-AI pace.
                <br />
                <br />
                Built with{' '}
                <a href="/case-studies/designforge" className={styles.designForgeLink}>
                  DesignForge
                  <span className={styles.designForgeArrow} aria-hidden="true">{'\u2197'}</span>
                </a>
                {' '} - a 6-phase AI + human methodology.
              </p>
            )}
            <WhiteSwirlyArrow className={styles.swirlyArrow} />
          </div>

          <div className={styles.zoneCentre}>
            <div className={styles.portraitWrap}>
              <div className={styles.gridPaperWrap}>
                <Image
                  src="/images/hero/hero-grid-paper.webp"
                  alt=""
                  width={490}
                  height={400}
                  className={styles.gridPaper}
                />
              </div>

              <div className={styles.tapeWrap}>
                <Image
                  src="/images/hero/hero-tape.webp"
                  alt=""
                  width={118}
                  height={77}
                  className={styles.tape}
                />
              </div>

              <div className={styles.portraitImgWrap}>
                <Image
                  src="/images/hero/hero-portrait-normal.png"
                  alt="Lohith Savala, Product Designer"
                  width={596}
                  height={504}
                  className={styles.portraitImg}
                  priority
                  unoptimized
                />
              </div>

              <div className={styles.portraitFade} aria-hidden="true" />

              {isFunMode && <div className={styles.sprayGlow} />}
            </div>
          </div>

          <div className={styles.zoneRight}>
            <div className={styles.workBlock}>
              {isFunMode ? (
                <span className={`font-dm font-extrabold ${styles.recentWorkLabel}`}>
                  Recent Cases
                </span>
              ) : (
                <span className={`font-dm font-bold ${styles.recentWorkTilted}`}>
                  <span className={styles.recentWorkLabelText}>Recent work</span>
                  <SmallArrow className={styles.recentWorkArrow} />
                </span>
              )}
              <ul className={styles.roleList}>
                {projects.map(project => (
                  <li key={project.num} className={styles.roleItem}>
                    <a href={project.href} className={styles.roleLink}>
                      <span className={`${styles.roleNumber} ${isFunMode
                        ? 'font-caveat text-fun-accent-red'
                        : 'font-dm font-extrabold text-surface-white'
                      }`}
                      >
                        {project.num}.
                      </span>
                      <span className={styles.roleLabelGroup}>
                        <span className={`${styles.roleLabel} ${isFunMode
                          ? 'font-caveat font-bold text-fun-ink-50 text-fun-h4'
                          : 'font-dm font-extrabold text-ink-950 text-h4'
                        }`}
                        >
                          {project.label}
                        </span>
                        <span className={`${styles.roleSub} ${isFunMode
                          ? 'font-caveat text-fun-ink-300'
                          : 'font-dm text-ink-700'
                        }`}
                        >
                          {project.sub}
                        </span>
                      </span>
                      <span className={styles.roleArrowWrap}>
                        <HandDrawnCircleArrow className={styles.roleArrow} />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
