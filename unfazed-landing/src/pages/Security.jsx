import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Security = () => {
  return (
    <>
      <Navbar />
      <main className="page-container">
        <section className="page-hero">
          <div className="container">
            <h1>Security & Compliance</h1>
            <p className="page-hero__description">Your data security is our top priority.</p>
          </div>
        </section>
        <section className="page-section">
          <div className="container">
            <h2>HIPAA, Encryption & Standards</h2>
            <p>Content coming soon...</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Security;