import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const leadership = [
  {
    name: 'Dr. Ananya Krishnan',
    role: 'Co-Founder & CEO',
    bio: 'Clinical psychologist with 15+ years experience. Former director at NIMHANS. Passionate about making mental healthcare accessible.',
    initials: 'AK',
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Rahul Sharma',
    role: 'Co-Founder & CTO',
    bio: 'Ex-Google, Microsoft. Built scalable health tech platforms. Focused on privacy-first architecture for healthcare.',
    initials: 'RS',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Dr. Priya Menon',
    role: 'Chief Clinical Officer',
    bio: 'Psychiatrist and researcher. Published 30+ papers on digital mental health. Advises on clinical workflows & compliance.',
    initials: 'PM',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    name: 'Vikram Patel',
    role: 'VP Engineering',
    bio: 'Ex-Flipkart, Swiggy. Led engineering for high-scale platforms. Building robust, secure infrastructure for therapists.',
    initials: 'VP',
    color: 'from-orange-500 to-red-500'
  }
];

const values = [
  {
    title: 'Client First',
    description: 'Every decision starts with: does this help therapists deliver better care?'
  },
  {
    title: 'Privacy by Design',
    description: 'HIPAA compliance and end-to-end encryption are not features — they are our foundation.'
  },
  {
    title: 'Simplicity',
    description: 'Complex technology, invisible to users. Therapists should focus on clients, not software.'
  },
  {
    title: 'Continuous Learning',
    description: 'We listen to therapists daily. Their feedback drives our roadmap, not investor demands.'
  },
  {
    title: 'Accessibility',
    description: 'Mental healthcare should be accessible to everyone. We build for diverse practices and budgets.'
  },
  {
    title: 'Transparency',
    description: 'No hidden fees, no vendor lock-in. Clear pricing, open roadmap, honest communication.'
  }
];

const stats = [
  { value: '2,000+', label: 'Active Therapists' },
  { value: '50,000+', label: 'Clients Served' },
  { value: '99.9%', label: 'Platform Uptime' },
  { value: '15+', label: 'Hours Saved/Week' }
];

