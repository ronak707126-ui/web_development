export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__container">
        <div className="hero__content">
          <span className="hero__badge" aria-label="New release">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            New: AI-Powered Analytics v2.0
          </span>

          <h1 id="hero-title" className="hero__title">
            Build faster. Scale effortlessly.
          </h1>

          <p className="hero__description">
            The modern development platform that handles infrastructure,
            so you can focus on shipping features that matter.
          </p>

          <div className="hero__cta-group" role="group" aria-label="Primary actions">
            <a href="#signup" className="btn btn-primary btn-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Start Free Trial
            </a>
            <a href="#demo" className="btn btn-secondary btn-lg">
              Watch Demo
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </a>
          </div>

          <div className="hero__trust" aria-label="Trusted by companies">
            <div className="hero__trust-avatars" role="img" aria-label="10,000+ companies">
              <span className="hero__trust-avatar" aria-hidden="true">AC</span>
              <span className="hero__trust-avatar" aria-hidden="true">SF</span>
              <span className="hero__trust-avatar" aria-hidden="true">NT</span>
              <span className="hero__trust-avatar" aria-hidden="true">VX</span>
              <span className="hero__trust-avatar" aria-hidden="true">+12</span>
            </div>
            <span className="hero__trust-text">
              Trusted by <strong>10,000+</strong> teams worldwide
            </span>
          </div>
        </div>

        <div className="hero__dashboard" aria-label="Dashboard preview">
          <div className="hero__dashboard-wrapper">
            <div className="hero__dashboard-glow" aria-hidden="true"></div>
            <div className="hero__dashboard-card" role="img" aria-label="Unfazed dashboard showing analytics, projects, and team activity">
              <div className="hero__dashboard-header">
                <div className="hero__dashboard-dots" aria-hidden="true">
                  <span className="hero__dashboard-dot red"></span>
                  <span className="hero__dashboard-dot yellow"></span>
                  <span className="hero__dashboard-dot green"></span>
                </div>
                <span className="hero__dashboard-title">dashboard.unfazed.io</span>
              </div>
              <div className="hero__dashboard-content">
                <nav className="hero__dashboard-sidebar" aria-label="Dashboard navigation">
                  <a href="#" className="hero__dashboard-nav-item active" aria-current="page">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                    Overview
                  </a>
                  <a href="#" className="hero__dashboard-nav-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Analytics
                  </a>
                  <a href="#" className="hero__dashboard-nav-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                    Projects
                  </a>
                  <a href="#" className="hero__dashboard-nav-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    Team
                  </a>
                  <a href="#" className="hero__dashboard-nav-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                    Settings
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}