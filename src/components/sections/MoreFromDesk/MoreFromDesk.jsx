import { useCallback, useState } from 'react';
import { useTheme } from '../../shared/ThemeContext';
import MoreWorkImageModal from './MoreWorkImageModal';
import RangeMorphStage from './RangeMorphStage';
import { moreWorkLanes } from './moreWorksData';
import styles from './MoreFromDesk.module.css';

export default function MoreFromDesk() {
  const { isFunMode } = useTheme();
  const [activeModalItem, setActiveModalItem] = useState(null);

  const openModal = useCallback((item, lane) => {
    setActiveModalItem({ item, lane });
  }, []);

  const closeModal = useCallback(() => {
    setActiveModalItem(null);
  }, []);

  return (
    <section
      id="more-from-desk"
      className={`${styles.section} ${isFunMode ? styles.sectionFun : styles.sectionNormal}`}
    >
      <div className={styles.inner}>
        <header className={styles.headline}>
          <p className={styles.eyebrow}>
            {isFunMode ? 'Every mission has a story.' : 'Beyond the headline work.'}
          </p>
          <h2 className={isFunMode ? styles.h2Fun : styles.h2Normal}>
            {isFunMode ? (
              'The Full Dossier!'
            ) : (
              <>
                The Full <span>Range!</span>
              </>
            )}
          </h2>
          <p className={styles.description}>
            <strong>Product systems, web builds, and brand collateral</strong> - the wider body of work behind how I think, design, and ship.
          </p>
        </header>

        <RangeMorphStage lanes={moreWorkLanes} onOpenModal={openModal} />
      </div>

      <MoreWorkImageModal activeItem={activeModalItem} onClose={closeModal} />
    </section>
  );
}
