import { Link } from 'react-router-dom';

const footerData = {
  brand: {
    description: 'The modern platform for therapists who want to focus on care, not admin.',
    social: [
      { name: 'Twitter', href: 'https://twitter.com', icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg> },
      { name: 'GitHub', href: 'https://github.com', icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg> },
      { name: 'Discord', href: 'https://discord.com', icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.676 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.083.083 0 0 0 .031.057 19.9 19.9 0 0 0 5.994 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.007-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.1.257.19.373.293a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.645.774 1.252 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.001-3.03.077.077 0 0 0 .032-.054c.433-4.664-.295-9.147-1.683-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.175.1086 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.175.1086 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg> },
      { name: 'LinkedIn', href: 'https://linkedin.com', icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> }
    ]
  },
  columns: [
    { title: 'Company', links: [
      { label: 'About', to: '/about' },
      { label: 'Careers', to: '/careers' },
      { label: 'Blog', to: '/blog' },
      { label: 'Contact', to: '/contact' }
    ]},
    { title: 'Features', links: [
      { label: 'Client Management', to: '/features' },
      { label: 'Scheduling', to: '/features' },
      { label: 'Clinical Notes', to: '/features' },
      { label: 'Analytics', to: '/features' },
      { label: 'Client Portal', to: '/features' }
    ]},
    { title: 'Resources', links: [
      { label: 'Help Center', to: '/help-center' },
      { label: 'Security', to: '/security' },
      { label: 'Documentation', to: '/help-center' }
    ]}
  ],
  legal: [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
    { label: 'Cookie Policy', to: '/cookies' },
    { label: 'Security', to: '/security' }
  ]
};

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="Unfazed Home">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              Unfazed
            </Link>
            <p className="footer__description">{footerData.brand.description}</p>
            <div className="footer__social" role="list" aria-label="Social links">
              {footerData.brand.social.map((social, index) => (
                <a key={index} href={social.href} className="footer__social-link" aria-label={social.name} target="_blank" rel="noopener noreferrer">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {footerData.columns.map((column, index) => (
            <div key={index} className="footer__column">
              <h3 className="footer__column-title">{column.title}</h3>
              <nav className="footer__links" aria-label={column.title}>
                {column.links.map((link, i) => (
                  <Link key={i} to={link.to} className="footer__link">{link.label}</Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">&copy; {new Date().getFullYear()} Unfazed. All rights reserved.</p>
          <nav className="footer__legal" aria-label="Legal links">
            {footerData.legal.map((link, index) => (
              <Link key={index} to={link.to} className="footer__legal-link">{link.label}</Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}