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

export default function Home() {
  return (
    <>
      <MetaTags />
      <Navigation />
      <BatReveal />
      <StoryBanner />
      <main>
        <Hero />
        <FeaturedProjects />
        <MoreFromDesk />
        <DesignForge />
        <Skills />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
