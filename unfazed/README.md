🛡️ UNFAZED - Mental Health SaaS Platform
UNFAZED is an all-in-one, multi-tenant Mental Health SaaS Platform designed for independent mental health practitioners and clients. It streamlines therapist practice management (EHR, SOAP notes, scheduling, CRM, billing, analytics) and provides clients with a seamless portal for booking, intake evaluation, live encrypted chat, and clinical record access.

👥 Added Demo Credentials:
Demo Client:

Email: client@unfazed.com

Password: password123

Name: Ronak Sharma

Demo Therapist:

Email: dr.sarah@unfazed.com

Password: password123

Name: Dr. Sarah Jenkins, Ph.D.

✨ Key Features
👤 Client Portal
Verified Therapist Booking: Browse verified psychological practitioners, select primary care intake concerns, and book sessions.

Psychological Intake Evaluation: Fill out baseline clinical profiles including distress severity ratings (1–10 scale), emergency contact details, and counseling goals.

Isolated Client-Practitioner Chat: Dedicated, private 1-on-1 messaging thread with the assigned therapist.

EHR Notes & Invoice Receipts: Access clinical SOAP notes shared by therapists and official payment receipts.

🩺 Therapist Practice Hub
Practice Availability Calendar: Set and manage custom time slots for client appointments.

Client CRM & Profile Directory: View assigned client lists, intake focus areas, distress severity ratings, and medical histories.

Client-Isolated Multi-Thread Chat: Switch between multiple client chat threads with complete data isolation.

Clinical SOAP Notes Builder: Record official EHR notes covering Subjective, Objective, Assessment, and Plan entries.

Billing & Revenue Ledger: Track transaction histories, invoice IDs, and payout statuses.

Practice Analytics: Monitor session counts, overall practice revenue, and patient intake distribution charts.

Credential Verification: Mandatory license verification flow before granting dashboard access.

⚙️ Platform & Enterprise Features
Config-Driven Entitlement Tiers:

BASIC: Essential features with gated Live Chat & Analytics.

PRO: All features unlocked (up to 10 active clients).

ENTERPRISE: Unlimited capacity with premium capabilities.

Razorpay Payment Integration: Full checkout integration supporting UPI / QR, Cards, Netbanking, and Wallets with hybrid fallback mechanisms.

Multi-Language Support: Instant runtime switching between English (EN), Español (ES), and Hindi (HI).

Dark / Light Theme Switcher: Adaptive CSS custom property theme engine.

Notification Engine: Persistent real-time alert dropdown for system and booking updates.

🛠️ Tech Stack
Frontend
Framework: React 19 / Vite

State Management: React Context API (ThemeContext, LanguageContext), LocalStorage State Persistence

Styling: CSS Custom Variables (/styles/theme.css), Responsive Grid Layouts

Payment Gateway: Razorpay Checkout SDK (window.Razorpay)

Utilities: crypto.randomUUID() for React Compiler pure key generation

Backend (Expected API)
Runtime: Node.js / Express.js

Database: MongoDB / Mongoose (for Session, User, and SOAP Note schemas)

Auth: JSON Web Tokens (JWT) & bcrypt password hashing

📁 Project Structure
Plaintext
unfazed-frontend/
├── src/
│   ├── App.jsx           # Main Application Container & Dual-Portal Navigation
│   ├── main.jsx          # React Entry Point
│   └── styles/
│       └── theme.css     # Dark / Light Theme variables & CSS Rules
├── public/
├── package.json
└── README.md
🚀 Getting Started
Prerequisites
Node.js: v18.x or higher

npm or yarn

Installation
Clone the Repository

Bash
git clone https://github.com/your-username/unfazed-frontend.git
cd unfazed-frontend
Install Dependencies

Bash
npm install
Configure API Base URL & Razorpay Key
Open src/App.jsx and update the constants if running on a custom backend domain or Razorpay account:

JavaScript
const API_BASE = 'http://localhost:5000/api';
const RAZORPAY_KEY = 'rzp_test_YourTestKeyHere';
Run Development Server

Bash
npm run dev
Open http://localhost:5173 in your browser.

💳 Razorpay Payment Configuration
To ensure UPI / QR payments display correctly during checkout:

Ensure currency is set to 'INR' in the checkout options.

Verify that UPI / QR is enabled under Payment Methods in your Razorpay Dashboard.

For testing in Test Mode:

UPI ID: success@razorpay

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.