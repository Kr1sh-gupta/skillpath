'use client';

import React from 'react';
import { Sparkles, Layers, FileCode2, ExternalLink, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-8 pt-4 pb-2 backdrop-blur-md">
      <div className="max-w-7xl mx-auto glass-panel rounded-full px-5 py-3 flex items-center justify-between shadow-xl border border-white/10">
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-400 p-[1px] shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
              <Layers className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
              Skillpath <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-cyan-400 border border-cyan-500/20">v2.0</span>
            </span>
          </div>
        </a>

        {/* Quick Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#hero" className="hover:text-cyan-400 transition-colors">Platform</a>
          <a href="#courses" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
            Courses API <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </a>
        </nav>

        {/* Status Badge & CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-300">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Flaky API Tolerant</span>
          </div>

          <a 
            href="#courses" 
            className="px-4 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.97] transition-all duration-150 flex items-center gap-1.5"
          >
            <span>Test Explorer</span>
            <Sparkles className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </header>
  );
};
