import { PaceLogoGreen, FocusViewIcon, FullViewIcon } from '../icons/DemoIcons';
import styles from '../../styles/pace.module.css';

export default function PaceIsland({ isOn, onToggle, viewMode, onViewModeChange, id }) {
  return (
    <div className={styles.paceIslandWrapper}>
      <div
        id={id}
        className={`${styles.paceIsland} ${isOn ? styles.on : ''}`}
      >
        {/* PACE Logo */}
        <div className={styles.paceIslandLogo}>
          <PaceLogoGreen width={40} />
        </div>

        {/* Toggle */}
        <button
          className={`${styles.paceToggle} ${isOn ? styles.on : ''}`}
          onClick={() => onToggle?.(!isOn)}
          aria-pressed={isOn}
          aria-label={`PACE is ${isOn ? 'on' : 'off'}. Click to toggle.`}
        >
          <div className={styles.paceToggleKnob} />
        </button>

        <span className={styles.paceToggleLabel}>{isOn ? 'ON' : 'OFF'}</span>

        <div className={styles.paceIslandDivider} />

        {/* View mode switcher */}
        <div className={styles.viewModeGroup}>
          <button
            className={`${styles.viewModeBtn} ${viewMode === 'focused' ? styles.active : ''}`}
            onClick={() => onViewModeChange?.('focused')}
            title="Focused view"
            aria-label="Focused view"
          >
            <FocusViewIcon size={14} />
          </button>
          <button
            className={`${styles.viewModeBtn} ${viewMode === 'full' ? styles.active : ''}`}
            onClick={() => onViewModeChange?.('full')}
            title="Full view"
            aria-label="Full view"
          >
            <FullViewIcon size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
