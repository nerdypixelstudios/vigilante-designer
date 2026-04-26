import { useTheme } from '../../shared/ThemeContext';
import { SquiggleArrow, MaskingTape, CircleArrow } from '../../icons/icons';
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
  const roleArrowColor = isFunMode ? '#FF5F00' : '#000000';

  return (
    <section id="hero" className={`${bg} ${styles.hero}`}>
      <div className={styles.heroInner}>

        {/* ── Left zone — pitch ── */}
        <div className={styles.zoneLeft}>
          {isFunMode ? (
            <>
              <div className={styles.h1FunWrap}>
                <p className={`font-dm font-extrabold text-fun-ink-300 ${styles.h1FunSmall}`}>
                  Product Designer by Day,
                </p>
                <h1 className={`font-rock-salt text-fun-ink-50 leading-rock-salt ${styles.h1Fun}`}>
                  Vigilante by Night!
                </h1>
              </div>
              <p className={`font-caveat text-fun-ink-300 ${styles.subPitchFun}`}>
                Spotted in Gotham after hours with product spec in one hand.<br />
                Builds in the dark, ships before sunrise.
              </p>
            </>
          ) : (
            <>
              <h1 className={`font-cabinet font-extrabold text-ink-950 ${styles.h1Normal}`}>
                Hi, I am Lohith!
              </h1>
              <p className={`font-dm font-extrabold text-ink-800 ${styles.subPitch}`}>
                A Product Designer seasoned in<br />
                end-to-end web design — from spec to shipped.
              </p>
            </>
          )}
          <SquiggleArrow
            className={styles.squiggle}
            color={isFunMode ? '#FF5F00' : '#000000'}
          />
        </div>

        {/* ── Centre zone — portrait ── */}
        <div className={styles.zoneCentre}>
          {isFunMode ? (
            <div className={styles.portraitFun}>
              <div className={styles.sprayGlow} />
              <div className={styles.portraitSilhouette}>
                <span className="font-dm text-fun-ink-500 text-sm">Portrait</span>
              </div>
              <MaskingTape className={styles.maskingTapeFun} />
            </div>
          ) : (
            <div className={styles.portraitNormal}>
              <div className={styles.gridBacker} />
              <MaskingTape className={styles.maskingTape} />
              <div className={styles.portraitPlaceholder}>
                <span className="font-dm text-ink-500 text-sm">Portrait</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Right zone — role list ── */}
        <div className={styles.zoneRight}>
          <ul className={styles.roleList}>
            {roles.map(role => (
              <li key={role.num} className={styles.roleItem}>
                <span className={isFunMode
                  ? 'font-caveat text-fun-accent-yellow text-base'
                  : 'font-dm font-extrabold text-ink-500 text-sm'
                }>
                  {role.num}.
                </span>
                <a
                  href={role.href}
                  className={isFunMode
                    ? 'font-caveat font-bold text-fun-ink-50 text-fun-h4 ml-2 hover:opacity-70'
                    : 'font-dm font-extrabold text-ink-950 text-h4 ml-2 hover:opacity-70'
                  }
                >
                  {role.label}
                </a>
                <CircleArrow
                  className={styles.roleArrow}
                  color={roleArrowColor}
                />
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
