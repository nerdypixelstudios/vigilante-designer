import styles from './Tooltip.module.css';

export default function Tooltip({
  children,
  content,
  variant = 'normal',
  position = 'top',
  className = '',
  panelClassName = '',
  focusable = true,
}) {
  return (
    <span
      className={`${styles.wrapper} ${className}`}
      tabIndex={focusable ? 0 : undefined}
    >
      {children}
      <span
        className={`${styles.panel} ${position === 'bottom' ? styles.panelBottom : styles.panelTop} ${variant === 'fun' ? styles.panelFun : styles.panelNormal} ${panelClassName}`}
        role="tooltip"
      >
        {content}
      </span>
    </span>
  );
}
