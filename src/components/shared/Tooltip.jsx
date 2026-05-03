import styles from './Tooltip.module.css';

export default function Tooltip({
  children,
  content,
  variant = 'normal',
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
        className={`${styles.panel} ${variant === 'fun' ? styles.panelFun : styles.panelNormal} ${panelClassName}`}
        role="tooltip"
      >
        {content}
      </span>
    </span>
  );
}
