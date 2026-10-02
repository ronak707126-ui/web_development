import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Blog = () => {
  return (
    <>
      <Navbar />
      <main className="page-container">
        <section className="page-hero">
          <div className="container">
            <h1>Blog</h1>
            <p className="page-hero__description">Insights, tips, and updates for modern therapists.</p>
          </div>
        </section>
        <section className="page-section">
          <div className="container">
            <h2>Latest Articles</h2>
            <p>Content coming soon...</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;