
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { label: 'HOME', path: '/', icon: '🏠' },
    { label: 'INFO', path: '/profile', icon: '👑' },
    { label: 'ADMIN', path: '/admin', icon: '🔒' },
  ];

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <header className="pt-12 pb-8 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-2">
          <span className="text-red-600">&lt;/&gt;</span> SOURCE CODE
        </h1>
        <div className="h-1 w-24 bg-red-600 mx-auto rounded-full mt-4"></div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6">
        {children}
      </main>

      {/* Floating Pill Nav */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="glass-card flex items-center space-x-2 p-2 rounded-[2.5rem] red-glow border-red-900/50">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-6 py-3 rounded-[2.5rem] transition-all duration-300 font-bold text-sm ${
                location.pathname === item.path
                  ? 'bg-red-600 text-white'
                  : 'hover:bg-white/10 text-zinc-400'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
