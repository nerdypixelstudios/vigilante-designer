import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, LightningBoltIcon } from '../icons/DemoIcons';
import ActivityCard from './ActivityCard';
import SkipIndicator from './SkipIndicator';
import TimeBadge from './TimeBadge';

const SHADEABLE_TYPES = ['CONCEPT', 'PROCESS_SKILL'];
const isItemShadeable = (item) => item.shaded === true && SHADEABLE_TYPES.includes(item.contentType);

export default function NextUpSection({
  nextUpBlock,
  onActivityClick,
  onLockedClick,
  isPaceOn = false,
  diagnosticStatus = 'completed',
  onTakeDiagnostic,
  getActivityTypeTheme,
  formatTimeMMSS,
  preferredActivityId,
  title = 'Next Up',
  descriptor = 'Your immediate next steps in this course',
}) {
  const [cardsCanScrollLeft, setCardsCanScrollLeft] = useState(false);
  const [cardsCanScrollRight, setCardsCanScrollRight] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportRatio, setViewportRatio] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const cardsContainerRef = useRef(null);
  const scrollTrackRef = useRef(null);

  const checkCardsScrollPosition = useCallback(() => {
    const container = cardsContainerRef.current;
    if (!container) return;
    const isOverflowing = container.scrollWidth > container.clientWidth + 1;
    setCardsCanScrollLeft(isOverflowing && container.scrollLeft > 10);
    setCardsCanScrollRight(
      isOverflowing && container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
    const maxScroll = container.scrollWidth - container.clientWidth;
    const progress = maxScroll > 0 ? container.scrollLeft / maxScroll : 0;
    setScrollProgress(progress);
    const ratio = container.scrollWidth > 0 ? container.clientWidth / container.scrollWidth : 1;
    setViewportRatio(Math.min(ratio, 1));
  }, []);

  const scrollToProgress = useCallback((progress) => {
    const container = cardsContainerRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    container.scrollTo({ left: progress * maxScroll, behavior: 'smooth' });
  }, []);

  const handleTrackClick = useCallback((e) => {
    const track = scrollTrackRef.current;
    if (!track || isDragging) return;
    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const trackWidth = rect.width;
    const clickProgress = clickX / trackWidth;
    const halfPillRatio = viewportRatio / 2;
    const targetProgress = Math.max(0, Math.min(1, (clickProgress - halfPillRatio) / (1 - viewportRatio)));
    scrollToProgress(targetProgress);
  }, [isDragging, scrollToProgress, viewportRatio]);

  const handleDragStart = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (e) => {
      const track = scrollTrackRef.current;
      const container = cardsContainerRef.current;
      if (!track || !container) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const rect = track.getBoundingClientRect();
      const mouseX = clientX - rect.left;
      const trackWidth = rect.width;
      const pillWidth = trackWidth * viewportRatio;
      const maxPillLeft = trackWidth - pillWidth;
      const pillLeft = Math.max(0, Math.min(maxPillLeft, mouseX - pillWidth / 2));
      const newProgress = maxPillLeft > 0 ? pillLeft / maxPillLeft : 0;
      const maxScroll = container.scrollWidth - container.clientWidth;
      container.scrollLeft = newProgress * maxScroll;
    };
    const handleEnd = () => setIsDragging(false);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove, { passive: true });
    document.addEventListener('touchend', handleEnd);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, viewportRatio]);

  useEffect(() => {
    const timer = setTimeout(() => {
      checkCardsScrollPosition();
    }, 100);
    window.addEventListener('resize', checkCardsScrollPosition);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkCardsScrollPosition);
    };
  }, [checkCardsScrollPosition, nextUpBlock]);

  if (!nextUpBlock?.contentItems?.length) {
    return null;
  }

  const MAX_DISPLAYED_CARDS = 5;
  const nonCompletedActivities = nextUpBlock.contentItems
    .map((activity, originalIndex) => ({ ...activity, originalIndex }))
    .filter((activity) => activity.progressStatus !== 'COMPLETED');

  const buildDisplayItems = () => {
    const items = [];
    if (!isPaceOn) {
      nonCompletedActivities.slice(0, MAX_DISPLAYED_CARDS).forEach((activity, index) => {
        items.push({ type: 'card', activity, isFirst: index === 0 });
      });
      return items;
    }

    let cardCount = 0;
    let i = 0;
    while (i < nonCompletedActivities.length && cardCount < MAX_DISPLAYED_CARDS) {
      const activity = nonCompletedActivities[i];
      if (!isItemShadeable(activity)) {
        items.push({ type: 'card', activity, isFirst: cardCount === 0 });
        cardCount += 1;
        i += 1;
        continue;
      }

      const skippedGroup = [];
      while (i < nonCompletedActivities.length && isItemShadeable(nonCompletedActivities[i])) {
        skippedGroup.push(nonCompletedActivities[i]);
        i += 1;
      }
      items.push({ type: 'skip', activities: skippedGroup });
    }

    return items;
  };

  const displayItems = buildDisplayItems();
  const displayedActivities = displayItems.filter((item) => item.type === 'card').map((item) => item.activity);
  const inProgressIndex = displayedActivities.findIndex((activity) => activity.progressStatus === 'INPROGRESS');
  const notStartedIndex = displayedActivities.findIndex((activity) => activity.progressStatus === 'NOT_STARTED');
  const currentIndex = inProgressIndex !== -1 ? inProgressIndex : (notStartedIndex !== -1 ? notStartedIndex : 0);

  return (
    <section className="next-up-section">
      <div className="next-up-header">
        <div className="next-up-title-container">
          <div className="next-up-title-group">
            <span className="next-up-title">{title}</span>
            <span className="next-up-descriptor">{descriptor}</span>
          </div>
        </div>
        {viewportRatio < 1 && (
          <div className="scroll-progress-track" ref={scrollTrackRef} onClick={handleTrackClick}>
            <div
              className={`scroll-progress-pill ${isDragging ? 'dragging' : ''}`}
              style={{
                width: `${viewportRatio * 100}%`,
                left: `${scrollProgress * (1 - viewportRatio) * 100}%`,
              }}
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
            />
          </div>
        )}
      </div>

      <div className="activity-cards-wrapper">
        {cardsCanScrollLeft && (
          <div className="cards-scroll-fade cards-scroll-fade-left">
            <button className="cards-scroll-arrow" onClick={() => cardsContainerRef.current?.scrollBy({ left: -284, behavior: 'smooth' })}>
              <ChevronLeftIcon size={18} />
            </button>
          </div>
        )}

        <div className="activity-cards-container" ref={cardsContainerRef} onScroll={checkCardsScrollPosition}>
          {diagnosticStatus === 'not_attempted' && onTakeDiagnostic && (
            <div id="demo-diagnostic-card" className="activity-card diagnostic-card current-card" onClick={onTakeDiagnostic}>
              <div className="activity-card-top diagnostic">
                <div className="activity-card-header">
                  <div className="activity-card-number diagnostic-badge">
                    <LightningBoltIcon size={14} />
                  </div>
                </div>
                <div className="activity-card-body">
                  <h3 className="activity-card-name">Personalize Your Path</h3>
                  <div className="activity-card-type-chip diagnostic">
                    <LightningBoltIcon size={14} />
                    <span>Diagnostic</span>
                  </div>
                </div>
              </div>
              <div className="activity-card-footer">
                <div className="activity-card-time-stack">
                  <TimeBadge minutes={10} size="xs" />
                </div>
                <button className="activity-card-cta diagnostic-cta">
                  Start
                  <ChevronRightIcon size={14} />
                </button>
              </div>
            </div>
          )}

          {displayItems.map((item, index) => {
            if (item.type === 'skip') {
              const isFirst = index === 0;
              const isLast = index === displayItems.length - 1;
              const position = isFirst ? 'start' : (isLast ? 'end' : 'middle');
              return (
                <SkipIndicator
                  key={`skip-${index}`}
                  skippedActivities={item.activities}
                  getActivityTypeTheme={getActivityTypeTheme}
                  position={position}
                />
              );
            }

            const activity = item.activity;
            const cardIndex = displayItems.slice(0, index).filter((entry) => entry.type === 'card').length;
            const typeTheme = getActivityTypeTheme(activity.contentType);
            const isCurrent = diagnosticStatus === 'not_attempted' && onTakeDiagnostic ? false : cardIndex === currentIndex;
            return (
              <ActivityCard
                key={activity.contentId}
                activity={activity}
                index={activity.originalIndex}
                isCurrent={isCurrent}
                isCompleted={activity.progressStatus === 'COMPLETED'}
                typeTheme={typeTheme}
                onActivityClick={onActivityClick}
                onLockedClick={onLockedClick}
                formatTimeMMSS={formatTimeMMSS}
                cardId={Number(activity.contentId) === Number(preferredActivityId) ? 'demo-personalized-activity' : undefined}
              />
            );
          })}
        </div>

        {cardsCanScrollRight && (
          <div className="cards-scroll-fade cards-scroll-fade-right">
            <button className="cards-scroll-arrow" onClick={() => cardsContainerRef.current?.scrollBy({ left: 284, behavior: 'smooth' })}>
              <ChevronRightIcon size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
