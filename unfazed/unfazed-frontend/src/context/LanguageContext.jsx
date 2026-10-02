/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';

const translations = {
  EN: {
    welcome: 'Welcome to Unfazed',
    selectRole: 'Select your portal to continue',
    clientRole: 'I am a Client looking for Therapy',
    therapistRole: 'I am a Therapist managing my Practice',
    login: 'Log In',
    register: 'Submit Documentation for Verification',
    docCheckNote: 'To prevent fake practitioners, therapists must pass credential checks before registration.',
    demoCredentials: 'Demo Access Credentials'
  },
  ES: {
    welcome: 'Bienvenido a Unfazed',
    selectRole: 'Selecciona tu portal para continuar',
    clientRole: 'Soy un Cliente buscando Terapia',
    therapistRole: 'Soy un Terapeuta gestionando mi Práctica',
    login: 'Iniciar Sesión',
    register: 'Enviar Documentación para Verificación',
    docCheckNote: 'Para evitar falsos terapeutas, se verifica la documentación previa.',
    demoCredentials: 'Credenciales de Demostración'
  },
  HI: {
    welcome: 'अनफेज्ड में आपका स्वागत है',
    selectRole: 'जारी रखने के लिए अपना पोर्टल चुनें',
    clientRole: 'मैं एक क्लाइंट हूँ, थेरेपी की तलाश में हूँ',
    therapistRole: 'मैं एक थेरेपिस्ट हूँ, अपनी प्रैक्टिस संभाल रहा हूँ',
    login: 'लॉगिन करें',
    register: 'सत्यापन के लिए दस्तावेज जमा करें',
    docCheckNote: 'फर्जी थेरेपिस्ट को रोकने के लिए सत्यापन अनिवार्य है।',
    demoCredentials: 'डेमो एक्सेस क्रेडेंशियल'
  }
};

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('EN');

  const t = (key) => translations[lang]?.[key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}