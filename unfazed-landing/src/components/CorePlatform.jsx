export default function CorePlatform() {
  const modules = [
    {
      id: 'therapist-dashboard',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
      title: 'Therapist Dashboard',
      description: 'Practice management hub: calendar, clients, notes, billing and analytics — all in one place.',
      features: ['Unified calendar view', 'Client quick-access', 'Notes & billing shortcuts', 'Real-time analytics']
    },
    {
      id: 'client-portal',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: 'Client Portal',
      description: 'Self-service portal for clients: intake, booking, payments, chat, and shared notes.',
      features: ['Digital intake forms', 'Self-booking & rescheduling', 'Secure payments', 'Encrypted messaging']
    },
    {
      id: 'subscription-layer',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M10 4v16M14 4v16" />
          <path d="M6 8h12M6 12h12M6 16h12" />
        </svg>
      ),
      title: 'Subscription Layer',
      description: 'Tier-based feature access with config-driven architecture — no hardcoded plans.',
      features: ['Flexible tier config', 'Feature flags per tier', 'Usage-based limits', 'Instant plan changes']
    },
    {
      id: 'communication-layer',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M12 9h6" />
          <path d="M12 12h6" />
          <path d="M12 15h3" />
        </svg>
      ),
      title: 'Communication Layer',
      description: 'Real-time chat, notifications, and secure messaging built for healthcare workflows.',
      features: ['E2E encrypted chat', 'Push & email notifications', 'Session reminders', 'File sharing']
    }
  ];

  return (
    <section id="core-platform" className="core-platform" aria-labelledby="core-platform-title">
      <div className="container">
        <header className="core-platform__header">
          <span className="features__tag">Platform Architecture</span>
          <h2 id="core-platform-title" className="features__title">Core Platform Components</h2>
          <p className="features__description">
            Four modular layers that work together seamlessly. Built for scale, designed for therapists.
          </p>
        </header>

        <div className="core-platform__grid" role="list">
          {modules.map((module) => (
            <article key={module.id} className="core-platform__card" role="listitem">
              <div className="core-platform__icon-wrapper">
                <div className="core-platform__icon" aria-hidden="true">
                  {module.icon}
                </div>
                <div className="core-platform__glow" aria-hidden="true"></div>
              </div>
              <h3 className="core-platform__title">{module.title}</h3>
              <p className="core-platform__description">{module.description}</p>
              <ul className="core-platform__features" aria-label={`${module.title} capabilities`}>
                {module.features.map((feature, i) => (
                  <li key={i} className="core-platform__feature">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="core-platform__feature-icon">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="core-platform__cta">
                <a href={`/features#${module.id}`} className="core-platform__link">
                  Explore module
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}