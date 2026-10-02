import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <>
      <Navbar />
      <main className="page-container">
        <section className="page-hero">
          <div className="container">
            <h1>Contact Us</h1>
            <p className="page-hero__description">We'd love to hear from you. Get in touch with our team.</p>
          </div>
        </section>
        <section className="page-section">
          <div className="container">
            <h2>Contact Form</h2>
            <p>Content coming soon...</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;