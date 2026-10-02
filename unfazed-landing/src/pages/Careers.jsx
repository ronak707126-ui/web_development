import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Careers = () => {
  return (
    <>
      <Navbar />
      <main className="page-container">
        <section className="page-hero">
          <div className="container">
            <h1>Careers</h1>
            <p className="page-hero__description">Join us in transforming mental health care.</p>
          </div>
        </section>
        <section className="page-section">
          <div className="container">
            <h2>Open Positions</h2>
            <p>Content coming soon...</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Careers;