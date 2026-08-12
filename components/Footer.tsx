'use client';

import React from 'react';
import { Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/10 pt-12 pb-8 bg-slate-950/80 backdrop-blur-md relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-white tracking-tight text-base">Skillpath</span>
        </div>

        <div className="flex items-center gap-8 text-xs text-slate-300 font-medium">
          <a href="#hero" className="hover:text-cyan-400 transition-colors">About Platform</a>
          <a href="#courses" className="hover:text-cyan-400 transition-colors">Course Explorer</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Terms & Privacy</a>
        </div>

        {/* Copyright Line */}
        <div className="text-xs font-mono text-slate-400">
          © 2026 Skillpath Inc. Built for Junior Developer Role.
        </div>

      </div>
    </footer>
  );
};
