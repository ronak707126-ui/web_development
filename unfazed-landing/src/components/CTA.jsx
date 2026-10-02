import { useEffect, useRef } from 'react';

export default function CTA() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let shapes = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    class FloatingShape {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 60 + 20;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.15 + 0.05;
        this.type = Math.floor(Math.random() * 3); // 0: circle, 1: square, 2: triangle
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.002;
        this.color = Math.random() > 0.5 ? '#6366f1' : Math.random() > 0.5 ? '#8b5cf6' : '#06b6d4';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        switch (this.type) {
          case 0: // Circle
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 1: // Square
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            break;
          case 2: // Triangle
            ctx.beginPath();
            ctx.moveTo(0, -this.size);
            ctx.lineTo(this.size * 0.866, this.size / 2);
            ctx.lineTo(-this.size * 0.866, this.size / 2);
            ctx.closePath();
            ctx.fill();
            break;
        }

        ctx.restore();
      }
    }

    const init = () => {
      resize();
      shapes = Array.from({ length: 15 }, () => new FloatingShape());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shapes.forEach(shape => {
        shape.update();
        shape.draw();
      });
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="cta__background">
        <canvas ref={canvasRef} className="cta__canvas" aria-hidden="true" />
        <div className="cta__gradient-overlay" aria-hidden="true" />
        <div className="cta__grid-pattern" aria-hidden="true" />
      </div>

      <div className="container cta__container">
        <div className="cta__content">
          <div className="cta__badge">
            <span className="cta__badge-pulse" aria-hidden="true"></span>
            <span>New: AI-Powered Clinical Notes</span>
          </div>

          <h2 id="cta-title" className="cta__title">
            Ready to Transform Your Practice?
          </h2>

          <p className="cta__description">
            Join 2,000+ therapists simplifying their practice with Unfazed.
            Start your 14-day free trial — no credit card required.
          </p>

          <div className="cta__buttons" role="group" aria-label="Call to action">
            <a href="/register" className="btn btn-primary btn-lg cta__btn-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="cta__btn-icon">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Start Free Trial
              <span className="cta__btn-subtext">14 days free · No card needed</span>
            </a>
            <a href="/contact" className="btn btn-secondary btn-lg cta__btn-secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="cta__btn-icon">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Book Demo
              <span className="cta__btn-subtext">30 min personalized walkthrough</span>
            </a>
          </div>

          <div className="cta__trust">
            <div className="cta__trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>HIPAA Compliant</span>
            </div>
            <div className="cta__trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span>14-Day Free Trial</span>
            </div>
            <div className="cta__trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>Cancel Anytime</span>
            </div>
            <div className="cta__trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        <div className="cta__illustration" aria-hidden="true">
          <div className="cta__illustration-card cta__illustration-card--1">
            <div className="cta__illustration-header">
              <div className="cta__illustration-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
            <div className="cta__illustration-content">
              <div className="cta__illustration-stat">
                <span className="cta__illustration-number">2,000+</span>
                <span className="cta__illustration-label">Active Therapists</span>
              </div>
              <div className="cta__illustration-stat">
                <span className="cta__illustration-number">15K+</span>
                <span className="cta__illustration-label">Clients Managed</span>
              </div>
              <div className="cta__illustration-stat">
                <span className="cta__illustration-number">99.9%</span>
                <span className="cta__illustration-label">Uptime</span>
              </div>
            </div>
          </div>
          <div className="cta__illustration-card cta__illustration-card--2">
            <div className="cta__illustration-header">
              <div className="cta__illustration-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
            <div className="cta__illustration-content">
              <div className="cta__illustration-graph">
                <svg viewBox="0 0 200 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="graphGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M10,90 L30,60 L50,70 L70,40 L90,50 L110,20 L130,30 L150,10 L170,15 L190,5" stroke="#6366f1" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10,90 L30,60 L50,70 L70,40 L90,50 L110,20 L130,30 L150,10 L170,15 L190,5 L190,90 L10,90 Z" fill="url(#graphGradient)" />
                </svg>
              </div>
              <div className="cta__illustration-metric">
                <span className="cta__illustration-metric-value">+40%</span>
                <span className="cta__illustration-metric-label">Efficiency Gain</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}