import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = () => {
  return (
    <>
      <Navbar />
      <main className="page-container auth-page">
        <section className="page-hero">
          <div className="container">
            <h1>Create Account</h1>
            <p className="page-hero__description">Start your 14-day free trial. No credit card required.</p>
          </div>
        </section>
        <section className="page-section">
          <div className="container">
            <h2>Registration Form</h2>
            <p>Content coming soon...</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Register;