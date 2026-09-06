import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { AndroidBackButtonHandler } from './components/AndroidBackButtonHandler';

// Páginas de la aplicación
import { Home } from './pages/Home';
import { LiveChannels } from './pages/LiveChannels';
import { LivePlayer } from './pages/LivePlayer';
import { MoviesGrid } from './pages/MoviesGrid';
import { MovieDetail } from './pages/MovieDetail';
import { Search } from './pages/Search';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Manejador de botón atrás y gestos de Android */}
      <AndroidBackButtonHandler />

      <div className="min-h-screen flex flex-col bg-[#0f0f0f] text-white selection:bg-[#e50914] selection:text-white">
        {/* Header Global */}
        <Header />

        {/* Contenedor de Rutas */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/live" element={<LiveChannels />} />
            <Route path="/live/:id" element={<LivePlayer />} />
            <Route path="/movies" element={<MoviesGrid />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer Global */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
