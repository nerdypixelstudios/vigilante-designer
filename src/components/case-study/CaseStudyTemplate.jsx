import CaseStudyPageShell from './CaseStudyPageShell';

export default function CaseStudyTemplate({
  navigationLinks,
  backHref = '/',
  backLabel = 'Back',
  children,
}) {
  return (
    <CaseStudyPageShell
      links={navigationLinks}
      backHref={backHref}
      backLabel={backLabel}
    >
      {children}
    </CaseStudyPageShell>
  );
}
