'use client';

import React from 'react';
import { ViewMode, ApiMode, CurrencyOverride } from '../../lib/types';
import { LayoutGrid, List, SlidersHorizontal, RefreshCw, Globe, AlertTriangle, ShieldCheck } from 'lucide-react';

interface PropertyBarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  apiMode: ApiMode;
  onApiModeChange: (mode: ApiMode) => void;
  currencyOverride: CurrencyOverride;
  onCurrencyOverrideChange: (mode: CurrencyOverride) => void;
  activeCountry: string | null;
  totalCourses: number;
  countryError: boolean;
  onManualRefresh: () => void;
  isFetching: boolean;
}

export const PropertyBar: React.FC<PropertyBarProps> = ({
  viewMode,
  onViewModeChange,
  apiMode,
  onApiModeChange,
  currencyOverride,
  onCurrencyOverrideChange,
  activeCountry,
  totalCourses,
  countryError,
  onManualRefresh,
  isFetching,
}) => {
  return (
    <div className="glass-bezel-outer mb-8">
      <div className="glass-bezel-inner p-5 space-y-4">
        
        {/* Bar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-cyan-400">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Designer Property Controls</h4>
              <p className="text-[11px] text-slate-400">Live customization controls for layout grid, fault testing & currency</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Active Country Status Pill */}
            <div className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-white/10 text-xs font-mono flex items-center gap-1.5 text-slate-300">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Country:</span>
              <span className="font-bold text-white">{activeCountry || 'Detecting...'}</span>
              {countryError && (
                <span className="text-[10px] text-amber-400 font-semibold">(Fallback Active)</span>
              )}
            </div>

            {/* Refresh Button */}
            <button
              onClick={onManualRefresh}
              disabled={isFetching}
              className="p-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/40 text-cyan-300 border border-blue-500/30 active:scale-95 transition-all disabled:opacity-50"
              title="Refetch API Endpoints"
            >
              <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Control Groups Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          
          {/* Control 1: View Layout (As required by ps.txt: "Give us two property controls") */}
          <div className="space-y-1.5">
            <label className="text-slate-400 font-medium block">Control 1: Card Layout</label>
            <div className="flex rounded-xl bg-slate-950/80 p-1 border border-white/10">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`flex-1 py-1.5 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid (3 Col)</span>
              </button>

              <button
                onClick={() => onViewModeChange('list')}
                className={`flex-1 py-1.5 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>List View</span>
              </button>
            </div>
          </div>

          {/* Control 2: Flaky API Test Mode (As required by ps.txt: "Give us two property controls") */}
          <div className="space-y-1.5">
            <label className="text-slate-400 font-medium block">Control 2: API Fault Simulation</label>
            <div className="flex rounded-xl bg-slate-950/80 p-1 border border-white/10">
              <button
                onClick={() => onApiModeChange('auto')}
                className={`flex-1 py-1.5 rounded-lg font-medium flex items-center justify-center gap-1 transition-all ${
                  apiMode === 'auto'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Real Flaky API behavior (~1 in 3 failure)"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Real Flaky</span>
              </button>

              <button
                onClick={() => onApiModeChange('force_error')}
                className={`flex-1 py-1.5 rounded-lg font-medium flex items-center justify-center gap-1 transition-all ${
                  apiMode === 'force_error'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Simulate 500/404 Error State"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Test Error</span>
              </button>
            </div>
          </div>

          {/* Currency Override Rule */}
          <div className="space-y-1.5">
            <label className="text-slate-400 font-medium block">Currency Override Rule</label>
            <div className="flex rounded-xl bg-slate-950/80 p-1 border border-white/10">
              <button
                onClick={() => onCurrencyOverrideChange('auto')}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                  currencyOverride === 'auto' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Auto (API)
              </button>
              <button
                onClick={() => onCurrencyOverrideChange('INR')}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                  currencyOverride === 'INR' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Force INR (₹)
              </button>
              <button
                onClick={() => onCurrencyOverrideChange('USD')}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                  currencyOverride === 'USD' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Force USD ($)
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