const About = () => {
  const [activeValue, setActiveValue] = useState(0);

  return (
    <>
      <Navbar />
      <main className="page-container">
        {/* Hero Section */}
        <section className="page-hero">
          <div className="container">
            <h1>About Unfazed</h1>
            <p className="page-hero__description">
              We're on a mission to give every therapist the tools they deserve — so they can focus on what matters most: their clients.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="page-section">
          <div className="container">
            <div className="about__mission-vision">
              <div className="about__card glass">
                <div className="about__card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h2>Our Mission</h2>
                <p>
                  To empower mental health professionals with intuitive, secure, and powerful technology
                  that eliminates administrative burden — so every therapist can focus entirely on client care.
                </p>
              </div>
              <div className="about__card glass">
                <div className="about__card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <path d="M12 12v4" />
                    <path d="M12 12v-4" />
                  </svg>
                </div>
                <h2>Our Vision</h2>
                <p>
                  A world where every mental health professional — from solo practitioners to large clinics —
                  has access to enterprise-grade practice management tools that are affordable, compliant, and delightful to use.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="page-section" style={{ background: 'rgba(15, 23, 42, 0.3)' }}>
          <div className="container">
            <div className="about__story">
              <div className="about__story-content">
                <span className="features__tag">Our Story</span>
                <h2>Built by therapists, for therapists</h2>
                <p className="about__story-text">
                  Unfazed was born from a simple observation: therapists spend more time on paperwork than on people.
                  Our founder, Dr. Ananya Krishnan, ran a busy private practice in Bangalore and experienced this firsthand.
                  She watched colleagues burn out from late-night note-taking, missed appointments, and billing headaches.
                </p>
                <p className="about__story-text">
                  She teamed up with Rahul, a systems engineer who believed technology should be invisible —
                  powerful enough to handle complexity, simple enough to disappear into the background.
                  Together, they built Unfazed: a platform that handles the business of therapy so therapists don't have to.
                </p>
                <p className="about__story-text">
                  Today, we're a team of clinicians, engineers, and designers united by one goal:
                  giving every therapist the superpower of effortless practice management.
                </p>
              </div>
              <div className="about__story-image">
                <div className="about__story-placeholder glass">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '80px', height: '80px', opacity: '0.3' }}>
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                  <p style={{ color: 'var(--text-muted)', marginTop: 'var(--space-4)' }}>Team Photo Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Unfazed */}
        <section className="page-section">
          <div className="container">
            <header className="features__header">
              <span className="features__tag">Why Unfazed</span>
              <h2 id="features-title" className="features__title">Different by design</h2>
              <p className="features__description">
                We're not just another practice management tool. Here's what sets us apart.
              </p>
            </header>
            <div className="features__grid">
              {[
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, title: 'HIPAA First', desc: 'Security isn\'t an add-on. End-to-end encryption, audit trails, and compliance built into every feature.' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>, title: 'Time to Value', desc: 'Get running in 15 minutes. No implementation fees, no training required, no IT support needed.' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>, title: 'Clinical Workflows', desc: 'SOAP, DAP, BIRP templates. Voice dictation. Insurance-ready exports. Built for real clinical work.' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>, title: 'Client-Centric', desc: 'Beautiful client portal for booking, payments, messaging, and shared resources. Clients love it.' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>, title: 'Actionable Analytics', desc: 'Revenue, retention, utilization, no-shows — real-time dashboards that help you grow strategically.' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>, title: 'Fair Pricing', desc: 'Transparent, per-therapist pricing. No per-client fees. No contracts. Cancel anytime.' }
              ].map((item, index) => (
                <article key={index} className="feature-card">
                  <div className="feature-card__icon-wrapper">
                    <div className="feature-card__icon" aria-hidden="true">{item.icon}</div>
                    <div className="feature-card__glow" aria-hidden="true"></div>
                  </div>
                  <h3 className="feature-card__title">{item.title}</h3>
                  <p className="feature-card__description">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="page-section" style={{ background: 'rgba(15, 23, 42, 0.3)' }}>
          <div className="container">
            <header className="features__header">
              <span className="features__tag">Leadership</span>
              <h2 className="features__title">Meet our team</h2>
              <p className="features__description">Clinicians, engineers, and builders united by a shared mission.</p>
            </header>
            <div className="leadership__grid">
              {leadership.map((member, index) => (
                <article key={index} className="leadership__card glass">
                  <div className="leadership__avatar" style={{ background: `linear-gradient(135deg, var(--${member.color.replace('from-', '').replace('to-', '')})` }}>
                    {member.initials}
                  </div>
                  <h3 className="leadership__name">{member.name}</h3>
                  <p className="leadership__role">{member.role}</p>
                  <p className="leadership__bio">{member.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section className="page-section">
          <div className="container">
            <header className="features__header">
              <span className="features__tag">Values</span>
              <h2 className="features__title">Our guiding principles</h2>
              <p className="features__description">These aren't just words on a wall — they're how we make decisions every day.</p>
            </header>
            <div className="values__grid">
              {values.map((value, index) => (
                <article key={index} className={`values__card glass ${index === activeValue ? 'active' : ''}`} onMouseEnter={() => setActiveValue(index)}>
                  <h3 className="values__title">{value.title}</h3>
                  <p className="values__description">{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="page-section" style={{ background: 'rgba(15, 23, 42, 0.3)' }}>
          <div className="container">
            <div className="trust__container">
              {stats.map((stat, index) => (
                <div key={index} className="trust__item">
                  <div className="trust__value">{stat.value}</div>
                  <div className="trust__label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="page-section">
          <div className="container">
            <div className="about__cta glass" style={{ textAlign: 'center', padding: 'var(--space-16) var(--space-10)', borderRadius: 'var(--radius-2xl)', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1))', border: '1px solid var(--border-glow)' }}>
              <h2 style={{ marginBottom: 'var(--space-4)' }}>Ready to join us?</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)', maxWidth: '600px', margin: '0 auto var(--space-8)' }}>
                Whether you're a solo practitioner or running a multi-location clinic, Unfazed grows with you.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="/register" className="btn btn-primary btn-lg">Start Free Trial</a>
                <a href="/contact" className="btn btn-secondary btn-lg">Contact Sales</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;