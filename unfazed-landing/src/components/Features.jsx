import { useState, useEffect, useRef } from 'react';

const features = [
  {
    id: 'client-management',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Client Management',
    description: 'Comprehensive client profiles with intake forms, treatment plans, progress tracking, and secure document storage.',
    bullets: [
      'Digital intake forms & consent',
      'Treatment plan templates',
      'Progress notes & outcomes',
      'Secure document vault',
      'Client timeline view',
      'HIPAA-compliant records'
    ]
  },
  {
    id: 'smart-scheduling',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
      </svg>
    ),
    title: 'Smart Scheduling',
    description: 'Intelligent calendar with automated reminders, recurring appointments, waitlist management, and timezone handling.',
    bullets: [
      'Automated SMS/email reminders',
      'Recurring session booking',
      'Waitlist auto-fill',
      'Timezone detection',
      'Calendar sync (Google/Outlook)',
      'Buffer time management'
    ]
  },
  {
    id: 'clinical-notes',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: 'Clinical Notes',
    description: 'Structured note templates (SOAP, DAP, BIRP), voice-to-text dictation, auto-save, and template library.',
    bullets: [
      'SOAP, DAP, BIRP templates',
      'Voice-to-text dictation',
      'Auto-save & version history',
      'Custom template builder',
      'Quick phrases & shortcuts',
      'Export for insurance'
    ]
  },
  {
    id: 'business-analytics',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: 'Business Analytics',
    description: 'Real-time dashboards with revenue tracking, client retention, session analytics, and customizable reports.',
    bullets: [
      'Revenue & billing reports',
      'Client retention metrics',
      'Session utilization rates',
      'No-show analytics',
      'Custom date ranges',
      'PDF/CSV export'
    ]
  },
  {
    id: 'payments-billing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: 'Payments & Billing',
    description: 'Integrated payment processing, automated invoicing, insurance claims, subscription plans, and financial reporting.',
    bullets: [
      'UPI, cards, net banking',
      'Automated recurring billing',
      'Insurance claim tracking',
      'Subscription management',
      'Invoice generation',
      'GST-compliant receipts'
    ]
  },
  {
    id: 'secure-messaging',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M12 9h6" />
        <path d="M12 12h6" />
        <path d="M12 15h3" />
      </svg>
    ),
    title: 'Secure Messaging',
    description: 'End-to-end encrypted chat, file sharing, session links, and automated follow-ups — all HIPAA compliant.',
    bullets: [
      'E2E encrypted chat',
      'Secure file sharing',
      'Video session links',
      'Automated check-ins',
      'Message templates',
      'Audit trail logging'
    ]
  }
];

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isAutoPlaying && window.innerWidth <= 768) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % features.length);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying]);

  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);

  return (
    <section id="features" className="features" aria-labelledby="features-title">
      <div className="container">
        <header className="features__header">
          <span className="features__tag">Core Features</span>
          <h2 id="features-title" className="features__title">Everything to run your practice effortlessly</h2>
          <p className="features__description">
            Purpose-built for therapists. From client intake to billing — one platform that handles it all.
          </p>
        </header>

        <div className="features__grid" role="list">
          {features.map((feature, index) => (
            <article
              key={feature.id}
              className={`feature-card ${index === activeIndex && window.innerWidth <= 768 ? 'feature-card--active' : ''}`}
              role="listitem"
              onMouseEnter={pauseAutoPlay}
              onMouseLeave={resumeAutoPlay}
              onFocus={pauseAutoPlay}
              onBlur={resumeAutoPlay}
            >
              <div className="feature-card__icon-wrapper">
                <div className="feature-card__icon" aria-hidden="true">
                  {feature.icon}
                </div>
                <div className="feature-card__glow" aria-hidden="true"></div>
              </div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__description">{feature.description}</p>
              <ul className="feature-card__bullets" aria-label={`${feature.title} features`}>
                {feature.bullets.map((bullet, i) => (
                  <li key={i} className="feature-card__bullet">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="feature-card__bullet-icon">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="feature-card__cta">
                <a href={`/features#${feature.id}`} className="feature-card__link">
                  Learn more
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        {window.innerWidth <= 768 && (
          <div className="features__dots" role="tablist" aria-label="Feature cards">
            {features.map((_, index) => (
              <button
                key={index}
                className={`features__dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Go to ${features[index].title}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}