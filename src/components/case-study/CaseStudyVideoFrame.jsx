import { forwardRef } from 'react';
import ControlledVideo from './ControlledVideo';

function BrowserChrome() {
  return (
    <div className="flex items-center gap-2 rounded-t-xl border-b border-ink-100 bg-surface-white px-4 py-3">
      <div className="h-3 w-3 rounded-full bg-ink-100"></div>
      <div className="h-3 w-3 rounded-full bg-ink-100"></div>
      <div className="h-3 w-3 rounded-full bg-ink-100"></div>
    </div>
  );
}

const CaseStudyVideoFrame = forwardRef(function CaseStudyVideoFrame({
  frameClassName,
  mediaClassName,
  videoClassName = '',
  poster,
  ariaLabel,
  sources,
  playbackRate = 1,
  chrome = <BrowserChrome />,
  ...videoProps
}, forwardedRef) {
  return (
    <ControlledVideo
      ref={forwardedRef}
      className={frameClassName}
      chrome={chrome}
      mediaClassName={mediaClassName}
      videoClassName={videoClassName}
      poster={poster}
      ariaLabel={ariaLabel}
      sources={sources}
      playbackRate={playbackRate}
      {...videoProps}
    />
  );
});

export default CaseStudyVideoFrame;
