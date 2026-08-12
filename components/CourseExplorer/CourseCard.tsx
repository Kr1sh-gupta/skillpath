'use client';

import React from 'react';
import { Course } from '../../lib/types';
import { formatCoursePrice } from '../../lib/utils';
import { CheckCircle2, Tag, ArrowUpRight, BookOpen, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface CourseCardProps {
  course: Course;
  countryCode: string | null;
  currencyOverride?: 'auto' | 'INR' | 'USD';
  viewMode?: 'grid' | 'list';
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  countryCode,
  currencyOverride = 'auto',
  viewMode = 'grid',
}) => {
  const priceInfo = formatCoursePrice(course, countryCode, currencyOverride);

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="glass-bezel-outer group"
      >
        <div className="glass-bezel-inner p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-cyan-300 text-[11px] font-mono border border-blue-500/20">
                {course.mainCategory}
              </span>
              {course.refundable && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-medium border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Refundable
                </span>
              )}
              <span className="px-2 py-0.5 rounded-full bg-slate-900/90 text-slate-400 text-[10px] font-mono">
                Code: {course.shortCourse}
              </span>
            </div>

            {/* 1. Course Name */}
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              {course.courseName}
            </h3>

            {/* 2. Description (Cut off cleanly at two lines) */}
            <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* 3. Price & Action */}
          <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-mono">
                {priceInfo.currency} ({priceInfo.unit})
              </div>
              <div className="text-xl font-extrabold text-white tabular-nums tracking-tight">
                {priceInfo.amountFormatted}
              </div>
            </div>

            {/* Optical Alignment: pl-4 pr-3.5 */}
            <button className="pl-4 pr-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 active:scale-[0.96] transition-all flex items-center gap-1.5">
              <span>Enroll Track</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view (Default with Doppelrand Double-Bezel Hardware feel)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className="glass-bezel-outer group relative overflow-hidden flex flex-col justify-between"
    >
      <div className="glass-bezel-inner p-6 flex flex-col justify-between h-full space-y-6 relative z-10">
        
        {/* Background Ambient Radial Glow */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-400/25 transition-all duration-300 pointer-events-none" />

        <div>
          {/* Header Badges */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-cyan-300 text-xs font-mono border border-blue-500/20 flex items-center gap-1.5">
              <Tag className="w-3 h-3 text-cyan-400" />
              {course.mainCategory}
            </span>

            {course.refundable ? (
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Refundable
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-slate-900/90 text-slate-400 text-[10px] font-mono">
                {course.courseType}
              </span>
            )}
          </div>

          {/* 1. Course Name */}
          <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors leading-snug">
            {course.courseName}
          </h3>

          {/* 2. Description (Cut off cleanly at two lines) */}
          <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed font-normal">
            {course.description}
          </p>
        </div>

        {/* 4th Picked Field & 3. Price Display */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-cyan-400" /> Code: {course.shortCourse}
            </div>

            {/* Price formatting with tabular numbers */}
            <div className="text-2xl font-extrabold text-white tabular-nums tracking-tight mt-0.5">
              {priceInfo.amountFormatted}
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              Source: {priceInfo.unit}
            </div>
          </div>

          {/* Optical Alignment button: pl-4 pr-3 */}
          <button className="pl-4 pr-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-lg shadow-blue-500/25 group-hover:shadow-cyan-500/40 active:scale-[0.96] transition-all flex items-center gap-1.5">
            <span>Enroll Track</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </motion.div>
  );
};
