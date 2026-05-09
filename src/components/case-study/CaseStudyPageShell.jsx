import Footer from '../sections/Footer/Footer';
import Navigation from '../sections/Navigation/Navigation';

export default function CaseStudyPageShell({
  links,
  backHref = '/',
  backLabel = 'Back',
  children,
}) {
  return (
    <div className="min-h-screen bg-surface-white text-ink-950">
      <Navigation
        links={links}
        showToggle={false}
        backHref={backHref}
        backLabel={backLabel}
      />

      <main>{children}</main>
      <Footer variant="caseStudy" />
    </div>
  );
}
