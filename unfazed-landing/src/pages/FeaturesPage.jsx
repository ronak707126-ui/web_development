import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Features = () => {
  return (
    <>
      <Navbar />
      <main className="page-container">
        <section className="page-hero">
          <div className="container">
            <h1>Features</h1>
            <p className="page-hero__description">Everything you need to run your practice effortlessly.</p>
          </div>
        </section>
        <section className="page-section">
          <div className="container">
            <h2>All Features</h2>
            <p>Content coming soon...</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Features;