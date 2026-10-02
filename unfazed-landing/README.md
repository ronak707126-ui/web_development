# Unfazed Landing Page

A modern, responsive SaaS landing page built with React, HTML5, and CSS3. No CSS frameworks used.

## Features

- **Hero Section**: Two-column layout with animated dashboard preview
- **Navbar**: Sticky glassmorphism navbar with mobile menu
- **Trust/Statistics**: 4-column responsive grid with hover effects
- **Features**: 8 feature cards with equal heights and hover animations
- **Testimonials**: 6 testimonial cards in responsive grid
- **CTA Section**: Gradient call-to-action with responsive buttons
- **Footer**: 4-column layout with brand, links, and legal

## Design System

- **Typography**: Inter font family with responsive scaling
- **Colors**: Dark theme with blue/purple/cyan gradient
- **Effects**: Glassmorphism, backdrop blur, smooth transitions
- **Responsive**: Breakpoints at 1440px, 1200px, 992px, 768px, 576px, 375px

## Tech Stack

- React 18
- Vite
- Pure CSS3 (CSS Custom Properties, Grid, Flexbox)
- No CSS frameworks

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Trust.jsx
│   ├── Features.jsx
│   ├── Testimonials.jsx
│   ├── CTA.jsx
│   └── Footer.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Responsive Breakpoints

| Breakpoint | Target Devices |
|------------|----------------|
| 1440px     | Large Desktop  |
| 1200px     | Desktop        |
| 992px      | Tablet Landscape |
| 768px      | Tablet Portrait  |
| 576px      | Mobile Large     |
| 375px      | Mobile Small     |

## Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Focus visible states
- Reduced motion support
- Color contrast compliance
- Keyboard navigation