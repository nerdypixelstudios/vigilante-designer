import styles from './MoreFromDesk.module.css';

export default function MiniMock({ laneId }) {
  return (
    <div className={`${styles.miniMock} ${styles[`miniMock${laneId}`] || ''}`} aria-hidden="true" />
  );
}
