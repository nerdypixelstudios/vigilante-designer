import { FocusViewIcon, FullViewIcon, PaceLogoGreen } from '../icons/DemoIcons';

const PaceIsland = ({
  isOn = true,
  onToggle,
  isVisible = true,
  paceAnimating = false,
  viewMode = 'focused',
  onViewModeChange,
  showPaceToggle = true,
  id,
}) => {
  const handleToggleClick = () => onToggle?.(!isOn);

  const handleViewChange = (newMode) => {
    if (newMode !== viewMode) onViewModeChange?.(newMode);
  };

  return (
    <div
      id={id}
      className={[
        'pace-island',
        isVisible ? 'pace-island--visible' : '',
        showPaceToggle && isOn ? 'pace-island--on' : 'pace-island--off',
        paceAnimating ? 'pace-island--whoosh' : '',
        !showPaceToggle ? 'pace-island--view-only' : '',
      ].filter(Boolean).join(' ')}
    >
      <div className="pace-island__content">
        {showPaceToggle && (
          <>
            <div className="pace-island__logo">
              <PaceLogoGreen width={44} className="pace-island__logo-icon" />
            </div>
            <button
              className={`pace-island__toggle ${isOn ? 'pace-island__toggle--on' : ''}`}
              onClick={handleToggleClick}
              aria-pressed={isOn}
              aria-label={`PACE is ${isOn ? 'on' : 'off'}. Click to turn ${isOn ? 'off' : 'on'}.`}
            >
              <div className="pace-island__toggle-knob" />
            </button>
            <div className="pace-island__divider" />
          </>
        )}

        <div className="pace-island__view-section">
          {!showPaceToggle && (
            <span className="pace-island__view-label">
              {viewMode === 'focused' ? 'Focus' : 'Full'}
            </span>
          )}
          <div className="pace-island__view-switcher">
            <button
              className={`pace-island__view-btn ${viewMode === 'focused' ? 'pace-island__view-btn--active' : ''}`}
              onClick={() => handleViewChange('focused')}
              title="Focus View"
              aria-label="Switch to Focus View"
              aria-pressed={viewMode === 'focused'}
            >
              <FocusViewIcon size={16} />
            </button>
            <button
              className={`pace-island__view-btn ${viewMode === 'full' ? 'pace-island__view-btn--active' : ''}`}
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
    </div>
  );
};

export default PaceIsland;
