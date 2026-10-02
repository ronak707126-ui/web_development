import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HelpCenter = () => {
  return (
    <>
      <Navbar />
      <main className="page-container">
        <section className="page-hero">
          <div className="container">
            <h1>Help Center</h1>
            <p className="page-hero__description">Find answers, guides, and get support.</p>
          </div>
        </section>
        <section className="page-section">
          <div className="container">
            <h2>Documentation & FAQ</h2>
            <p>Content coming soon...</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HelpCenter;