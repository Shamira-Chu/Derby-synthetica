'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'INÍCIO', path: '/' },
  { label: 'DESCOBRIR', path: '/descobrir' },
  { label: 'CONECTAR', path: '/conectar' },
  { label: 'PARTICIPAR', path: '/participar' },
  { label: 'EDITORIAL', path: '/editorial' },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-4 sm:top-5 inset-x-0 z-50 px-3 sm:px-8 w-[94vw] max-w-[1650px] mx-auto pointer-events-none">
      <div className="pointer-events-auto px-5 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-black/70 border border-slate-800/80 backdrop-blur-2xl transition-all duration-300 flex items-center justify-between gap-4 shadow-xl">
        {/* Brand Logo in Audiowide Font */}
        <Link
          href="/"
          onClick={() => setMenuAberto(false)}
          className="text-sm sm:text-lg tracking-[0.16em] sm:tracking-[0.18em] font-normal text-white whitespace-nowrap hover:opacity-90 transition-opacity"
        >
          <span className="font-audiowide" style={{ fontFamily: "'Audiowide', cursive, sans-serif" }}>
            DERBY SYNTHETICA
          </span>
        </Link>

        {/* Center Nav Links - Desktop */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10 font-mono text-[11px] lg:text-[12px] uppercase tracking-[0.2em]">
          {navItems.filter((i) => i.path !== '/').map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`transition-colors py-1 ${
                isActive(item.path)
                  ? 'text-cyan-400 font-bold border-b border-cyan-400'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/participar"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-400 hover:to-pink-400 text-white font-mono text-[11px] uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(217,70,239,0.45)] hover:shadow-[0_0_28px_rgba(217,70,239,0.65)] transition-all whitespace-nowrap"
          >
            ENTRE NA PISTA
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMenuAberto(!menuAberto)}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-200 hover:text-pink-400 hover:border-pink-500/50 active:scale-95 transition-all"
            aria-label={menuAberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={menuAberto}
          >
            {menuAberto ? <X className="w-5 h-5 text-pink-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuAberto && (
        <div className="pointer-events-auto md:hidden mt-2 p-5 rounded-2xl bg-black/95 border border-pink-500/30 backdrop-blur-3xl shadow-[0_10px_35px_rgba(0,0,0,0.85)] animate-in fade-in slide-in-from-top-3 duration-200 space-y-4">
          <nav className="flex flex-col space-y-1 font-mono text-sm tracking-wider">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMenuAberto(false)}
                  className={`px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
                    active
                      ? 'bg-pink-500/15 text-pink-300 font-bold border border-pink-500/30'
                      : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(255,46,151,1)]" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-slate-800/80">
            <Link
              href="/participar"
              onClick={() => setMenuAberto(false)}
              className="w-full flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-mono text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(217,70,239,0.4)] active:scale-95 transition-all"
            >
              ENTRE NA PISTA
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
