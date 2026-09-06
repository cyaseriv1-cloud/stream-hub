import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Tv, Radio, Film, Search, User as UserIcon, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0f0f0f]/90 backdrop-blur-md border-b border-[#2a2a2a] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo "MagisTV" */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group select-none cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#e50914] to-red-600 flex items-center justify-center shadow-lg shadow-[#e50914]/40 group-hover:scale-105 transition-transform">
            <Tv className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center text-xl sm:text-2xl font-black tracking-wider">
            <span className="text-white">LUMINA</span>
            <span className="text-[#e50914] ml-0.5 drop-shadow-[0_0_12px_rgba(229,9,20,0.6)]">TV</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium">
          <Link
            to="/"
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              isActive('/')
                ? 'bg-[#181818] text-white font-semibold border border-[#2a2a2a]'
                : 'text-gray-400 hover:text-white hover:bg-[#181818]/60'
            }`}
          >
            Home
          </Link>
          <Link
            to="/live"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
              isActive('/live')
                ? 'bg-[#181818] text-white font-semibold border border-[#2a2a2a]'
                : 'text-gray-400 hover:text-white hover:bg-[#181818]/60'
            }`}
          >
            <Radio className="w-4 h-4 text-[#e50914] animate-pulse" />
            Canales en vivo
          </Link>
          <Link
            to="/movies"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
              isActive('/movies')
                ? 'bg-[#181818] text-white font-semibold border border-[#2a2a2a]'
                : 'text-gray-400 hover:text-white hover:bg-[#181818]/60'
            }`}
          >
            <Film className="w-4 h-4 text-red-400" />
            Películas
          </Link>
          <Link
            to="/search"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
              isActive('/search')
                ? 'bg-[#181818] text-white font-semibold border border-[#2a2a2a]'
                : 'text-gray-400 hover:text-white hover:bg-[#181818]/60'
            }`}
          >
            <Search className="w-4 h-4 text-gray-400" />
            Buscar
          </Link>
        </nav>

        {/* User Profile / Auth Button */}
        <div className="hidden md:flex items-center gap-3 relative">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 bg-[#181818] hover:bg-[#242424] text-white px-3 py-1.5 rounded-xl border border-[#2a2a2a] text-sm font-semibold transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-[#e50914] flex items-center justify-center text-xs font-bold">
                  {currentUser.email ? currentUser.email[0].toUpperCase() : 'U'}
                </div>
                <span className="max-w-[120px] truncate">{currentUser.email || 'Mi Perfil'}</span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#181818] border border-[#2a2a2a] rounded-xl shadow-2xl py-2 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-[#2a2a2a] text-xs text-gray-400">
                    Conectado como
                    <p className="text-white font-bold truncate mt-0.5">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      navigate('/movies');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#242424] hover:text-white transition-colors"
                  >
                    Mi Cuenta
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-[#e50914] hover:bg-[#242424] flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Salir
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs sm:text-sm font-semibold text-gray-300 hover:text-white px-3 py-1.5"
              >
                Ingresar
              </Link>
              <Link
                to="/register"
                className="text-xs sm:text-sm font-bold bg-[#e50914] hover:bg-[#f40612] text-white px-4 py-1.5 rounded-xl shadow-md shadow-[#e50914]/30 transition-all hover:scale-105"
              >
                Registro
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#181818] text-gray-300 hover:text-white border border-[#2a2a2a]"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#181818] border-b border-[#2a2a2a] px-4 pt-3 pb-6 flex flex-col gap-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-3 py-2 rounded-lg text-sm font-semibold ${
              isActive('/') ? 'bg-[#e50914] text-white' : 'text-gray-300 hover:bg-[#242424]'
            }`}
          >
            Home
          </Link>
          <Link
            to="/live"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold ${
              isActive('/live') ? 'bg-[#e50914] text-white' : 'text-gray-300 hover:bg-[#242424]'
            }`}
          >
            <Radio className="w-4 h-4" />
            Canales en vivo
          </Link>
          <Link
            to="/movies"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold ${
              isActive('/movies') ? 'bg-[#e50914] text-white' : 'text-gray-300 hover:bg-[#242424]'
            }`}
          >
            <Film className="w-4 h-4" />
            Películas
          </Link>
          <Link
            to="/search"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold ${
              isActive('/search') ? 'bg-[#e50914] text-white' : 'text-gray-300 hover:bg-[#242424]'
            }`}
          >
            <Search className="w-4 h-4" />
            Buscar
          </Link>

          <div className="mt-3 pt-3 border-t border-[#2a2a2a] flex flex-col gap-2">
            {currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="text-left px-3 py-2 text-sm font-bold text-[#e50914] flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Salir ({currentUser.email})
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 rounded-xl bg-[#242424] text-white text-sm font-semibold"
                >
                  Ingresar
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 rounded-xl bg-[#e50914] text-white text-sm font-bold"
                >
                  Registro
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
