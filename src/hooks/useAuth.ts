import { useState, useEffect } from 'react';
import { User, onAuthStateChanged, signOut as fbSignOut } from 'firebase/auth';
import { auth } from '../firebase';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    // Si hay un usuario dummy en localStorage para testing offline
    const saved = localStorage.getItem('magis_demo_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user);
        } else {
          const saved = localStorage.getItem('magis_demo_user');
          setCurrentUser(saved ? JSON.parse(saved) : null);
        }
        setLoading(false);
      });
      return unsubscribe;
    } catch {
      setLoading(false);
    }
  }, []);

  const logout = async () => {
    try {
      await fbSignOut(auth);
    } catch (e) {
      console.warn('Firebase signOut fallback', e);
    }
    localStorage.removeItem('magis_demo_user');
    setCurrentUser(null);
  };

  return { currentUser, loading, logout, setCurrentUser };
}
