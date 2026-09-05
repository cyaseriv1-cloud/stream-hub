import Link from 'next/link';
import { Film } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-gray-100 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 rounded-full bg-surface border border-borderDark flex items-center justify-center mb-4">
        <Film className="w-8 h-8 text-brand" />
      </div>
      <h1 className="text-4xl font-extrabold text-white mb-2">404</h1>
      <h2 className="text-xl font-semibold text-gray-300 mb-4">Contenido no encontrado</h2>
      <p className="text-sm text-gray-400 max-w-sm mb-6">
        El canal o película que buscas no está disponible en este momento.
      </p>
      <Link
        href="/"
        className="bg-brand hover:bg-brand-hover text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-brand/30 transition-all"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}
