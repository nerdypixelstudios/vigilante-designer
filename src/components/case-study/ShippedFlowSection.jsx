import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  LiveProductArrowIcon,
  ShippedCourseLandingIcon,
  ShippedDiagnosticIcon,
  ShippedLearningIcon,
  ShippedNextIcon,
  ShippedPathIcon,
  ShippedRemedialIcon,
  ShippedResultsIcon,
  VideoEnterFullscreenIcon,
  VideoExitFullscreenIcon,
} from '../icons/icons';
import { SatLmsDemo } from './sat-lms-demo';
import styles from './ShippedFlowSection.module.css';

const liveProductUrl = 'https://prismlearning.academy/sat/prep/course/sentence_foundations';

const mapNodes = [
  ['node1', '1', 'Course landing', 'The learner enters the course and sees the diagnostic as the first clear action.', ShippedCourseLandingIcon],
  ['node2', '2', 'Attempt diagnostic', 'The learner starts the diagnostic to establish a reliable baseline.', ShippedDiagnosticIcon],
  ['node3', '3', 'Diagnostic results', 'The system turns performance into direction instead of showing a raw score alone.', ShippedResultsIcon],
  ['node4', '4', 'Personalized path', 'The product generates a focused path based on what the learner knows and still needs to prove.', ShippedPathIcon],
  ['node5', '5', 'Start learning in personalized path', 'The learner begins with one recommended lesson inside the personalized path.', ShippedLearningIcon],
  ['node6', '6', 'Remedial activity', 'If mastery is not demonstrated, the learner receives targeted remedial work.', ShippedRemedialIcon, true],
  ['node7', '7', 'Next activity / section', 'If mastery is achieved - or after remediation - the learner proceeds to the next activity.', ShippedNextIcon, true],
];

