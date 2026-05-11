import { useEffect, useRef } from 'react';
import MiniMock from './MiniMock';
import MoreWorkBrowserFrame from './MoreWorkBrowserFrame';
import { getLaneStyle } from './moreWorksUtils';
import styles from './MoreFromDesk.module.css';

export default function MoreWorkImageModal({ activeItem, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!activeItem) return undefined;

    const previouslyFocused = document.activeElement;
    const modal = modalRef.current;
    const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !modal) return;

      const focusable = Array.from(modal.querySelectorAll(focusableSelector));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    modal?.querySelector(focusableSelector)?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [activeItem, onClose]);

  if (!activeItem) return null;

  const { item, lane } = activeItem;
  const details = item.details || {};

  return (
    <div className={styles.modalOverlay} role="presentation" onMouseDown={onClose}>
      <div
        ref={modalRef}
        className={styles.modalDialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="more-work-modal-title"
        style={getLaneStyle(lane)}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <MoreWorkBrowserFrame
          title={item.title}
          eyebrow={item.tag}
          closeLabel={`Close ${item.title}`}
          onClose={onClose}
          className={styles.modalFrame}
          bodyClassName={styles.modalFrameBody}
        >
          <div className={styles.modalContent}>
            <div className={styles.modalCopy}>
              <p className={styles.modalEyebrow}>{details.eyebrow}</p>
              <h3 id="more-work-modal-title" className={styles.modalTitle}>{details.title || item.title}</h3>
              <p className={styles.modalText}>{details.description || item.note}</p>
              <div className={styles.detailMeta}>
                {(details.stats || [item.tag, lane.metric]).map((stat) => (
                  <span key={stat}>{stat}</span>
                ))}
              </div>
            </div>
            <div className={styles.modalVisual}>
              <MiniMock laneId={lane.id} index={0} />
            </div>
          </div>
        </MoreWorkBrowserFrame>
      </div>
    </div>
  );
}
