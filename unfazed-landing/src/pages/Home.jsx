import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Trust from '../components/Trust';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import CorePlatform from '../components/CorePlatform';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <Features />
        <Testimonials />
        <CorePlatform />
        <CTA />
      </main>
      <Footer />
    </>
  );
};

export default Home;