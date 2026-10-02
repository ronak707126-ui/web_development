const stats = [
  { value: '10,000+', label: 'Active Teams' },
  { value: '500K+', label: 'Projects Deployed' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '24/7', label: 'Support Coverage' },
];

export default function Trust() {
  return (
    <section className="trust" aria-labelledby="trust-title">
      <div className="container">
        <h2 id="trust-title" className="visually-hidden">Trusted by teams worldwide</h2>
        <div className="trust__container" role="list">
          {stats.map((stat, index) => (
            <div key={index} className="trust__item" role="listitem">
              <div className="trust__value" aria-label={stat.value}>{stat.value}</div>
              <div className="trust__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}