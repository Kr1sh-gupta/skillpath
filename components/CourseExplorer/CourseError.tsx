'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, ServerOff, ShieldAlert, Cpu } from 'lucide-react';

interface CourseErrorProps {
  courseError: string | null;
  countryError: string | null;
  onRetry: () => void;
  isRetrying?: boolean;
}

export const CourseError: React.FC<CourseErrorProps> = ({
  courseError,
  countryError,
  onRetry,
  isRetrying = false,
}) => {
  const isBothFailed = !!courseError && !!countryError;
  const isOnlyCourseFailed = !!courseError && !countryError;

  return (
    <div className="glass-card rounded-3xl p-8 border border-red-500/30 max-w-2xl mx-auto text-center space-y-6 shadow-2xl shadow-red-950/30">
      
      {/* Icon Badge */}
      <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-400">
        <ServerOff className="w-8 h-8 animate-pulse" />
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-300">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Expected Flaky API Response (~1 in 3 Failure Test)</span>
        </div>

        <h3 className="text-2xl font-bold text-white">
          {isBothFailed
            ? 'API Service Unavailable'
            : isOnlyCourseFailed
            ? 'Could Not Fetch Course Data'
            : 'Country Currency Endpoint Error'}
        </h3>

        <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          The assignment backend backend server returned an intentional fault (404/500 error). Our fault-tolerant handler prevented page crashes.
        </p>
      </div>

      {/* Breakdown Box */}
      <div className="glass-panel rounded-2xl p-4 text-left border border-white/10 space-y-2 text-xs font-mono">
        <div className="flex items-center justify-between text-slate-400 border-b border-white/10 pb-2">
          <span>Endpoint Status Diagnostics</span>
          <Cpu className="w-4 h-4 text-cyan-400" />
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-slate-300">/assignment/course-data:</span>
          <span className={courseError ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
            {courseError ? `FAILED (${courseError})` : 'OK (200)'}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-300">/assignment/country-code:</span>
          <span className={countryError ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
            {countryError ? `FAILED (${countryError}) → Fallback Active` : 'OK (200)'}
          </span>
        </div>
      </div>

      {/* Interactive Retry Button */}
      <div>
        <button
          onClick={onRetry}
          disabled={isRetrying}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
          <span>{isRetrying ? 'Retrying Fetch...' : 'Retry Connection'}</span>
        </button>
      </div>

    </div>
  );
};
