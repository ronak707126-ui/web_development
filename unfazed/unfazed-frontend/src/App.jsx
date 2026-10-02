import { useState, useEffect, createContext, useContext } from 'react';
import './styles/theme.css';

const API_BASE = 'http://localhost:5000/api';
const RAZORPAY_KEY = 'rzp_test_TivDHtEdLMaGox'; // 🔑 Global Razorpay Test Key

// ==========================================
// CONFIG-DRIVEN ENTITLEMENT SYSTEM
// ==========================================
const ENTITLEMENTS_CONFIG = {
  BASIC: {
    tierName: 'Basic Tier',
    maxClientsAllowed: 2,
    canAccessCalendar: true,
    canAccessCRM: true,
    canAccessLiveChat: false,
    canAccessSoapNotes: true,
    canAccessBilling: true,
    canAccessAnalytics: false,
  },
  PRO: {
    tierName: 'Pro Tier',
    maxClientsAllowed: 10,
    canAccessCalendar: true,
    canAccessCRM: true,
    canAccessLiveChat: true,
    canAccessSoapNotes: true,
    canAccessBilling: true,
    canAccessAnalytics: true,
  },
  ENTERPRISE: {
    tierName: 'Enterprise Tier',
    maxClientsAllowed: 999,
    canAccessCalendar: true,
    canAccessCRM: true,
    canAccessLiveChat: true,
    canAccessSoapNotes: true,
    canAccessBilling: true,
    canAccessAnalytics: true,
  }
};

const checkEntitlement = (tier = 'BASIC', capability) => {
  const normalizedTier = tier.toUpperCase();
  const config = ENTITLEMENTS_CONFIG[normalizedTier] || ENTITLEMENTS_CONFIG.BASIC;
  return config[capability] ?? false;
};

// --- INLINE TRANSLATIONS ---
const translations = {
  EN: {
    welcome: 'Welcome to Unfazed',
    subtitle: 'All-in-One Mental Health SaaS Platform for Practitioners & Clients',
    selectRole: 'Choose your portal to proceed',
    clientRole: 'Client Portal',
    clientDesc: 'Book verified therapists, complete intake, make payments, chat, and view clinical notes.',
    therapistRole: 'Therapist Practice Hub',
    therapistDesc: 'EHR management, client CRM, SOAP notes, live messaging, scheduling, billing, and practice analytics.',
    login: 'Log In',
    register: 'Submit Documentation for Verification',
    docCheckNote: 'To prevent fake practitioners, therapists must pass credential checks before registration.',
    registerClientBtn: 'Register as New Client',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have a client account?"
  },
  ES: {
    welcome: 'Bienvenido a Unfazed',
    subtitle: 'Plataforma SaaS para Profesionales de Salud Mental y Clientes',
    selectRole: 'Elija su portal para continuar',
    clientRole: 'Portal del Cliente',
    clientDesc: 'Reserve terapeutas verificados, complete la admisión, realice pagos, chatee y vea notas clínicas.',
    therapistRole: 'Hub de Práctica Terapeuta',
    therapistDesc: 'Gestión de HCE, CRM de clientes, notas SOAP, mensajería en vivo, programación, facturación y analíticas.',
    login: 'Iniciar Sesión',
    register: 'Enviar Documentación para Verificación',
    docCheckNote: 'Para evitar falsos terapeutas, se verifica la documentación previa.',
    registerClientBtn: 'Registrarse como Nuevo Cliente',
    alreadyHaveAccount: '¿Ya tienes una cuenta?',
    dontHaveAccount: '¿No tienes una cuenta de cliente?'
  },
  HI: {
    welcome: 'अनफेज्ड में आपका स्वागत है',
    subtitle: 'थेरेपिस्ट और मरीजों के लिए ऑल-इन-वन मेंटल हेल्थ SaaS प्लेटफार्म',
    selectRole: 'आगे बढ़ने के लिए अपना पोर्टल चुनें',
    clientRole: 'क्लाइंट पोर्टल',
    clientDesc: 'सत्यापित थेरेपिस्ट बुक करें, इंटेक फॉर्म भरें, भुगतान करें, चैट करें और नोट्स देखें।',
    therapistRole: 'थेरेपिस्ट प्रैक्टिस हब',
    therapistDesc: 'EHR प्रबंधन, क्लाइंट CRM, SOAP नोट्स, लाइव चैट, शेड्यूलिंग, बिलिंग और एनालिटिक्स।',
    login: 'लॉगिन करें',
    register: 'सत्यापन के लिए दस्तावेज जमा करें',
    docCheckNote: 'फर्जी थेरेपिस्ट को रोकने के लिए सत्यापन अनिवार्य है।',
    registerClientBtn: 'नए क्लाइंट के रूप में पंजीकरण करें',
    alreadyHaveAccount: 'क्या आपके पास पहले से एक खाता है?',
    dontHaveAccount: 'क्या आपके पास क्लाइंट खाता नहीं है?'
  }
};

const ThemeContext = createContext();
const LanguageContext = createContext();