export default function ShippedFlowSection() {
  const [activeTab, setActiveTab] = useState('demo');
  const [isDemoFullscreen, setIsDemoFullscreen] = useState(false);
  const demoViewportRef = useRef(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsDemoFullscreen(document.fullscreenElement === demoViewportRef.current);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleDemoFullscreen = () => {
    const demoViewport = demoViewportRef.current;

    if (!demoViewport) {
      return;
    }

    if (document.fullscreenElement) {
      document.exitFullscreen?.();
      return;
    }

    demoViewport.requestFullscreen?.();
  };

  return (
    <section id="flow" className={styles.section} aria-labelledby="shipped-flow-heading">
      <Image
        src="/images/case-studies/sat-lms/shipped-flow-sky-background.jpg"
        alt=""
        fill
        sizes="100vw"
        className={styles.skyImage}
        aria-hidden="true"
      />
      <div className={styles.skyWash} aria-hidden="true" />
      <div className={styles.skyGlow} aria-hidden="true" />

      <div className={styles.container}>
        <header>
          <p className={styles.eyebrow}>Shipped Flow</p>
          <h2 id="shipped-flow-heading" className={styles.heading}>
            <span className={styles.staggerWord} style={{ '--word-index': 0 }}>Experience</span>{' '}
            <span className={styles.staggerWord} style={{ '--word-index': 1 }}>it</span>{' '}
            <span className={`${styles.staggerWord} ${styles.headingAccent}`} style={{ '--word-index': 2 }}>yourself!</span>
          </h2>
          <p className={styles.intro}>
            Below is a <strong>recreated interactive demo</strong> of the shipped flow, using mock data and content. It preserves the case-study experience even as the live product evolves.
          </p>
          <p className={styles.helper}>
            Explore the flow as an interactive demo, or switch to a behavior map to see the full learning journey.
          </p>
        </header>

        <div className={styles.toggleWrap}>
          <div className={styles.toggle} data-active={activeTab} role="tablist" aria-label="Shipped flow view">
            <span className={styles.toggleIndicator} aria-hidden="true" />
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'demo'}
              aria-controls="shipped-flow-demo"
              className={`${styles.toggleButton} ${activeTab === 'demo' ? styles.toggleButtonActive : ''}`}
              onClick={() => setActiveTab('demo')}
            >
              Interactive demo
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'map'}
              aria-controls="shipped-flow-map"
              className={`${styles.toggleButton} ${activeTab === 'map' ? styles.toggleButtonActive : ''}`}
              onClick={() => setActiveTab('map')}
            >
              Behavior map
            </button>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.demoStage}>
            <div
              ref={demoViewportRef}
              className={`${styles.demoViewport} ${activeTab === 'demo' ? styles.demoViewportInteractive : ''}`}
            >
              {activeTab === 'demo' ? (
                <div id="shipped-flow-demo" role="tabpanel" className={styles.demoFramePanel}>
                  <button
                    type="button"
                    className={styles.demoControlButton}
                    aria-label={isDemoFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
                    onClick={toggleDemoFullscreen}
                  >
                    {isDemoFullscreen ? <VideoExitFullscreenIcon /> : <VideoEnterFullscreenIcon />}
                  </button>
                  <SatLmsDemo
                    className={styles.demoEmbed}
                    style={{ height: '100%', minHeight: '100%' }}
                  />
                </div>
              ) : (
                <div id="shipped-flow-map" role="tabpanel" className={styles.mapFramePanel}>
                  <div className={styles.mapCard}>
                    <div className={styles.mapHeader}>
                      <div>
                        <h3>Behavior map</h3>
                        <p>
                          The journey shows how one lesson turns into a mastery loop: progress when the learner is ready, remediate when gaps appear, then continue to the next activity.
                        </p>
                      </div>
                      <span className={styles.mapBadge}>Lesson to mastery check to next action</span>
                    </div>

                    <div className={styles.mapScroll}>
                      <div className={styles.mapCanvas}>
                        <svg className={styles.mapLines} viewBox="0 0 940 928" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <defs>
                            <marker id="shippedFlowArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
                              <path d="M1.5 1.5L8 5L1.5 8.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </marker>
                          </defs>
                          <path d="M470 106V136" stroke="currentColor" strokeWidth="1.35" markerEnd="url(#shippedFlowArrow)" />
                          <path d="M470 246V276" stroke="currentColor" strokeWidth="1.35" markerEnd="url(#shippedFlowArrow)" />
                          <path d="M470 386V416" stroke="currentColor" strokeWidth="1.35" markerEnd="url(#shippedFlowArrow)" />
                          <path d="M470 526V556" stroke="currentColor" strokeWidth="1.35" markerEnd="url(#shippedFlowArrow)" />
                          <path d="M470 666V710" stroke="currentColor" strokeWidth="1.35" />
                          <path d="M220 710H720" stroke="currentColor" strokeWidth="1.35" />
                          <path d="M220 710V758" stroke="currentColor" strokeWidth="1.35" markerEnd="url(#shippedFlowArrow)" />
                          <path d="M720 710V758" stroke="currentColor" strokeWidth="1.35" markerEnd="url(#shippedFlowArrow)" />
                          <path d="M416 858H522" stroke="currentColor" strokeWidth="1.35" markerEnd="url(#shippedFlowArrow)" />
                          <path d="M720 898C835 898 840 662 740 662" stroke="currentColor" strokeWidth="1.35" markerEnd="url(#shippedFlowArrow)" />
                        </svg>

                        {mapNodes.map(([key, step, title, body, Icon, narrow]) => (
                          <article
                            key={key}
                            className={`${styles.mapNode} ${narrow ? styles.mapNodeNarrow : ''} ${styles[key]}`}
                          >
                            <div className={styles.mapNodeInner}>
                              <span className={styles.mapIcon}><Icon /></span>
                              <div>
                                <h4>{step}. {title}</h4>
                                <p>{body}</p>
                              </div>
                            </div>
                          </article>
                        ))}

                        <span className={`${styles.branchLabel} ${styles.branchLeft}`}>Mastery not demonstrated</span>
                        <span className={`${styles.branchLabel} ${styles.branchRight}`}>Mastery achieved</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Image
              src="/images/case-studies/sat-lms/shipped-flow-mac-frame.png"
              alt=""
              fill
              sizes="(min-width: 1280px) 1120px, 120vw"
              className={styles.frameImage}
              aria-hidden="true"
            />
          </div>
        </div>

        <article className={styles.liveCard}>
          <div className={styles.liveCardMain}>
            <div>
              <h3>
                <span className={styles.staggerWord} style={{ '--word-index': 0 }}>Try</span>{' '}
                <span className={styles.staggerWord} style={{ '--word-index': 1 }}>the</span>{' '}
                <span className={styles.staggerWord} style={{ '--word-index': 2 }}>current</span>{' '}
                <span className={`${styles.staggerWord} ${styles.headingAccent}`} style={{ '--word-index': 3 }}>live</span>{' '}
                <span className={`${styles.staggerWord} ${styles.headingAccent}`} style={{ '--word-index': 4 }}>product</span>
              </h3>
              <p>You can also experience the product on the live platform by following the steps below.</p>
              <div className={styles.steps} aria-label="Steps to try the live product">
                <span><b>1</b> Create a free account</span>
                <i className={styles.stepRule} aria-hidden="true" />
                <span><b>2</b> Open the course</span>
                <i className={styles.stepRule} aria-hidden="true" />
                <span><b>3</b> Start the diagnostic</span>
              </div>
            </div>

            <div className={styles.liveCtaCluster}>
              <svg className={styles.liveCtaTextRing} viewBox="0 0 144 144" aria-hidden="true">
                <defs>
                  <path id="liveProductTextPath" d="M72 72m-55 0a55 55 0 1 1 110 0a55 55 0 1 1-110 0" />
                </defs>
                <text>
                  <textPath href="#liveProductTextPath" startOffset="0">
                    Experience now
                  </textPath>
                </text>
              </svg>
              <a
                href={liveProductUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open live product in a new tab"
                className={styles.liveCta}
              >
                <LiveProductArrowIcon />
              </a>
            </div>
          </div>

          <div className={styles.caveat}>
            <span className={styles.caveatIcon}>i</span>
            <p><strong>Small caveat:</strong> The live product is actively maintained, so the current experience may differ from the archived flow shown in this case study.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
