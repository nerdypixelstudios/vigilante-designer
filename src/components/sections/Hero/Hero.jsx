import Image from 'next/image';
import { useTheme } from '../../shared/ThemeContext';
import { WhiteSwirlyArrow, HandDrawnCircleArrow, ExperienceSticker, SmallArrow } from '../../icons/icons';
import styles from './Hero.module.css';

const normalProjects = [
  { num: '01', label: 'e-GMAT Website',  sub: 'Public marketing site',         href: '#' },
  { num: '02', label: 'NEURON',          sub: 'GMAT practice platform',        href: '/case-studies/neuron' },
  { num: '03', label: 'SPARK Presenter', sub: 'Scalable learning content stack', href: '#' },
  { num: '04', label: 'SAT LMS',         sub: 'Adaptive learning app',         href: '#' },
];

const funProjects = [
  { num: '01', label: 'e-GMAT Website',  sub: 'Public marketing site',         href: '#' },
  { num: '02', label: 'NEURON',          sub: 'GMAT practice platform',        href: '/case-studies/neuron' },
  { num: '03', label: 'SPARK Presenter', sub: 'Scalable learning content stack', href: '#' },
  { num: '04', label: 'SAT LMS',         sub: 'Adaptive learning app',         href: '#' },
];

export default function Hero() {
  const { isFunMode } = useTheme();

  const bg = isFunMode ? 'bg-fun-surface-black' : 'bg-accent-yellow';
  const projects = isFunMode ? funProjects : normalProjects;

  // Icon colors driven by CSS custom properties — tokens, not hex.
  // Fun mode: red across the board (no yellow mixed in).
  const iconVars = isFunMode
    ? {
        '--swirly-arrow-color': 'var(--color-fun-accent-red)',
        '--role-arrow-bg': 'var(--color-fun-accent-red)',
        '--role-arrow-fg': 'var(--color-fun-ink-50)',
      }
    : {
        '--swirly-arrow-color': 'var(--color-surface-white)',
        '--role-arrow-bg': 'var(--color-ink-950)',
        '--role-arrow-fg': 'var(--color-surface-white)',
      };

  return (
    <section id="hero" className={`${bg} ${styles.hero}`} style={iconVars}>
      <div className={styles.heroInner}>

        {/* ── Full-width headline row ── */}
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
              <ExperienceSticker className={styles.experienceSticker} />
            </>
          )}
        </div>

        {/* ── Mid row: left / portrait / right ── */}
        <div className={styles.midRow}>

          {/* ── Left zone — proof claim + swirly arrow ── */}
          <div className={styles.zoneLeft}>
            {isFunMode ? (
              <p className={`font-caveat text-fun-ink-300 ${styles.subPitchFun}`}>
                Spotted in Gotham after hours with product spec in one hand.<br />
                Builds in the dark, ships before sunrise.
              </p>
            ) : (
              <p className={`font-dm text-ink-800 ${styles.proofClaim}`}>
                <strong className={styles.proofClaimLead}>Shipped 4 products in 6 months</strong>
                {' '}— ~3× my pre-AI pace.<br /><br />
                Built with{' '}
                <a href="/case-studies/designforge" className={styles.designForgeLink}>
                  DesignForge<span className={styles.designForgeArrow} aria-hidden="true">↗</span>
                </a>
                {' '}— a 6-phase AI + human methodology.
              </p>
            )}
            <WhiteSwirlyArrow className={styles.swirlyArrow} />
          </div>

          {/* ── Centre zone — portrait composition ── */}
          <div className={styles.zoneCentre}>
            <div className={styles.portraitWrap}>

              {/* Grid paper — backdrop, behind H1 */}
              <div className={styles.gridPaperWrap}>
                <Image
                  src="/images/hero/hero-grid-paper.webp"
                  alt=""
                  width={490}
                  height={400}
                  className={styles.gridPaper}
                />
              </div>

              {/* Masking tape — at top edge of grid paper, off-center to avoid the head */}
              <div className={styles.tapeWrap}>
                <Image
                  src="/images/hero/hero-tape.webp"
                  alt=""
                  width={118}
                  height={77}
                  className={styles.tape}
                />
              </div>

              {/* Portrait cutout — front layer, overlaps H1 */}
              <div className={styles.portraitImgWrap}>
                <Image
                  src="/images/hero/hero-portrait-normal.webp"
                  alt="Lohith Savala, Product Designer"
                  width={596}
                  height={504}
                  className={styles.portraitImg}
                  priority
                />
              </div>

              {/* Fun mode: spray glow */}
              {isFunMode && <div className={styles.sprayGlow} />}

            </div>
          </div>

          {/* ── Right zone — project chips ── */}
          <div className={styles.zoneRight}>
            <div className={styles.workBlock}>
              {isFunMode ? (
                <span className={`font-dm font-extrabold ${styles.recentWorkLabel}`}>
                  Recent Cases
                </span>
              ) : (
                <span className={`font-dm font-bold text-ink-950 ${styles.recentWorkTilted}`}>
                  Recent work
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
                    }`}>
                      {project.num}.
                    </span>
                    <span className={styles.roleLabelGroup}>
                      <span className={`${styles.roleLabel} ${isFunMode
                        ? 'font-caveat font-bold text-fun-ink-50 text-fun-h4'
                        : 'font-dm font-extrabold text-ink-950 text-h4'
                      }`}>
                        {project.label}
                      </span>
                      <span className={`${styles.roleSub} ${isFunMode
                        ? 'font-caveat text-fun-ink-300'
                        : 'font-dm text-ink-700'
                      }`}>
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
