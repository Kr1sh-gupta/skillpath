'use client';

import React from 'react';
import { ArrowDown, Sparkles, Zap, Globe, Cpu, Layers, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      
      {/* Background Ambient Glow Mesh Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/25 via-cyan-500/20 to-indigo-600/10 rounded-full blur-[140px] pointer-events-none animate-glow" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Floating Top Kinetic Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-mono text-cyan-300 border border-cyan-500/30 mb-8 shadow-xl shadow-cyan-950/40"
        >
          <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20 animate-pulse" />
          <span>Interactive Live API Engine • Next.js v16</span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
        >
          Master Real Skills with <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
            Practical Systems & Code
          </span>
        </motion.h1>

        {/* Subtitle (One line under headline as required by ps.txt) */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          From concept to creation — Skillpath connects real-time data, fault-tolerant endpoints, and practical course tracks for modern builders.
        </motion.p>

        {/* One Primary CTA Button (As required by ps.txt: "one button") with Optical Alignment */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#courses"
            className="w-full sm:w-auto pl-7 pr-5 py-4 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 text-white font-semibold text-base shadow-xl shadow-blue-600/30 hover:shadow-cyan-500/50 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-3 border border-white/20 group"
          >
            <span>Explore Courses Below</span>
            {/* Island button-in-button icon chip */}
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-y-0.5 transition-transform">
              <ArrowDown className="w-4 h-4 text-white" />
            </div>
          </a>
        </motion.div>

        {/* Glass Doppelrand Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="glass-bezel-outer text-left">
            <div className="glass-bezel-inner p-4 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-cyan-400">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Currency</div>
                <div className="text-sm font-semibold text-white">Dynamic INR / USD</div>
              </div>
            </div>
          </div>

          <div className="glass-bezel-outer text-left">
            <div className="glass-bezel-inner p-4 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Fault Tolerance</div>
                <div className="text-sm font-semibold text-white">Flaky API Resilient</div>
              </div>
            </div>
          </div>

          <div className="glass-bezel-outer text-left">
            <div className="glass-bezel-inner p-4 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">UI Architecture</div>
                <div className="text-sm font-semibold text-white">Bluish Glassmorphism</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