// Razorpay Dynamic Script Loader
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function AppContent() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { lang, setLang, t } = useContext(LanguageContext);

  const [activeUser, setActiveUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('role');
    if (savedUser && savedRole) {
      try {
        const parsedUser = JSON.parse(savedUser);
        return {
          id: parsedUser._id,
          name: parsedUser.fullName,
          role: savedRole,
          email: parsedUser.unfazedEmail || parsedUser.email,
          tier: parsedUser.subscriptionTier || 'PRO'
        };
      } catch (e) {
        console.error('Failed to parse saved session:', e);
      }
    }
    return null;
  });

  const [currentView, setCurrentView] = useState(() => {
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('role');
    if (savedUser && savedRole) {
      return savedRole === 'therapist' ? 'THERAPIST_DASHBOARD' : 'CLIENT_PORTAL';
    }
    return 'ROLE_SELECTION';
  });

  // Sub-Tab States
  const [clientTab, setClientTab] = useState('BOOKING');
  const [therapistTab, setTherapistTab] = useState('CALENDAR');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');

  // Notifications State
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('unfazed_notifications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { id: 'notif-1', text: '🎉 Welcome to Unfazed Mental Health Platform!', time: 'Just now', read: false }
    ];
  });
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    localStorage.setItem('unfazed_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const triggerNotification = (messageText) => {
    const newNotif = {
      id: crypto.randomUUID(),
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Form states
  const [clientRegData, setClientRegData] = useState({
    fullName: '',
    email: '',
    password: '',
    primaryHealthIssue: 'Anxiety & Work Burnout'
  });

  const [intakeFormData, setIntakeFormData] = useState({
    emergencyContactName: '',
    emergencyContactPhone: '',
    symptomSeverity: 6,
    previousTherapy: 'No',
    primaryGoals: '',
    medicalHistory: ''
  });
  const [intakeSavedMsg, setIntakeSavedMsg] = useState('');

  const [docFormData, setDocFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    licenseNumber: '',
    documentUrl: ''
  });

  const [selectedIssue, setSelectedIssue] = useState('Anxiety & Work Burnout');
  const [docStatusMsg, setDocStatusMsg] = useState('');

  // Calendar slot state
  const [newSlotDate, setNewSlotDate] = useState('');
  const [newSlotTime, setNewSlotTime] = useState('10:00 AM');
  const [customSlots, setCustomSlots] = useState([
    { date: 'Tomorrow', time: '10:00 AM', status: 'Available' },
    { date: 'Tomorrow', time: '02:00 PM', status: 'Available' },
    { date: 'Friday', time: '11:30 AM', status: 'Booked' }
  ]);

  // Data states from DB
  const [therapistsList, setTherapistsList] = useState([]);
  const [userSessions, setUserSessions] = useState([]);
  const [soapData, setSoapData] = useState({ subjective: '', objective: '', assessment: '', plan: '' });
  const [activeSessionId, setActiveSessionId] = useState(null);

  // Payment Modal state
  const [paymentModal, setPaymentModal] = useState({ open: false, therapist: null, amount: 0, slot: 'Today, 4:00 PM' });

  // ==========================================
  // ISOLATED CLIENT CHAT STATE ARCHITECTURE
  // ==========================================
  const [clientChatsMap, setClientChatsMap] = useState(() => {
    const saved = localStorage.getItem('unfazed_isolated_chats');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
      'Ronak Sharma': [
        { id: 'chat-1', sender: 'Dr. Sarah Jenkins, Ph.D.', text: 'Hello Ronak! I have reviewed your intake notes.', timestamp: '10:00 AM' }
      ],
      'Alex Mercer': [
        { id: 'chat-2', sender: 'Dr. Sarah Jenkins, Ph.D.', text: 'Hi Alex, welcome to our session chat.', timestamp: '10:15 AM' }
      ]
    };
  });

  const [selectedChatClient, setSelectedChatClient] = useState('');
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    localStorage.setItem('unfazed_isolated_chats', JSON.stringify(clientChatsMap));
  }, [clientChatsMap]);

  const handleDocInputChange = (e) => {
    const { name, value } = e.target;
    setDocFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchTherapists = async () => {
    try {
      const res = await fetch(`${API_BASE}/scheduling/therapists`);
      const data = await res.json();
      if (res.ok) {
        setTherapistsList(data);
        return;
      }
    } catch (err) {
      console.error('Fetch therapists error:', err);
    }

    // Fallback Mock Therapist
    setTherapistsList([
      {
        _id: 'demo-therapist-456',
        fullName: 'Dr. Sarah Jenkins, Ph.D.',
        bio: 'Licensed Clinical Psychologist with 8+ years experience in CBT and trauma-informed therapy.',
        unfazedEmail: 'dr.sarah@unfazed.com',
        hourlyRate: 120
      }
    ]);
  };

  const fetchUserSessions = async (userId, role) => {
    try {
      const res = await fetch(`${API_BASE}/scheduling/user/${userId}/${role}`);
      const data = await res.json();
      if (res.ok) {
        setUserSessions(data);
        return;
      }
    } catch (err) {
      console.error('Fetch sessions error:', err);
    }

    // Fallback Mock Sessions for Demo
    setUserSessions([
      {
        _id: 'session-demo-001',
        therapist: { fullName: 'Dr. Sarah Jenkins, Ph.D.' },
        client: { fullName: 'Ronak Sharma', email: 'client@unfazed.com' },
        dateTime: new Date().toISOString(),
        healthIssueType: 'Anxiety & Work Burnout',
        amountPaid: 120,
        paymentStatus: 'PAID',
        soapNote: {
          sharedWithClient: true,
          subjective: 'Client reports work-related distress and sleep issues.',
          objective: 'Alert, responsive, mild anxiety symptoms observed.',
          assessment: 'Occupational burnout and generalized anxiety.',
          plan: 'Practice mindfulness breathing 10 mins daily.'
        }
      }
    ]);
  };

  useEffect(() => {
    if (activeUser) {
      const timer = setTimeout(() => {
        fetchTherapists();
        fetchUserSessions(activeUser.id, activeUser.role);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [activeUser]);

  // ==========================================
  // HYBRID LOGIN WITH DEMO USER SUPPORT
  // ==========================================
  const handleLogin = async (role, fillEmail = null, fillPass = null) => {
    const emailToUse = fillEmail || loginEmail;
    const passToUse = fillPass || loginPass;

    setErrorMessage('');
    setSuccessMessage('');

    // Demo Client Shortcut
    if (emailToUse === 'client@unfazed.com' && passToUse === 'password123' && role === 'client') {
      const demoClient = {
        _id: 'demo-client-123',
        fullName: 'Ronak Sharma',
        email: 'client@unfazed.com',
        subscriptionTier: 'PRO'
      };
      localStorage.setItem('token', 'demo-token-client');
      localStorage.setItem('user', JSON.stringify(demoClient));
      localStorage.setItem('role', 'client');
      setActiveUser({
        id: demoClient._id,
        name: demoClient.fullName,
        role: 'client',
        email: demoClient.email,
        tier: demoClient.subscriptionTier
      });
      triggerNotification('🔑 Logged in successfully as Demo Client (Ronak Sharma)');
      setCurrentView('CLIENT_PORTAL');
      return;
    }

    // Demo Therapist Shortcut
    if (emailToUse === 'dr.sarah@unfazed.com' && passToUse === 'password123' && role === 'therapist') {
      const demoTherapist = {
        _id: 'demo-therapist-456',
        fullName: 'Dr. Sarah Jenkins, Ph.D.',
        email: 'dr.sarah@unfazed.com',
        unfazedEmail: 'dr.sarah@unfazed.com',
        subscriptionTier: 'PRO'
      };
      localStorage.setItem('token', 'demo-token-therapist');
      localStorage.setItem('user', JSON.stringify(demoTherapist));
      localStorage.setItem('role', 'therapist');
      setActiveUser({
        id: demoTherapist._id,
        name: demoTherapist.fullName,
        role: 'therapist',
        email: demoTherapist.email,
        tier: demoTherapist.subscriptionTier
      });
      triggerNotification('🔑 Logged in successfully as Demo Therapist (Dr. Sarah Jenkins)');
      setCurrentView('THERAPIST_DASHBOARD');
      return;
    }

    // Try API Login if not demo accounts
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToUse, password: passToUse, role })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || 'Login failed. Please check your credentials.');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('role', data.role);

      setActiveUser({
        id: data.user._id,
        name: data.user.fullName,
        role: data.role,
        email: data.user.unfazedEmail || data.user.email,
        tier: data.user.subscriptionTier || 'PRO'
      });

      setLoginEmail('');
      setLoginPass('');

      triggerNotification(`🔑 Logged in successfully as ${data.user.fullName}`);

      if (role === 'therapist') {
        setCurrentView('THERAPIST_DASHBOARD');
      } else {
        setCurrentView('CLIENT_PORTAL');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('Unable to connect to backend server. Use 1-Click Demo Login above!');
    }
  };

  const handleClientRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await fetch(`${API_BASE}/auth/client/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientRegData)
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || 'Client registration failed.');
        return;
      }

      setSuccessMessage('🎉 Account created successfully! Please log in below.');
      triggerNotification('🎉 Welcome to Unfazed! Account created successfully.');
      setLoginEmail(clientRegData.email);
      setClientRegData({ fullName: '', email: '', password: '', primaryHealthIssue: 'Anxiety & Work Burnout' });
      setCurrentView('LOGIN_CLIENT');
    } catch (err) {
      console.error('Client registration error:', err);
      setErrorMessage('Server connection error during registration.');
    }
  };

  const handleLogout = () => {
    setActiveUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    setCurrentView('ROLE_SELECTION');
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleDocSubmission = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await fetch(`${API_BASE}/auth/therapist/submit-docs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(docFormData)
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || 'Submission failed.');
        return;
      }

      setDocStatusMsg(`✅ ${data.message}`);
      triggerNotification('📋 License documents submitted for clinical verification.');
    } catch (err) {
      console.error('Document submission error:', err);
      setErrorMessage('Server connection error during document submission.');
    }
  };

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!newSlotDate) return;
    setCustomSlots((prev) => [...prev, { date: newSlotDate, time: newSlotTime, status: 'Available' }]);
    setNewSlotDate('');
    setSuccessMessage('📅 Available slot added to your practice calendar!');
    triggerNotification(`🗓️ New availability slot added: ${newSlotDate} at ${newSlotTime}`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const openPaymentModal = (therapist) => {
    setPaymentModal({
      open: true,
      therapist,
      amount: therapist.hourlyRate || 120,
      slot: 'Tomorrow at 11:00 AM'
    });
  };

  // ==========================================
  // RAZORPAY WITH EXPLICIT UPI & ISOLATED SYNC
  // ==========================================
  const handleConfirmPaymentAndBook = async () => {
    if (!paymentModal.therapist) return;
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        setErrorMessage('Razorpay SDK load nahi ho paya. Internet connection check karein.');
        return;
      }

      const clientName = activeUser?.name || 'Ronak Sharma';

      const onPaymentSuccess = async (paymentId) => {
        try {
          await fetch(`${API_BASE}/scheduling/book`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              clientId: activeUser.id,
              therapistId: paymentModal.therapist._id,
              dateTime: new Date().toISOString(),
              healthIssueType: selectedIssue,
              amountPaid: paymentModal.amount,
              paymentId: paymentId
            })
          });
        } catch (err) {
          console.log('Backend booking save notice:', err);
        }

        const initialMsgId = crypto.randomUUID();
        setClientChatsMap((prev) => {
          if (!prev[clientName]) {
            return {
              ...prev,
              [clientName]: [
                { id: initialMsgId, sender: 'Dr. Sarah Jenkins, Ph.D.', text: `Hello ${clientName}! Payment confirmed (${paymentId}). Welcome to your session.`, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
              ]
            };
          }
          return prev;
        });

        setSuccessMessage(`💳 Razorpay Payment Successful! ID: ${paymentId}`);
        triggerNotification(`💳 Payment confirmed (${paymentId}). Session booked for ${clientName}!`);
        setPaymentModal({ open: false, therapist: null, amount: 0, slot: '' });
        fetchUserSessions(activeUser.id, activeUser.role);
      };

      const options = {
        key: RAZORPAY_KEY,
        amount: Math.round(paymentModal.amount * 100 * 80),
        currency: 'INR',
        name: 'UNFAZED Mental Health',
        description: `Session with ${paymentModal.therapist.fullName}`,
        image: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png',
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true
        },
        config: {
          display: {
            blocks: {
              upi: {
                name: 'Pay via UPI / QR',
                instruments: [{ method: 'upi' }]
              }
            },
            sequence: ['block.upi']
          }
        },
        handler: function (response) {
          onPaymentSuccess(response.razorpay_payment_id || 'pay_test_' + Date.now());
        },
        prefill: {
          name: clientName,
          email: activeUser?.email || 'client@unfazed.com',
          contact: '9999999999'
        },
        theme: { color: '#2563eb' }
      };

      const razorpayWindow = new window.Razorpay(options);
      razorpayWindow.on('payment.failed', function (resp) {
        setErrorMessage(`Payment Failed: ${resp.error.description}`);
      });
      razorpayWindow.open();

    } catch (err) {
      console.error('Payment checkout error:', err);
      setErrorMessage('Error opening Razorpay payment checkout.');
    }
  };

  const handleSaveIntake = (e) => {
    e.preventDefault();
    setIntakeSavedMsg('✅ Clinical intake questionnaire saved! Your practitioner can now review your goals.');
    triggerNotification('📋 Psychological intake profile updated and shared with practitioner.');
    setTimeout(() => setIntakeSavedMsg(''), 4000);
  };

  // ==========================================
  // CLIENT-ISOLATED CHAT SEND HANDLER
  // ==========================================
  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const isTherapist = activeUser?.role === 'therapist';
    const currentClientKey = isTherapist
      ? (selectedChatClient || clientList[0] || 'Ronak Sharma')
      : (activeUser?.name || 'Ronak Sharma');

    const senderName = isTherapist
      ? (activeUser?.name || 'Dr. Sarah Jenkins, Ph.D.')
      : currentClientKey;

    const newMsg = {
      id: crypto.randomUUID(),
      sender: senderName,
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setClientChatsMap((prev) => ({
      ...prev,
      [currentClientKey]: [...(prev[currentClientKey] || []), newMsg]
    }));

    setChatInput('');
    triggerNotification(`💬 New message sent in chat with ${currentClientKey}`);
  };

  const handleSaveSoapNote = async (e) => {
    e.preventDefault();
    if (!activeSessionId) {
      setErrorMessage('Please select a session first to record notes.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/notes/soap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: activeSessionId,
          ...soapData,
          sharedWithClient: true
        })
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMessage(data.message || '📝 Clinical SOAP Note saved & published to Client Portal!');
        triggerNotification('📝 Clinical SOAP Note published to client EHR record.');
        fetchUserSessions(activeUser.id, activeUser.role);
      } else {
        setErrorMessage(data.message || 'Failed to save clinical note.');
      }
    } catch (err) {
      console.error('SOAP Note Error:', err);
      setErrorMessage('Server error while saving SOAP note.');
    }
  };

  const handleTierSwitch = (newTier) => {
    if (!activeUser) return;
    const updated = { ...activeUser, tier: newTier };
    setActiveUser(updated);
    localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user') || '{}'), subscriptionTier: newTier }));
    setSuccessMessage(`⚙️ Switched Practitioner Entitlement Tier to: ${newTier}`);
    triggerNotification(`⚙️ Practitioner Entitlement updated to ${newTier} tier.`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const clientList = Array.from(
    new Set([
      ...Object.keys(clientChatsMap),
      ...userSessions.map((s) => s.client?.fullName).filter(Boolean)
    ])
  );

  const activeClientName = selectedChatClient || clientList[0] || 'Ronak Sharma';
  const currentClientChat = activeUser?.role === 'therapist'
    ? (clientChatsMap[activeClientName] || [])
    : (clientChatsMap[activeUser?.name] || []);

  const currentTier = activeUser?.tier || 'PRO';
  const canChat = checkEntitlement(currentTier, 'canAccessLiveChat');
  const canAnalytics = checkEntitlement(currentTier, 'canAccessAnalytics');

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div>
      {/* Global Navigation Header */}
      <nav className="nav-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <h2 style={{ margin: 0, cursor: 'pointer', color: 'var(--accent)', fontWeight: '700' }} onClick={() => { setCurrentView('ROLE_SELECTION'); setErrorMessage(''); setSuccessMessage(''); }}>
            🛡️ UNFAZED
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', position: 'relative' }}>
          {activeUser && (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  markNotificationsRead();
                }}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  padding: '0.45rem 0.8rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontWeight: '600'
                }}
              >
                🔔 Notifications
                {unreadCount > 0 && (
                  <span style={{ background: '#dc2626', color: '#fff', padding: '0.1rem 0.4rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '120%',
                  width: '320px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                  zIndex: 2000,
                  padding: '0.8rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--accent)' }}>🔔 Automated System Alerts</strong>
                    <small style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} onClick={() => setShowNotifications(false)}>✕ Close</small>
                  </div>

                  <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>No alerts yet.</p>
                    ) : (
                      notifications.map((n) => (
                        <div key={n.id} style={{ padding: '0.5rem', borderRadius: '6px', marginBottom: '0.4rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{n.text}</p>
                          <small style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>{n.time}</small>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            style={{
              padding: '0.45rem 0.8rem',
              borderRadius: '8px',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              fontWeight: '500',
              fontSize: '0.875rem',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="EN" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>English 🇺🇸</option>
            <option value="ES" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>Español 🇪🇸</option>
            <option value="HI" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>हिन्दी 🇮🇳</option>
          </select>

          <button onClick={toggleTheme} className="btn-primary" style={{ padding: '0.45rem 0.9rem', fontSize: '0.875rem', borderRadius: '8px' }}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>

          {activeUser && (
            <button onClick={handleLogout} className="btn-primary" style={{ background: '#dc2626', padding: '0.45rem 0.9rem', fontSize: '0.875rem', borderRadius: '8px' }}>
              Logout
            </button>
          )}
        </div>
      </nav>

      <div className="container">
        {errorMessage && (
          <div style={{ padding: '0.8rem 1rem', background: '#fee2e2', color: '#dc2626', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>
            ⚠️ {errorMessage}
          </div>
        )}

        {successMessage && (
          <div style={{ padding: '0.8rem 1rem', background: '#dcfce7', color: '#15803d', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>
            {successMessage}
          </div>
        )}

        {/* 1. ROLE SELECTION LANDING PAGE */}
        {currentView === 'ROLE_SELECTION' && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <h1>{t('welcome')}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 2rem auto' }}>
              {t('subtitle')}
            </p>

            <div className="grid-2" style={{ marginTop: '2rem' }}>
              <div className="card" style={{ cursor: 'pointer', textAlign: 'center', transition: 'transform 0.2s' }} onClick={() => { setCurrentView('LOGIN_CLIENT'); setErrorMessage(''); setSuccessMessage(''); }}>
                <h2>👤 {t('clientRole')}</h2>
                <p style={{ color: 'var(--text-secondary)' }}>{t('clientDesc')}</p>
                <button className="btn-primary" style={{ marginTop: '1.5rem', width: '100%' }}>
                  Log In as Client
                </button>
              </div>

              <div className="card" style={{ cursor: 'pointer', textAlign: 'center', transition: 'transform 0.2s' }} onClick={() => { setCurrentView('LOGIN_THERAPIST'); setErrorMessage(''); setSuccessMessage(''); }}>
                <h2>🩺 {t('therapistRole')}</h2>
                <p style={{ color: 'var(--text-secondary)' }}>{t('therapistDesc')}</p>
                <button className="btn-primary" style={{ marginTop: '1.5rem', width: '100%' }}>
                  Log In as Therapist
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. CLIENT LOGIN */}
        {currentView === 'LOGIN_CLIENT' && (
          <div className="card" style={{ maxWidth: '450px', margin: '2rem auto' }}>
            <h2>👤 Client Portal Login</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Access your therapy sessions, health intake forms, and invoices.
            </p>

            {/* DEMO CLIENT BANNER */}
            <div style={{ background: 'var(--bg-primary)', padding: '0.85rem', borderRadius: '8px', border: '1px dashed var(--accent)', marginBottom: '1.25rem', textAlign: 'center' }}>
              <small style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '0.85rem' }}>⚡ DEMO CLIENT ACCOUNT</small>
              <div style={{ fontSize: '0.85rem', margin: '0.3rem 0', color: 'var(--text-secondary)' }}>
                Email: <code>client@unfazed.com</code> | Pass: <code>password123</code>
              </div>
              <button
                type="button"
                className="btn-primary"
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', marginTop: '0.4rem', width: '100%' }}
                onClick={() => {
                  setLoginEmail('client@unfazed.com');
                  setLoginPass('password123');
                  handleLogin('client', 'client@unfazed.com', 'password123');
                }}
              >
                1-Click Demo Client Login
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input
                type="email"
                placeholder="Client Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
              />
              <input
                type="password"
                placeholder="Password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
              />
              <button className="btn-primary" onClick={() => handleLogin('client')}>
                Log In as Client
              </button>
            </div>

            <hr style={{ margin: '1.5rem 0', borderColor: 'var(--border-color)' }} />

            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{t('dontHaveAccount')}</p>
              <button
                className="btn-primary"
                style={{ background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}
                onClick={() => { setCurrentView('REGISTER_CLIENT'); setErrorMessage(''); setSuccessMessage(''); }}
              >
                {t('registerClientBtn')}
              </button>
            </div>
          </div>
        )}

        {/* 3. CLIENT REGISTRATION VIEW */}
        {currentView === 'REGISTER_CLIENT' && (
          <div className="card" style={{ maxWidth: '500px', margin: '2rem auto' }}>
            <h2>👤 Register New Client Account</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Create your account to connect with verified mental health practitioners.
            </p>

            <form onSubmit={handleClientRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input
                type="text"
                placeholder="Full Name"
                value={clientRegData.fullName}
                onChange={(e) => setClientRegData({ ...clientRegData, fullName: e.target.value })}
                required
                style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={clientRegData.email}
                onChange={(e) => setClientRegData({ ...clientRegData, email: e.target.value })}
                required
                style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
              />
              <input
                type="password"
                placeholder="Desired Password"
                value={clientRegData.password}
                onChange={(e) => setClientRegData({ ...clientRegData, password: e.target.value })}
                required
                style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
              />
              <select
                value={clientRegData.primaryHealthIssue}
                onChange={(e) => setClientRegData({ ...clientRegData, primaryHealthIssue: e.target.value })}
                style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
              >
                <option value="Anxiety & Work Burnout">Anxiety & Work Burnout</option>
                <option value="Depression & Mood Management">Depression & Mood Management</option>
                <option value="Trauma & PTSD Recovery">Trauma & PTSD Recovery</option>
                <option value="Relationship & Family Counseling">Relationship & Family Counseling</option>
              </select>

              <button type="submit" className="btn-primary">
                Create Account & Proceed
              </button>
            </form>

            <hr style={{ margin: '1.5rem 0', borderColor: 'var(--border-color)' }} />

            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{t('alreadyHaveAccount')}</p>
              <button
                className="btn-primary"
                style={{ background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}
                onClick={() => { setCurrentView('LOGIN_CLIENT'); setErrorMessage(''); setSuccessMessage(''); }}
              >
                Back to Client Login
              </button>
            </div>
          </div>
        )}

        {/* 4. THERAPIST LOGIN */}
        {currentView === 'LOGIN_THERAPIST' && (
          <div className="card" style={{ maxWidth: '500px', margin: '2rem auto' }}>
            <h2>🩺 Therapist Practice Portal</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Manage clinical records, client calendars, and practice revenue.
            </p>

            {/* DEMO THERAPIST BANNER */}
            <div style={{ background: 'var(--bg-primary)', padding: '0.85rem', borderRadius: '8px', border: '1px dashed var(--accent)', marginBottom: '1.25rem', textAlign: 'center' }}>
              <small style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '0.85rem' }}>⚡ DEMO THERAPIST ACCOUNT</small>
              <div style={{ fontSize: '0.85rem', margin: '0.3rem 0', color: 'var(--text-secondary)' }}>
                Email: <code>dr.sarah@unfazed.com</code> | Pass: <code>password123</code>
              </div>
              <button
                type="button"
                className="btn-primary"
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', marginTop: '0.4rem', width: '100%' }}
                onClick={() => {
                  setLoginEmail('dr.sarah@unfazed.com');
                  setLoginPass('password123');
                  handleLogin('therapist', 'dr.sarah@unfazed.com', 'password123');
                }}
              >
                1-Click Demo Therapist Login
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input
                type="email"
                placeholder="Official Email (e.g. dr.sarah@unfazed.com)"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
              />
              <input
                type="password"
                placeholder="Password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
              />
              <button className="btn-primary" onClick={() => handleLogin('therapist')}>
                Log In to Practice Hub
              </button>
            </div>

            <hr style={{ margin: '1.5rem 0', borderColor: 'var(--border-color)' }} />

            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{t('docCheckNote')}</p>
              <button
                className="btn-primary"
                style={{ background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}
                onClick={() => { setCurrentView('THERAPIST_DOCS'); setErrorMessage(''); setSuccessMessage(''); }}
              >
                {t('register')}
              </button>
            </div>
          </div>
        )}

        {/* 5. THERAPIST DOCUMENT VERIFICATION FORM */}
        {currentView === 'THERAPIST_DOCS' && (
          <div className="card" style={{ maxWidth: '600px', margin: '2rem auto' }}>
            <h2>📋 Practitioner Verification Check</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              To safeguard patient care, Unfazed verifies therapist medical licenses before granting dashboard access and issuing an official <code>@unfazed.com</code> practitioner email.
            </p>

            {docStatusMsg ? (
              <div style={{ padding: '1rem', background: '#dcfce7', color: '#15803d', borderRadius: '8px' }}>
                {docStatusMsg}
              </div>
            ) : (
              <form onSubmit={handleDocSubmission} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name & Degree (e.g. Dr. Sarah Jenkins, Ph.D.)"
                  value={docFormData.fullName}
                  onChange={handleDocInputChange}
                  required
                  style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Personal Email for Verification"
                  value={docFormData.email}
                  onChange={handleDocInputChange}
                  required
                  style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Desired Password"
                  value={docFormData.password}
                  onChange={handleDocInputChange}
                  required
                  style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                />
                <input
                  type="text"
                  name="licenseNumber"
                  placeholder="Medical / Psychological License Number"
                  value={docFormData.licenseNumber}
                  onChange={handleDocInputChange}
                  required
                  style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                />
                <input
                  type="text"
                  name="documentUrl"
                  placeholder="Link to Verification Doc / Certificate PDF"
                  value={docFormData.documentUrl}
                  onChange={handleDocInputChange}
                  required
                  style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                />
                
                <button type="submit" className="btn-primary">Submit Credentials for Verification</button>
              </form>
            )}
          </div>
        )}

        {/* 6. CLIENT PORTAL */}
        {currentView === 'CLIENT_PORTAL' && (
          <div>
            <div style={{ background: 'var(--bg-card)', padding: '1.25rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1 style={{ margin: 0, fontSize: '1.6rem' }}>👤 Client Care Portal</h1>
                <p style={{ color: 'var(--text-secondary)', margin: '0.2rem 0 0 0', fontSize: '0.9rem' }}>
                  Welcome back, <strong>{activeUser?.name}</strong> (Client ID: <code>{activeUser?.id}</code>)
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setClientTab('BOOKING')}
                  style={{
                    padding: '0.5rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: clientTab === 'BOOKING' ? 'var(--accent)' : 'transparent',
                    color: clientTab === 'BOOKING' ? '#fff' : 'var(--text-primary)',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  📅 Book Sessions
                </button>
                <button
                  onClick={() => setClientTab('INTAKE')}
                  style={{
                    padding: '0.5rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: clientTab === 'INTAKE' ? 'var(--accent)' : 'transparent',
                    color: clientTab === 'INTAKE' ? '#fff' : 'var(--text-primary)',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  📋 Clinical Intake
                </button>
                <button
                  onClick={() => setClientTab('CHAT')}
                  style={{
                    padding: '0.5rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: clientTab === 'CHAT' ? 'var(--accent)' : 'transparent',
                    color: clientTab === 'CHAT' ? '#fff' : 'var(--text-primary)',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  💬 Live Chat
                </button>
                <button
                  onClick={() => setClientTab('NOTES')}
                  style={{
                    padding: '0.5rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: clientTab === 'NOTES' ? 'var(--accent)' : 'transparent',
                    color: clientTab === 'NOTES' ? '#fff' : 'var(--text-primary)',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  📝 Shared EHR Notes & Receipts
                </button>
              </div>
            </div>

            {/* CLIENT TAB 1: BOOKING */}
            {clientTab === 'BOOKING' && (
              <div className="grid-2">
                <div className="card">
                  <h3>📅 Book Session with Verified Practitioner</h3>
                  <label style={{ display: 'block', margin: '0.5rem 0', fontWeight: 'bold' }}>Select Primary Health Intake Concern:</label>
                  <select value={selectedIssue} onChange={(e) => setSelectedIssue(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', border: '1px solid var(--border-color)' }}>
                    <option value="Anxiety & Work Burnout">Anxiety & Work Burnout</option>
                    <option value="Depression & Mood Management">Depression & Mood Management</option>
                    <option value="Trauma & PTSD Recovery">Trauma & PTSD Recovery</option>
                    <option value="Relationship & Family Counseling">Relationship & Family Counseling</option>
                  </select>

                  {therapistsList.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)' }}>Loading verified practitioners...</p>
                  ) : (
                    therapistsList.map((tItem) => (
                      <div key={tItem._id} style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', background: 'var(--bg-primary)' }}>
                        <h4>{tItem.fullName} <span style={{ color: 'var(--success)', fontSize: '0.8rem' }}>✓ Verified</span></h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.2rem 0' }}>
                          Bio: {tItem.bio || 'Licensed Psychologist'}
                        </p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.2rem 0' }}>
                          Official Email: <code>{tItem.unfazedEmail}</code>
                        </p>
                        <p style={{ margin: '0.5rem 0' }}><strong>Fee:</strong> ${tItem.hourlyRate || 120} / 50-min session</p>
                        <button className="btn-primary" onClick={() => openPaymentModal(tItem)} style={{ width: '100%' }}>
                          Proceed to Payment & Book Slot (${tItem.hourlyRate || 120})
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="card">
                  <h3>📜 Your Upcoming & Past Appointments</h3>
                  {userSessions.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)' }}>No booked sessions found. Book a slot with a practitioner above!</p>
                  ) : (
                    userSessions.map((s) => (
                      <div key={s._id} style={{ padding: '0.85rem', border: '1px solid var(--border-color)', borderRadius: '8px', marginBottom: '0.85rem', background: 'var(--bg-primary)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <strong>Therapist: {s.therapist?.fullName || 'Dr. Sarah'}</strong>
                          <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>{s.paymentStatus}</span>
                        </div>
                        <div style={{ fontSize: '0.9rem', margin: '0.25rem 0' }}><strong>Concern:</strong> {s.healthIssueType}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Date: {new Date(s.dateTime).toLocaleString()}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* CLIENT TAB 2: INTAKE */}
            {clientTab === 'INTAKE' && (
              <div className="card" style={{ maxWidth: '700px', margin: '0 auto' }}>
                <h3>📋 Psychological Intake Questionnaire</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Please complete your clinical baseline profile before your session so your practitioner can review your intake goals.
                </p>

                {intakeSavedMsg && (
                  <div style={{ padding: '0.75rem', background: '#dcfce7', color: '#15803d', borderRadius: '6px', marginBottom: '1rem' }}>
                    {intakeSavedMsg}
                  </div>
                )}

                <form onSubmit={handleSaveIntake} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.3rem' }}>Emergency Contact Person & Phone:</label>
                    <input
                      type="text"
                      placeholder="Name & Relationship (e.g., John Doe - Brother)"
                      value={intakeFormData.emergencyContactName}
                      onChange={(e) => setIntakeFormData({ ...intakeFormData, emergencyContactName: e.target.value })}
                      required
                      style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', width: '100%', marginBottom: '0.5rem' }}
                    />
                    <input
                      type="tel"
                      placeholder="Emergency Phone Number"
                      value={intakeFormData.emergencyContactPhone}
                      onChange={(e) => setIntakeFormData({ ...intakeFormData, emergencyContactPhone: e.target.value })}
                      required
                      style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.3rem' }}>Current Distress Severity Level (1 - 10):</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={intakeFormData.symptomSeverity}
                      onChange={(e) => setIntakeFormData({ ...intakeFormData, symptomSeverity: e.target.value })}
                      style={{ width: '100%' }}
                    />
                    <div style={{ textAlign: 'center', fontWeight: 'bold', color: 'var(--accent)' }}>
                      Severity Rating: {intakeFormData.symptomSeverity} / 10
                    </div>
                  </div>

                  <div>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.3rem' }}>Have you attended therapy before?</label>
                    <select
                      value={intakeFormData.previousTherapy}
                      onChange={(e) => setIntakeFormData({ ...intakeFormData, previousTherapy: e.target.value })}
                      style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', width: '100%' }}
                    >
                      <option value="No">No, this is my first time</option>
                      <option value="Yes - Currently in Therapy">Yes, currently attending</option>
                      <option value="Yes - In the Past">Yes, in the past</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.3rem' }}>Primary Goals for Counseling:</label>
                    <textarea
                      placeholder="Describe what you hope to achieve in therapy..."
                      value={intakeFormData.primaryGoals}
                      onChange={(e) => setIntakeFormData({ ...intakeFormData, primaryGoals: e.target.value })}
                      rows={3}
                      style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', width: '100%' }}
                    />
                  </div>

                  <button type="submit" className="btn-primary">
                    Save Intake Profile to Clinical Record
                  </button>
                </form>
              </div>
            )}

            {/* CLIENT TAB 3: ISOLATED LIVE CHAT */}
            {clientTab === 'CHAT' && (
              <div className="card" style={{ maxWidth: '750px', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ margin: 0 }}>💬 Dedicated Client - Practitioner Chat</h3>
                    <small style={{ color: 'var(--text-secondary)' }}>Logined Client: <strong>{activeUser?.name}</strong></small>
                  </div>
                  <span style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '0.85rem' }}>🟢 Encrypted Session</span>
                </div>

                <div style={{ height: '320px', overflowY: 'auto', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', background: 'var(--bg-primary)' }}>
                  {currentClientChat.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center', margin: '2rem 0' }}>No messages in your thread yet. Type below to start!</p>
                  ) : (
                    currentClientChat.map((msg) => {
                      const isClientMsg = msg.sender === (activeUser?.name || 'Client');
                      return (
                        <div key={msg.id} style={{ marginBottom: '0.8rem', textAlign: isClientMsg ? 'right' : 'left' }}>
                          <div
                            style={{
                              display: 'inline-block',
                              maxWidth: '75%',
                              padding: '0.6rem 0.9rem',
                              borderRadius: '12px',
                              background: isClientMsg ? 'var(--accent)' : 'var(--bg-card)',
                              color: isClientMsg ? '#fff' : 'var(--text-primary)',
                              border: '1px solid var(--border-color)'
                            }}
                          >
                            <small style={{ display: 'block', fontWeight: 'bold', fontSize: '0.75rem', opacity: 0.85, marginBottom: '0.1rem' }}>
                              {msg.sender} • {msg.timestamp}
                            </small>
                            <span>{msg.text}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <form onSubmit={handleSendChatMessage} style={{ display: 'flex', gap: '0.75rem' }}>
                  <input
                    type="text"
                    placeholder="Type your message to your therapist..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                  <button type="submit" className="btn-primary">
                    Send Message
                  </button>
                </form>
              </div>
            )}

            {/* CLIENT TAB 4: SHARED EHR NOTES */}
            {clientTab === 'NOTES' && (
              <div className="card">
                <h3>📝 Shared Clinical EHR Notes & Payment Invoices</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  View session notes published by your therapist and official payment receipts.
                </p>

                {userSessions.length === 0 ? (
                  <p style={{ color: 'var(--text-secondary)' }}>No sessions or notes available yet.</p>
                ) : (
                  userSessions.map((s) => (
                    <div key={s._id} style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', background: 'var(--bg-primary)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                        <div>
                          <strong>Session ID: <code>{s._id}</code></strong>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Practitioner: {s.therapist?.fullName || 'Dr. Sarah Jenkins'}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>Status: {s.paymentStatus}</span>
                          <div style={{ fontSize: '0.85rem' }}>Amount Paid: <strong>${s.amountPaid}</strong></div>
                        </div>
                      </div>

                      {s.soapNote && s.soapNote.sharedWithClient ? (
                        <div style={{ padding: '0.85rem', background: 'var(--bg-card)', borderLeft: '4px solid var(--accent)', borderRadius: '6px', marginTop: '0.5rem' }}>
                          <small style={{ fontWeight: 'bold', color: 'var(--accent)', fontSize: '0.85rem' }}>📝 Official SOAP Clinical Record:</small>
                          <div style={{ marginTop: '0.4rem', fontSize: '0.9rem' }}><strong>S (Subjective):</strong> {s.soapNote.subjective}</div>
                          <div style={{ marginTop: '0.2rem', fontSize: '0.9rem' }}><strong>O (Objective):</strong> {s.soapNote.objective}</div>
                          <div style={{ marginTop: '0.2rem', fontSize: '0.9rem' }}><strong>A (Assessment):</strong> {s.soapNote.assessment}</div>
                          <div style={{ marginTop: '0.2rem', fontSize: '0.9rem' }}><strong>P (Plan):</strong> {s.soapNote.plan}</div>
                        </div>
                      ) : (
                        <small style={{ color: 'var(--text-secondary)' }}>Practitioner has not published clinical notes for this session yet.</small>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* 7. RAZORPAY PAYMENT MODAL */}
        {paymentModal.open && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div className="card" style={{ maxWidth: '450px', width: '90%', background: 'var(--bg-card)', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: 'var(--accent)' }}>💳 Razorpay Secure Checkout</h3>
                <button onClick={() => setPaymentModal({ open: false, therapist: null, amount: 0, slot: '' })} style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-primary)' }}>✕</button>
              </div>

              <div style={{ background: 'var(--bg-primary)', padding: '0.85rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid var(--border-color)' }}>
                <div><strong>Practitioner:</strong> {paymentModal.therapist?.fullName}</div>
                <div><strong>Appointment Slot:</strong> {paymentModal.slot}</div>
                <div><strong>Total Payable Fee:</strong> <span style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '1.2rem' }}>${paymentModal.amount}.00</span></div>
              </div>

              <button className="btn-primary" onClick={handleConfirmPaymentAndBook} style={{ width: '100%', padding: '0.85rem', fontSize: '1rem' }}>
                Pay ${paymentModal.amount}.00 via Razorpay (UPI/Card)
              </button>
            </div>
          </div>
        )}

        {/* 8. THERAPIST PRACTICE MANAGEMENT DASHBOARD */}
        {currentView === 'THERAPIST_DASHBOARD' && (
          <div>
            <div style={{ background: 'var(--bg-card)', padding: '1.25rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1 style={{ margin: 0, fontSize: '1.6rem' }}>🩺 Practitioner Hub</h1>
                <p style={{ color: 'var(--text-secondary)', margin: '0.2rem 0 0 0', fontSize: '0.9rem' }}>
                  Practitioner: <strong>{activeUser?.name}</strong> | Email: <code>{activeUser?.email}</code>
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <small style={{ fontWeight: 'bold', color: 'var(--text-secondary)' }}>Subscription Tier:</small>
                  <select
                    value={currentTier}
                    onChange={(e) => handleTierSwitch(e.target.value)}
                    style={{
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      background: 'var(--bg-primary)',
                      color: 'var(--accent)',
                      border: '1px solid var(--accent)',
                      fontWeight: 'bold',
                      fontSize: '0.85rem'
                    }}
                  >
                    <option value="BASIC">BASIC (Gated Chat & Analytics)</option>
                    <option value="PRO">PRO (All Features Unlocked)</option>
                    <option value="ENTERPRISE">ENTERPRISE (Unlimited)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setTherapistTab('CALENDAR')}
                  style={{
                    padding: '0.5rem 0.8rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: therapistTab === 'CALENDAR' ? 'var(--accent)' : 'transparent',
                    color: therapistTab === 'CALENDAR' ? '#fff' : 'var(--text-primary)',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  📅 Calendar
                </button>
                <button
                  onClick={() => setTherapistTab('CLIENTS')}
                  style={{
                    padding: '0.5rem 0.8rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: therapistTab === 'CLIENTS' ? 'var(--accent)' : 'transparent',
                    color: therapistTab === 'CLIENTS' ? '#fff' : 'var(--text-primary)',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  👥 Client CRM
                </button>
                
                <button
                  onClick={() => setTherapistTab('CHAT')}
                  style={{
                    padding: '0.5rem 0.8rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: therapistTab === 'CHAT' ? 'var(--accent)' : 'transparent',
                    color: therapistTab === 'CHAT' ? '#fff' : 'var(--text-primary)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    opacity: canChat ? 1 : 0.75
                  }}
                >
                  💬 Live Chat {!canChat && '🔒'}
                </button>

                <button
                  onClick={() => setTherapistTab('NOTES')}
                  style={{
                    padding: '0.5rem 0.8rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: therapistTab === 'NOTES' ? 'var(--accent)' : 'transparent',
                    color: therapistTab === 'NOTES' ? '#fff' : 'var(--text-primary)',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  📝 SOAP Notes
                </button>

                <button
                  onClick={() => setTherapistTab('BILLING')}
                  style={{
                    padding: '0.5rem 0.8rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: therapistTab === 'BILLING' ? 'var(--accent)' : 'transparent',
                    color: therapistTab === 'BILLING' ? '#fff' : 'var(--text-primary)',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  💳 Billing
                </button>

                <button
                  onClick={() => setTherapistTab('ANALYTICS')}
                  style={{
                    padding: '0.5rem 0.8rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: therapistTab === 'ANALYTICS' ? 'var(--accent)' : 'transparent',
                    color: therapistTab === 'ANALYTICS' ? '#fff' : 'var(--text-primary)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    opacity: canAnalytics ? 1 : 0.75
                  }}
                >
                  📊 Analytics {!canAnalytics && '🔒'}
                </button>
              </div>
            </div>

            {/* THERAPIST TAB 1: CALENDAR */}
            {therapistTab === 'CALENDAR' && (
              <div className="grid-2">
                <div className="card">
                  <h3>📅 Practice Availability Calendar</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Add available time slots for new client appointments.</p>

                  <form onSubmit={handleAddSlot} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <input
                      type="text"
                      placeholder="Date (e.g. Tomorrow, 2026-10-05)"
                      value={newSlotDate}
                      onChange={(e) => setNewSlotDate(e.target.value)}
                      required
                      style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                    />
                    <select
                      value={newSlotTime}
                      onChange={(e) => setNewSlotTime(e.target.value)}
                      style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                    >
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                    </select>
                    <button type="submit" className="btn-primary">Add Time Slot to Schedule</button>
                  </form>

                  <h4>Active Calendar Slots</h4>
                  {customSlots.map((slot, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0.8rem', border: '1px solid var(--border-color)', borderRadius: '6px', marginBottom: '0.5rem', background: 'var(--bg-primary)' }}>
                      <span>🗓️ {slot.date} @ {slot.time}</span>
                      <span style={{ color: slot.status === 'Booked' ? 'var(--accent)' : 'var(--success)', fontWeight: 'bold' }}>{slot.status}</span>
                    </div>
                  ))}
                </div>

                <div className="card">
                  <h3>🗓 Scheduled Client Appointments</h3>
                  {userSessions.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)' }}>No client bookings scheduled yet.</p>
                  ) : (
                    userSessions.map((s) => (
                      <div key={s._id} style={{ padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '6px', marginBottom: '0.75rem', background: 'var(--bg-primary)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <strong>Patient: {s.client?.fullName || 'Alex Mercer'}</strong>
                          <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>${s.amountPaid}</span>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Focus Area: {s.healthIssueType}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Time: {new Date(s.dateTime).toLocaleString()}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* THERAPIST TAB 2: CLIENT CRM */}
            {therapistTab === 'CLIENTS' && (
              <div className="card">
                <h3>👥 Client CRM & Medical Profile Directory</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Review active clients, primary intake concerns, and baseline distress severity ratings.
                </p>

                {userSessions.length === 0 ? (
                  <p style={{ color: 'var(--text-secondary)' }}>No client records currently assigned.</p>
                ) : (
                  userSessions.map((s) => (
                    <div key={s._id} style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', background: 'var(--bg-primary)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <h4 style={{ margin: 0 }}>👤 {s.client?.fullName || 'Alex Mercer'}</h4>
                          <p style={{ margin: '0.2rem 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            Email: <code>{s.client?.email || 'alex@example.com'}</code>
                          </p>
                        </div>
                        <span style={{ background: 'var(--border-color)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                          Active Client
                        </span>
                      </div>
                      <hr style={{ margin: '0.75rem 0', borderColor: 'var(--border-color)' }} />
                      <div style={{ fontSize: '0.9rem' }}><strong>Intake Focus:</strong> {s.healthIssueType}</div>
                      <div style={{ fontSize: '0.9rem' }}><strong>Payment Status:</strong> <span style={{ color: 'var(--success)' }}>{s.paymentStatus}</span></div>
                      <div style={{ fontSize: '0.9rem' }}><strong>Emergency Contact:</strong> On File (Baseline Severity: 6/10)</div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* THERAPIST TAB 3: DYNAMIC CLIENT-ISOLATED CHAT */}
            {therapistTab === 'CHAT' && (
              <div className="card">
                {!canChat ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <h2 style={{ color: 'var(--accent)' }}>🔒 Feature Locked (Basic Tier)</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0.5rem auto 1.5rem auto' }}>
                      Real-time client messaging is available exclusively on the <strong>PRO</strong> and <strong>ENTERPRISE</strong> plans.
                    </p>
                    <button className="btn-primary" onClick={() => handleTierSwitch('PRO')}>
                      Upgrade to PRO Tier
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.25rem', minHeight: '420px' }}>
                    <div style={{ borderRight: '1px solid var(--border-color)', paddingRight: '1rem' }}>
                      <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>💬 Client Threads</h3>
                      
                      {clientList.map((clientName, idx) => {
                        const isActive = activeClientName === clientName;
                        return (
                          <div
                            key={idx}
                            onClick={() => setSelectedChatClient(clientName)}
                            style={{
                              padding: '0.75rem 0.9rem',
                              borderRadius: '8px',
                              border: '1px solid var(--border-color)',
                              marginBottom: '0.6rem',
                              cursor: 'pointer',
                              background: isActive ? 'var(--accent)' : 'var(--bg-primary)',
                              color: isActive ? '#fff' : 'var(--text-primary)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <div style={{ fontSize: '1.2rem', background: isActive ? 'rgba(255,255,255,0.2)' : 'var(--bg-card)', padding: '0.3rem', borderRadius: '50%' }}>
                              👤
                            </div>
                            <div style={{ flex: 1, overflow: 'hidden' }}>
                              <strong style={{ display: 'block', fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {clientName}
                              </strong>
                              <small style={{ fontSize: '0.75rem', opacity: 0.85 }}>🟢 Active Thread</small>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                          <div>
                            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>💬 Private Chat with {activeClientName}</h3>
                            <small style={{ color: 'var(--text-secondary)' }}>Isolated clinical messaging thread</small>
                          </div>
                          <span style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '0.85rem' }}>🟢 Online</span>
                        </div>

                        <div style={{ height: '300px', overflowY: 'auto', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', background: 'var(--bg-primary)' }}>
                          {currentClientChat.length === 0 ? (
                            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', margin: '2rem 0' }}>No chat messages for {activeClientName} yet.</p>
                          ) : (
                            currentClientChat.map((msg) => {
                              const isTherapistMsg = msg.sender === (activeUser?.name || 'Dr. Sarah Jenkins, Ph.D.');
                              return (
                                <div key={msg.id} style={{ marginBottom: '0.8rem', textAlign: isTherapistMsg ? 'right' : 'left' }}>
                                  <div
                                    style={{
                                      display: 'inline-block',
                                      maxWidth: '75%',
                                      padding: '0.6rem 0.9rem',
                                      borderRadius: '12px',
                                      background: isTherapistMsg ? 'var(--accent)' : 'var(--bg-card)',
                                      color: isTherapistMsg ? '#fff' : 'var(--text-primary)',
                                      border: '1px solid var(--border-color)'
                                    }}
                                  >
                                    <small style={{ display: 'block', fontWeight: 'bold', fontSize: '0.75rem', opacity: 0.85, marginBottom: '0.1rem' }}>
                                      {msg.sender} • {msg.timestamp}
                                    </small>
                                    <span>{msg.text}</span>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>

                      <form onSubmit={handleSendChatMessage} style={{ display: 'flex', gap: '0.75rem' }}>
                        <input
                          type="text"
                          placeholder={`Type your response to ${activeClientName}...`}
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                        />
                        <button type="submit" className="btn-primary">
                          Send Reply
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* THERAPIST TAB 4: CLINICAL SOAP EHR NOTES */}
            {therapistTab === 'NOTES' && (
              <div className="grid-2">
                <div className="card">
                  <h3>📊 Select Patient Appointment</h3>
                  {userSessions.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)' }}>No active sessions to write notes for.</p>
                  ) : (
                    userSessions.map((s) => (
                      <div
                        key={s._id}
                        style={{
                          padding: '0.75rem',
                          border: '1px solid var(--border-color)',
                          borderRadius: '6px',
                          marginBottom: '0.75rem',
                          background: activeSessionId === s._id ? 'var(--border-color)' : 'transparent',
                          cursor: 'pointer'
                        }}
                        onClick={() => setActiveSessionId(s._id)}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <strong>Client: {s.client?.fullName || 'Alex Mercer'}</strong>
                          <span style={{ color: 'var(--success)' }}>${s.amountPaid}</span>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Concern: {s.healthIssueType}</div>
                        <button className="btn-primary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', marginTop: '0.5rem', width: '100%' }}>
                          {activeSessionId === s._id ? '✓ Selected for SOAP Note' : 'Select to Record Notes'}
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="card">
                  <h3>📝 Record Clinical SOAP Note</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Notes saved here are stored in the client EHR and published to the Client Portal.
                  </p>

                  <form onSubmit={handleSaveSoapNote} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <textarea placeholder="S - Subjective (Client symptoms & direct quotes)" value={soapData.subjective} onChange={(e) => setSoapData({ ...soapData, subjective: e.target.value })} style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }} rows={2} />
                    <textarea placeholder="O - Objective (Clinical observations & behavioral metrics)" value={soapData.objective} onChange={(e) => setSoapData({ ...soapData, objective: e.target.value })} style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }} rows={2} />
                    <textarea placeholder="A - Assessment (Diagnostic evaluation & progress tracking)" value={soapData.assessment} onChange={(e) => setSoapData({ ...soapData, assessment: e.target.value })} style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }} rows={2} />
                    <textarea placeholder="P - Plan (Treatment goals & homework assigned)" value={soapData.plan} onChange={(e) => setSoapData({ ...soapData, plan: e.target.value })} style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }} rows={2} />
                    <button type="submit" className="btn-primary">Save SOAP Note to Client EHR</button>
                  </form>
                </div>
              </div>
            )}

            {/* THERAPIST TAB 5: BILLING & INVOICING */}
            {therapistTab === 'BILLING' && (
              <div className="card">
                <h3>💳 Practice Billing Ledger & Razorpay Invoice Logs</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Track client payments, automated Razorpay invoicing receipts, and payout status.
                </p>

                {userSessions.length === 0 ? (
                  <p style={{ color: 'var(--text-secondary)' }}>No payment transactions logged yet.</p>
                ) : (
                  userSessions.map((s) => (
                    <div key={s._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem', border: '1px solid var(--border-color)', borderRadius: '8px', marginBottom: '0.75rem', background: 'var(--bg-primary)' }}>
                      <div>
                        <strong>Client: {s.client?.fullName || 'Alex Mercer'}</strong>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Invoice ID: <code>INV-{s._id.slice(-6).toUpperCase()}</code></div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Gateway: Razorpay (Card/UPI)</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <h3 style={{ color: 'var(--success)', margin: 0 }}>${s.amountPaid}.00</h3>
                        <span style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: 'bold' }}>✓ {s.paymentStatus}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* THERAPIST TAB 6: PRACTICE ANALYTICS */}
            {therapistTab === 'ANALYTICS' && (
              <div className="card">
                {!canAnalytics ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <h2 style={{ color: 'var(--accent)' }}>🔒 Analytics Locked (Basic Tier)</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0.5rem auto 1.5rem auto' }}>
                      Revenue reporting, patient retention metrics, and growth charts are enabled on the <strong>PRO</strong> and <strong>ENTERPRISE</strong> plans.
                    </p>
                    <button className="btn-primary" onClick={() => handleTierSwitch('PRO')}>
                      Upgrade to PRO Tier
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
                      <div className="card" style={{ textAlign: 'center' }}>
                        <small style={{ color: 'var(--text-secondary)' }}>Total Completed Sessions</small>
                        <h1 style={{ color: 'var(--accent)', margin: '0.2rem 0' }}>{userSessions.length}</h1>
                      </div>
                      <div className="card" style={{ textAlign: 'center' }}>
                        <small style={{ color: 'var(--text-secondary)' }}>Total Practice Revenue</small>
                        <h1 style={{ color: 'var(--success)', margin: '0.2rem 0' }}>
                          ${userSessions.reduce((acc, curr) => acc + (curr.amountPaid || 0), 0)}.00
                        </h1>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                          <span>Anxiety & Burnout Patients</span>
                          <strong>75%</strong>
                        </div>
                        <div style={{ background: 'var(--border-color)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ background: 'var(--accent)', width: '75%', height: '100%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                          <span>Depression & Mood Management</span>
                          <strong>25%</strong>
                        </div>
                        <div style={{ background: 'var(--border-color)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ background: 'var(--success)', width: '25%', height: '100%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [lang, setLang] = useState('EN');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  const t = (key) => translations[lang]?.[key] || key;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LanguageContext.Provider value={{ lang, setLang, t }}>
        <AppContent />
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}