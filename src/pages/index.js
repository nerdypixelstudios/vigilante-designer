import { useEffect } from 'react';
import MetaTags from '../components/shared/MetaTags';
import StoryBanner from '../components/shared/StoryBanner';
import BatReveal from '../components/shared/BatReveal';
import Navigation from '../components/sections/Navigation/Navigation';
import Hero from '../components/sections/Hero/Hero';
import FeaturedProjects from '../components/sections/FeaturedProjects/FeaturedProjects';
import MoreFromDesk from '../components/sections/MoreFromDesk/MoreFromDesk';
import DesignForge from '../components/sections/DesignForge/DesignForge';
import Skills from '../components/sections/Skills/Skills';
import Testimonials from '../components/sections/Testimonials/Testimonials';
import Footer from '../components/sections/Footer/Footer';
import WireframeReveal from '../components/sections/WireframeReveal/WireframeReveal';
import { useTheme } from '../components/shared/ThemeContext';

export default function Home() {
  const { isFunMode, pendingScrollTarget, clearPendingScrollTarget } = useTheme();

  useEffect(() => {
    if (!pendingScrollTarget) return;

    const frame = requestAnimationFrame(() => {
      document.getElementById(pendingScrollTarget)?.scrollIntoView({ block: 'start' });
      clearPendingScrollTarget();
    });

    return () => cancelAnimationFrame(frame);
  }, [clearPendingScrollTarget, isFunMode, pendingScrollTarget]);

  return (
    <>
      <MetaTags />
      <BatReveal />
      <StoryBanner />
      {isFunMode ? (
        <WireframeReveal />
      ) : (
        <>
          <Navigation />
          <main>
            <Hero />
            <FeaturedProjects />
            <DesignForge />
            <MoreFromDesk />
            <Skills />
            <Testimonials />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
