import { useState, useEffect, useCallback, useRef } from 'react';

const testimonials = [
  {
    id: 1,
    text: "Unfazed has completely transformed how I manage my practice. The client portal means my clients can book, pay, and access notes without me lifting a finger. I've saved 15+ hours a week on admin.",
    author: "Dr. Priya Sharma",
    role: "Clinical Psychologist",
    location: "Mumbai",
    initials: "PS",
    avatarColor: "from-purple-500 to-pink-500",
    rating: 5,
    practiceType: "Private Practice"
  },
  {
    id: 2,
    text: "The clinical notes templates are a game-changer. SOAP, DAP, BIRP — all built in. Voice dictation means I can dictate notes between sessions. Insurance claims that used to take days now take minutes.",
    author: "Dr. Rajesh Kumar",
    role: "Therapist",
    location: "Bangalore",
    initials: "RK",
    avatarColor: "from-blue-500 to-cyan-500",
    rating: 5,
    practiceType: "Multi-clinic"
  },
  {
    id: 3,
    text: "Managing a family therapy practice across multiple locations was chaos before Unfazed. Now I have one dashboard for everything — scheduling, billing, client communication. The analytics help me grow strategically.",
    author: "Dr. Anjali Patel",
    role: "Family Therapist",
    location: "Delhi",
    initials: "AP",
    avatarColor: "from-emerald-500 to-teal-500",
    rating: 5,
    practiceType: "Group Practice"
  },
  {
    id: 4,
    text: "The automated reminders alone paid for the subscription. No-shows dropped from 18% to under 3%. Clients love the portal — they can reschedule, message me securely, and pay invoices instantly.",
    author: "Dr. Vikram Singh",
    role: "Counselling Psychologist",
    location: "Pune",
    initials: "VS",
    avatarColor: "from-orange-500 to-red-500",
    rating: 5,
    practiceType: "Solo Practice"
  },
  {
    id: 5,
    text: "As a trauma specialist, security is non-negotiable. Unfazed's HIPAA compliance, encryption, and audit trails give me peace of mind. The team is incredibly responsive — real humans, not bots.",
    author: "Dr. Meera Nair",
    role: "Trauma Specialist",
    location: "Chennai",
    initials: "MN",
    avatarColor: "from-indigo-500 to-purple-500",
    rating: 5,
    practiceType: "Specialty Clinic"
  },
  {
    id: 6,
    text: "I was skeptical about switching from paper, but the migration was seamless. The intake forms digitized my entire onboarding. My clients appreciate the modern experience — it builds trust from day one.",
    author: "Dr. Arjun Desai",
    role: "Child Psychologist",
    location: "Ahmedabad",
    initials: "AD",
    avatarColor: "from-teal-500 to-green-500",
    rating: 5,
    practiceType: "Pediatric Practice"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const intervalRef = useRef(null);
  const cardsRef = useRef(null);

  const scrollToCard = useCallback((index) => {
    if (cardsRef.current) {
      const cardWidth = cardsRef.current.children[0]?.offsetWidth || 0;
      const gap = 24;
      cardsRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    if (isAutoPlaying && window.innerWidth <= 768) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();
      else goToPrevious();
    }
    setTouchStart(null);
  };

  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);

  const visibleCount = window.innerWidth >= 1200 ? 3 : window.innerWidth >= 768 ? 2 : 1;

  return (
    <section id="testimonials" className="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <header className="testimonials__header">
          <span className="features__tag">Trusted by Therapists</span>
          <h2 id="testimonials-title" className="features__title">Therapists across India trust Unfazed</h2>
          <p className="features__description">
            Join 2,000+ mental health professionals who've simplified their practice with our platform.
          </p>
        </header>

        <div className="testimonials__carousel-wrapper">
          <button
            className="testimonials__nav testimonials__nav--prev"
            onClick={goToPrevious}
            onMouseEnter={pauseAutoPlay}
            onMouseLeave={resumeAutoPlay}
            aria-label="Previous testimonial"
            disabled={window.innerWidth > 768 && currentIndex === 0}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div
            className="testimonials__carousel"
            ref={cardsRef}
            role="region"
            aria-label="Testimonials carousel"
            onMouseEnter={pauseAutoPlay}
            onMouseLeave={resumeAutoPlay}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {testimonials.map((testimonial, index) => (
              <article
                key={testimonial.id}
                className={`testimonial-card ${index === currentIndex && window.innerWidth <= 768 ? 'testimonial-card--active' : ''}`}
                role="listitem"
                style={{ flex: `0 0 calc(${100 / visibleCount}% - ${24 * (visibleCount - 1) / visibleCount}px)` }}
              >
                <div className="testimonial-card__stars" aria-label={`${testimonial.rating} out of 5 stars`} role="img">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="testimonial-card__star">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <div className="testimonial-card__content">
                  <p className="testimonial-card__text">"{testimonial.text}"</p>
                </div>
                <div className="testimonial-card__author">
                  <div
                    className="testimonial-card__avatar"
                    style={{ background: `linear-gradient(135deg, var(--${testimonial.avatarColor.replace('from-', '').replace('to-', '')})` }}
                    aria-hidden="true"
                  >
                    {testimonial.initials}
                  </div>
                  <div className="testimonial-card__info">
                    <span className="testimonial-card__name">{testimonial.author}</span>
                    <span className="testimonial-card__role">{testimonial.role}</span>
                    <span className="testimonial-card__location">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="testimonial-card__location-icon">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {testimonial.location}
                    </span>
                    <span className="testimonial-card__practice-type">{testimonial.practiceType}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button
            className="testimonials__nav testimonials__nav--next"
            onClick={goToNext}
            onMouseEnter={pauseAutoPlay}
            onMouseLeave={resumeAutoPlay}
            aria-label="Next testimonial"
            disabled={window.innerWidth > 768 && currentIndex >= testimonials.length - visibleCount}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {window.innerWidth <= 768 && (
          <div className="testimonials__dots" role="tablist" aria-label="Testimonials">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`testimonials__dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}