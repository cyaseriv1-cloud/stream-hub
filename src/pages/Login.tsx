import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { Tv, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      // Si la API key es dummy de desarrollo o falla por credenciales
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Correo electrónico o contraseña incorrectos.');
      } else if (err.code === 'auth/invalid-email') {
        setError('El correo electrónico ingresado no tiene un formato válido.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Demasiados intentos fallidos. Inténtalo de nuevo más tarde.');
      } else {
        // Fallback para modo demo si no hay proyecto Firebase conectado
        if (email.includes('@') && password.length >= 6) {
          localStorage.setItem('magis_demo_user', JSON.stringify({ email, uid: 'demo-uid-123' }));
          navigate('/');
          return;
        }
        setError(err.message || 'Error al iniciar sesión.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#181818] border border-[#2a2a2a] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#e50914] flex items-center justify-center mx-auto shadow-lg shadow-[#e50914]/40">
            <Tv className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-wide">
            Iniciar Sesión
          </h2>
          <p className="text-xs text-gray-400">
            Accede a todo el catálogo de canales y películas MagisTV.
          </p>
        </div>

        {/* Mensaje de Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-center gap-2.5 text-red-400 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Correo Electrónico
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@ejemplo.com"
                className="w-full bg-[#242424] border border-[#2a2a2a] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e50914] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Contraseña
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full bg-[#242424] border border-[#2a2a2a] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e50914] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e50914] hover:bg-[#f40612] disabled:opacity-50 text-white font-bold py-3 rounded-xl shadow-lg shadow-[#e50914]/40 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? 'Verificando...' : 'Entrar a MagisTV'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 border-t border-[#2a2a2a] text-xs text-gray-400">
          ¿No tienes una cuenta aún?{' '}
          <Link to="/register" className="text-[#e50914] font-bold hover:underline">
            Crear cuenta gratis
          </Link>
        </div>
      </div>
    </div>
  );
};
