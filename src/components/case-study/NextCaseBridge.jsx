import Image from 'next/image';

export default function NextCaseBridge({
  styles,
  prelude,
  heading,
  pointer,
  preview,
}) {
  return (
    <div className={styles.nextCaseBridge}>
      <div className={styles.nextCaseStatement}>
        <p className={styles.nextCasePrelude}>{prelude}</p>
        <h2>{heading}</h2>
      </div>
      <div className={styles.nextCaseBottom}>
        {pointer && (
          <div className={styles.nextCasePointer} aria-hidden="true">
            <Image
              src={pointer.src}
              alt=""
              width={pointer.width}
              height={pointer.height}
              sizes={pointer.sizes}
              unoptimized={pointer.unoptimized}
              className={styles.nextCasePointerImage}
            />
          </div>
        )}
        {preview}
      </div>
    </div>
  );
}
