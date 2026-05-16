import {
  FocusViewIcon,
  FullViewIcon,
  PaceLogoGreen,
  LightningBoltIcon,
} from '../icons/DemoIcons';

const formatTimeSaved = (hours) => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};

export default function HeroPaceIsland({
  isOn = true,
  onToggle,
  paceAnimating = false,
  viewMode = 'focused',
  onViewModeChange,
  showPaceToggle = true,
  hoursSaved = 0,
  activitiesSkipped = 0,
}) {
  const handleToggleClick = () => {
    onToggle?.(!isOn);
  };

  const handleViewChange = (newMode) => {
    if (newMode !== viewMode) {
      onViewModeChange?.(newMode);
    }
  };

  return (
    <div
      className={[
        'hero-pace-island',
        showPaceToggle && isOn ? 'hero-pace-island--on' : 'hero-pace-island--off',
        paceAnimating ? 'hero-pace-island--whoosh' : '',
        !showPaceToggle ? 'hero-pace-island--view-only' : '',
      ].filter(Boolean).join(' ')}
    >
      <div className="hero-pace-island__content">
        {showPaceToggle && (
          <>
            <div className="hero-pace-island__logo">
              <PaceLogoGreen width={52} className="hero-pace-island__logo-icon" />
            </div>

            <button
              className={`hero-pace-island__toggle ${isOn ? 'hero-pace-island__toggle--on' : ''}`}
              onClick={handleToggleClick}
              aria-pressed={isOn}
              aria-label={`PACE is ${isOn ? 'on' : 'off'}. Click to turn ${isOn ? 'off' : 'on'}.`}
            >
              <div className="hero-pace-island__toggle-knob" />
            </button>

            <div className="hero-pace-island__divider" />
          </>
        )}

        <div className="hero-pace-island__view-section">
          <span className="hero-pace-island__view-label">
            {viewMode === 'focused' ? 'Focus' : 'Full'}
          </span>

          <div className="hero-pace-island__view-switcher">
            <button
              className={`hero-pace-island__view-btn ${viewMode === 'focused' ? 'hero-pace-island__view-btn--active' : ''}`}
              onClick={() => handleViewChange('focused')}
              title="Focus View"
              aria-label="Switch to Focus View"
              aria-pressed={viewMode === 'focused'}
            >
              <FocusViewIcon size={16} />
            </button>
            <button
              className={`hero-pace-island__view-btn ${viewMode === 'full' ? 'hero-pace-island__view-btn--active' : ''}`}
              onClick={() => handleViewChange('full')}
              title="Full View"
              aria-label="Switch to Full View"
              aria-pressed={viewMode === 'full'}
            >
              <FullViewIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      {showPaceToggle && isOn && (
        <div className="hero-pace-island__stats-bar">
          <LightningBoltIcon size={14} />
          <span className="hero-pace-island__stats-text">
            <strong>{formatTimeSaved(hoursSaved)}</strong> saved
            <span className="hero-pace-island__stats-dot">.</span>
            <strong>{activitiesSkipped}</strong> activities skipped
          </span>
        </div>
      )}
    </div>
  );
}
