import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { CourseExplorer } from '../components/CourseExplorer/CourseExplorer';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-[#030712] text-slate-100 relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Mesh Pattern & Radial Glow Overlay */}
      <div className="fixed inset-0 bg-mesh-grid pointer-events-none opacity-40 z-0" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-blue-600/15 via-cyan-500/5 to-transparent blur-[140px] pointer-events-none z-0" />

      {/* Main Content Structure */}
      <div className="relative z-10 flex flex-col min-h-[100dvh]">
        <Navbar />

        <main className="flex-1">
          <Hero />
          <CourseExplorer />
        </main>

        <Footer />
      </div>
    </div>
  );
}
