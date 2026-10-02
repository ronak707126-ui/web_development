import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const plans = [
  {
    id: 'free',
    name: 'FREE',
    tagline: 'Perfect for getting started',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { name: 'Clients', included: true, limit: 'Up to 10' },
      { name: 'Appointments/Month', included: true, limit: 'Up to 50' },
      { name: 'Clinical Notes (SOAP/DAP/BIRP)', included: true },
      { name: 'Client Portal Access', included: true },
      { name: 'Secure Messaging', included: true },
      { name: 'Payment Processing', included: true, note: '2.5% + ₹3 per transaction' },
      { name: 'Basic Analytics', included: true },
      { name: 'Email Support', included: true },
      { name: 'Advanced Analytics', included: false },
      { name: 'Custom Templates', included: false },
      { name: 'Group Practice Management', included: false },
      { name: 'API Access', included: false },
      { name: 'Priority Support', included: false },
      { name: 'Dedicated Success Manager', included: false }
    ],
    cta: 'Start Free',
    popular: false
  },
  {
    id: 'professional',
    name: 'PROFESSIONAL',
    tagline: 'For growing practices',
    monthlyPrice: 1999,
    yearlyPrice: 1699,
    features: [
      { name: 'Clients', included: true, limit: 'Unlimited' },
      { name: 'Appointments/Month', included: true, limit: 'Unlimited' },
      { name: 'Clinical Notes (SOAP/DAP/BIRP)', included: true },
      { name: 'Client Portal Access', included: true },
      { name: 'Secure Messaging', included: true },
      { name: 'Payment Processing', included: true, note: '2% + ₹2 per transaction' },
      { name: 'Basic Analytics', included: true },
      { name: 'Email Support', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'Custom Templates', included: true },
      { name: 'Group Practice Management', included: true, limit: 'Up to 5 therapists' },
      { name: 'API Access', included: false },
      { name: 'Priority Support', included: true },
      { name: 'Dedicated Success Manager', included: false }
    ],
    cta: 'Get Started',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE',
    tagline: 'For large organizations',
    monthlyPrice: null,
    yearlyPrice: null,
    custom: true,
    features: [
      { name: 'Clients', included: true, limit: 'Unlimited' },
      { name: 'Appointments/Month', included: true, limit: 'Unlimited' },
      { name: 'Clinical Notes (SOAP/DAP/BIRP)', included: true },
      { name: 'Client Portal Access', included: true },
      { name: 'Secure Messaging', included: true },
      { name: 'Payment Processing', included: true, note: 'Custom rates' },
      { name: 'Basic Analytics', included: true },
      { name: 'Email Support', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'Custom Templates', included: true },
      { name: 'Group Practice Management', included: true, limit: 'Unlimited therapists' },
      { name: 'API Access', included: true },
      { name: 'Priority Support', included: true },
      { name: 'Dedicated Success Manager', included: true }
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

const faqs = [
  {
    question: 'Can I switch plans later?',
    answer: 'Yes, you can upgrade or downgrade at any time. Changes take effect immediately, and we\'ll prorate the difference.'
  },
  {
    question: 'Is there a long-term contract?',
    answer: 'No. All plans are month-to-month. Annual plans offer a discount but can be cancelled with a pro-rated refund.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept UPI, all major credit/debit cards, net banking, and bank transfers for annual enterprise contracts.'
  },
  {
    question: 'Are there per-client fees?',
    answer: 'No. Our pricing is per therapist, not per client. You can have unlimited clients on Professional and Enterprise plans.'
  },
  {
    question: 'Is my data secure and HIPAA compliant?',
    answer: 'Yes. All plans include end-to-end encryption, audit logs, and full HIPAA compliance. We sign BAAs for Professional and Enterprise plans.'
  },
  {
    question: 'Do you offer discounts for non-profits or students?',
    answer: 'Yes! We offer 50% off for registered non-profits and 30% off for students/interns. Contact our team to verify eligibility.'
  },
  {
    question: 'What happens after my 14-day free trial?',
    answer: 'You\'ll be prompted to choose a plan. If you don\'t upgrade, your account will be paused but your data is preserved for 90 days.'
  },
  {
    question: 'Can I import data from another system?',
    answer: 'Yes. We support CSV imports for clients, appointments, and notes. Enterprise plans include assisted migration at no extra cost.'
  }
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

  const getPrice = (plan) => {
    if (plan.custom) return 'Custom';
    return isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  };

  const getPeriod = () => isYearly ? '/month (billed yearly)' : '/month';

  return (
    <>
      <Navbar />
      <main className="page-container">
        <section className="page-hero">
          <div className="container">
            <h1>Simple, Transparent Pricing</h1>
            <p className="page-hero__description">
              Choose the plan that fits your practice. All plans include a 14-day free trial — no credit card required.
            </p>
          </div>
        </section>

        {/* Billing Toggle */}
        <section className="page-section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="pricing__toggle glass" style={{ maxWidth: '400px', margin: '0 auto var(--space-12)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-6)' }}>
                <span className={`${!isYearly ? 'active' : ''}`} style={{ fontWeight: 600, color: isYearly ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                  Monthly
                </span>
                <label className="pricing__switch" style={{ position: 'relative', width: '56px', height: '28px' }}>
                  <input
                    type="checkbox"
                    checked={isYearly}
                    onChange={(e) => setIsYearly(e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span className="pricing__switch-slider" style={{
                    position: 'absolute',
                    inset: 0,
                    background: isYearly ? 'var(--brand-gradient)' : 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-full)',
                    transition: 'all var(--transition-base)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px'
                  }}>
                    <span className="pricing__switch-thumb" style={{
                      width: '24px',
                      height: '24px',
                      background: 'white',
                      borderRadius: 'var(--radius-full)',
                      transform: isYearly ? 'translateX(28px)' : 'translateX(0)',
                      transition: 'transform var(--transition-base)',
                      boxShadow: 'var(--shadow-md)'
                    }} />
                  </span>
                </label>
                <span className={`${isYearly ? 'active' : ''}`} style={{ fontWeight: 600, color: isYearly ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                  Yearly
                  <span style={{ fontSize: 'var(--font-size-xs)', background: 'var(--success)', color: 'white', padding: '2px 6px', borderRadius: 'var(--radius-sm)', marginLeft: 'var(--space-2)' }}>
                    Save 15%
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="page-section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="pricing__grid">
              {plans.map((plan, index) => (
                <article
                  key={plan.id}
                  className={`pricing__card glass ${plan.popular ? 'pricing__card--popular' : ''}`}
                  style={{ 
                    border: plan.popular ? '2px solid var(--brand-blue)' : '1px solid var(--border-color)',
                    boxShadow: plan.popular ? 'var(--shadow-xl), 0 0 40px rgba(99, 102, 241, 0.15)' : 'none'
                  }}
                >
                  {plan.popular && (
                    <div className="pricing__badge" style={{ background: 'var(--brand-gradient)', color: 'white', padding: 'var(--space-1) var(--space-3)', borderRadius: 'var(--radius-full)', fontSize: 'var(--font-size-xs)', fontWeight: 700, display: 'inline-block', marginBottom: 'var(--space-4)' }}>
                      Most Popular
                    </div>
                  )}
                  <h3 className="pricing__name" style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>{plan.name}</h3>
                  <p className="pricing__tagline" style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-6)' }}>{plan.tagline}</p>
                  
                  <div className="pricing__price" style={{ marginBottom: 'var(--space-6)' }}>
                    {plan.custom ? (
                      <span style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800 }}>Custom</span>
                    ) : (
                      <>
                        <span style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 800, background: 'var(--brand-gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                          ₹{getPrice(plan).toLocaleString()}
                        </span>
                        <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--text-muted)', marginLeft: 'var(--space-2)' }}>
                          {getPeriod()}
                        </span>
                      </>
                    )}
                  </div>

                  <ul className="pricing__features" style={{ marginBottom: 'var(--space-8)' }}>
                    {plan.features.map((feature, i) => (
                      <li key={i} className={`pricing__feature ${!feature.included ? 'pricing__feature--excluded' : ''}`} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 'var(--space-3)', 
                        padding: 'var(--space-2) 0',
                        color: feature.included ? 'var(--text-secondary)' : 'var(--text-muted)',
                        opacity: feature.included ? 1 : 0.6
                      }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ 
                          width: '20px', 
                          height: '20px', 
                          flexShrink: 0,
                          color: feature.included ? 'var(--success)' : 'var(--text-muted)'
                        }}>
                          {feature.included ? <polyline points="20 6 9 17 4 12" /> : <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />}
                        </svg>
                        <span style={{ fontSize: 'var(--font-size-sm)' }}>{feature.name}</span>
                        {feature.limit && <span style={{ marginLeft: 'auto', fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>{feature.limit}</span>}
                        {feature.note && <span style={{ marginLeft: 'auto', fontSize: 'var(--font-size-xs)', color: 'var(--brand-cyan)' }}>{feature.note}</span>}
                      </li>
                    ))}
                  </ul>

                  <a href={plan.custom ? '/contact' : '/register'} className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-lg`} style={{ width: '100%', justifyContent: 'center' }}>
                    {plan.cta}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="page-section" style={{ background: 'rgba(15, 23, 42, 0.3)' }}>
          <div className="container">
            <header className="features__header">
              <span className="features__tag">Questions</span>
              <h2 className="features__title">Frequently Asked Questions</h2>
              <p className="features__description">Everything you need to know about pricing and billing.</p>
            </header>
            <div className="faq__list" style={{ maxWidth: '800px', margin: '0 auto' }}>
              {faqs.map((faq, index) => (
                <details key={index} className="faq__item glass" style={{ marginBottom: 'var(--space-4)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                  <summary className="faq__question" style={{ 
                    padding: 'var(--space-5) var(--space-6)', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    fontWeight: 600,
                    fontSize: 'var(--font-size-base)',
                    listStyle: 'none'
                  }}>
                    {faq.question}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '20px', height: '20px', color: 'var(--brand-cyan)', flexShrink: 0, marginLeft: 'var(--space-4)', transition: 'transform var(--transition-fast)' }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <div className="faq__answer" style={{ 
                    padding: '0 var(--space-6) var(--space-6)', 
                    color: 'var(--text-secondary)', 
                    lineHeight: 1.7,
                    fontSize: 'var(--font-size-base)'
                  }}>
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="page-section">
          <div className="container">
            <div className="about__cta glass" style={{ textAlign: 'center', padding: 'var(--space-16) var(--space-10)', borderRadius: 'var(--radius-2xl)', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1))', border: '1px solid var(--border-glow)' }}>
              <h2 style={{ marginBottom: 'var(--space-4)' }}>Still have questions?</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)', maxWidth: '600px', margin: '0 auto var(--space-8)' }}>
                Our team is here to help you find the right plan for your practice.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="/contact" className="btn btn-primary btn-lg">Contact Sales</a>
                <a href="/register" className="btn btn-secondary btn-lg">Start Free Trial</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Pricing;