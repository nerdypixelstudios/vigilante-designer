import Link from 'next/link';
import MetaTags from '../../components/shared/MetaTags';
import Navigation from '../../components/sections/Navigation/Navigation';
import Footer from '../../components/sections/Footer/Footer';
import MiniMock from '../../components/sections/MoreFromDesk/MiniMock';
import MoreWorkBrowserFrame from '../../components/sections/MoreFromDesk/MoreWorkBrowserFrame';
import {
  getMoreWorkBySlug,
  getMoreWorkDetailItems,
} from '../../components/sections/MoreFromDesk/moreWorksData';
import { getLaneStyle } from '../../components/sections/MoreFromDesk/moreWorksUtils';
import styles from './more-work-detail.module.css';

const leanPageLinks = [
  { href: '#overview', label: 'Overview' },
  { href: '#product-preview', label: 'Product preview' },
];

export default function MoreWorkDetailPage({ item }) {
  const details = item.details || {};

  return (
    <>
      <MetaTags
        title={`${details.title || item.title} | Lohith Savala`}
        description={details.description || item.note}
      />
      <Navigation
        links={leanPageLinks}
        showToggle={false}
        backHref="/#more-from-desk"
        backLabel="Back to range"
      />
      <main className={styles.page} style={getLaneStyle(item)}>
        <section id="overview" className={styles.hero}>
          <p className={styles.eyebrow}>{details.eyebrow || item.laneTitle}</p>
          <h1>{details.title || item.title}</h1>
          <p className={styles.context}>{details.context || item.note}</p>

          <div className={styles.metaGrid}>
            {(details.stats || [item.tag, item.laneTitle, item.details?.year]).filter(Boolean).map((stat) => (
              <span key={stat}>{stat}</span>
            ))}
          </div>
        </section>

        <section
          id="product-preview"
          className={styles.viewerSection}
          aria-label={`${item.title} preview`}
        >
          <div className={styles.viewerContext}>
            <p>{details.description || item.note}</p>
            <div className={styles.detailList}>
              {details.role ? (
                <span>
                  <strong>Role</strong>
                  {details.role}
                </span>
              ) : null}
              {details.year ? (
                <span>
                  <strong>Year</strong>
                  {details.year}
                </span>
              ) : null}
              {details.outcome ? (
                <span>
                  <strong>Outcome</strong>
                  {details.outcome}
                </span>
              ) : null}
            </div>
            {details.tools?.length ? (
              <div className={styles.toolList}>
                {details.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            ) : null}
          </div>

          <MoreWorkBrowserFrame
            title={item.title}
            eyebrow={item.tag}
            externalUrl={item.externalUrl}
            className={styles.browserFrame}
            bodyClassName={styles.browserBody}
          >
            {item.embedUrl ? (
              <iframe
                src={item.embedUrl}
                title={`${item.title} embedded preview`}
                className={styles.previewIframe}
                loading="lazy"
              />
            ) : (
              <div className={styles.previewPlaceholder}>
                <MiniMock laneId={item.laneId} index={0} />
                <div>
                  <p className={styles.placeholderEyebrow}>Preview shell</p>
                  <h2>{item.title}</h2>
                  <p>
                    This page is ready for the final embedded product/page capture. The context, stats, Chrome frame, and fullscreen behavior are already in place.
                  </p>
                </div>
              </div>
            )}
          </MoreWorkBrowserFrame>
        </section>

        <div className={styles.backRow}>
          <Link href="/#more-from-desk">Back to The Full Range</Link>
        </div>
      </main>
      <Footer variant="lean" />
    </>
  );
}

export function getStaticPaths() {
  return {
    paths: getMoreWorkDetailItems().map((item) => ({
      params: { slug: item.slug },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const item = getMoreWorkBySlug(params.slug);

  if (!item) {
    return { notFound: true };
  }

  return {
    props: { item },
  };
}
