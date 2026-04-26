import Image from 'next/image';
import { useTheme } from '../../shared/ThemeContext';
import { WhiteSwirlyArrow, HandDrawnCircleArrow } from '../../icons/icons';
import styles from './Hero.module.css';

const normalRoles = [
  { num: '01', label: 'Product Design', href: '#more-from-desk' },
  { num: '02', label: 'Web & AI Build', href: '#more-from-desk' },
  { num: '03', label: 'Instructional & Branding', href: '#more-from-desk' },
];

const funRoles = [
  { num: '01', label: 'Experience Recon', href: '#more-from-desk' },
  { num: '02', label: 'AI Build Ops', href: '#more-from-desk' },
  { num: '03', label: 'Signal Corps', href: '#more-from-desk' },
];

export default function Hero() {
  const { isFunMode } = useTheme();

  const bg = isFunMode ? 'bg-fun-surface-black' : 'bg-accent-yellow';
  const roles = isFunMode ? funRoles : normalRoles;
  const roleArrowBg = isFunMode ? '#FFCE2E' : '#000000';
  const roleArrowFg = isFunMode ? '#000000' : '#ffffff';
  const arrowColor = isFunMode ? '#FF5F00' : '#000000';

  return (
    <section id="hero" className={`${bg} ${styles.hero}`}>
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
            <h1 className={`font-cabinet font-extrabold text-ink-950 ${styles.h1Normal}`}>
              Hi, I am Lohith!
            </h1>
          )}
        </div>

        {/* ── Mid row: left / portrait / right ── */}
        <div className={styles.midRow}>

          {/* ── Left zone — sub-pitch + swirly arrow ── */}
          <div className={styles.zoneLeft}>
            {isFunMode ? (
              <p className={`font-caveat text-fun-ink-300 ${styles.subPitchFun}`}>
                Spotted in Gotham after hours with product spec in one hand.<br />
                Builds in the dark, ships before sunrise.
              </p>
            ) : (
              <p className={`font-dm font-extrabold text-ink-800 ${styles.subPitch}`}>
                A Product Designer seasoned in<br />
                end-to-end web design — from spec to shipped.
              </p>
            )}
            <WhiteSwirlyArrow
              className={styles.swirlyArrow}
              color={arrowColor}
            />
          </div>

          {/* ── Centre zone — portrait composition ── */}
          <div className={styles.zoneCentre}>
            <div className={styles.portraitWrap}>

              {/* Grid paper — separate element for animation */}
              <div className={styles.gridPaperWrap}>
                <Image
                  src="/images/hero/hero-grid-paper.webp"
                  alt=""
                  width={490}
                  height={400}
                  className={styles.gridPaper}
                />
              </div>

              {/* Masking tape — separate element for animation */}
              <div className={styles.tapeWrap}>
                <Image
                  src="/images/hero/hero-tape.webp"
                  alt=""
                  width={118}
                  height={77}
                  className={styles.tape}
                />
              </div>

              {/* Portrait cutout — separate element for animation */}
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

          {/* ── Right zone — role list ── */}
          <div className={styles.zoneRight}>
            <ul className={styles.roleList}>
              {roles.map(role => (
                <li key={role.num} className={styles.roleItem}>
                  <div className={styles.roleNameGroup}>
                    <span className={isFunMode
                      ? 'font-caveat text-fun-accent-yellow text-base'
                      : 'font-dm font-extrabold text-ink-500 text-sm'
                    }>
                      {role.num}.
                    </span>
                    <a
                      href={role.href}
                      className={isFunMode
                        ? 'font-caveat font-bold text-fun-ink-50 text-fun-h4 hover:opacity-70'
                        : 'font-dm font-extrabold text-ink-950 text-h4 hover:opacity-70'
                      }
                    >
                      {role.label}
                    </a>
                  </div>
                  <HandDrawnCircleArrow
                    className={styles.roleArrow}
                    bgColor={roleArrowBg}
                    arrowColor={roleArrowFg}
                  />
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
