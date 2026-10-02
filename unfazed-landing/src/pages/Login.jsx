import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
  return (
    <>
      <Navbar />
      <main className="page-container auth-page">
        <section className="page-hero">
          <div className="container">
            <h1>Login</h1>
            <p className="page-hero__description">Welcome back. Sign in to your account.</p>
          </div>
        </section>
        <section className="page-section">
          <div className="container">
            <h2>Login Form</h2>
            <p>Content coming soon...</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Login;