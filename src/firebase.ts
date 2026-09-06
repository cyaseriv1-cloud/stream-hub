import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase (reemplaza con las credenciales de tu proyecto de Firebase)
export const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForDevelopment12345678",
  authDomain: "magistv-stream-app.firebaseapp.com",
  projectId: "magistv-stream-app",
  storageBucket: "magistv-stream-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Inicialización de Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
