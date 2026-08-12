'use client';

import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface CourseEmptyProps {
  onReset: () => void;
  searchQuery?: string;
}

export const CourseEmpty: React.FC<CourseEmptyProps> = ({ onReset, searchQuery }) => {
  return (
    <div className="glass-card rounded-3xl p-8 border border-white/10 max-w-xl mx-auto text-center space-y-5 my-8">
      <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-cyan-400">
        <SearchX className="w-8 h-8" />
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-bold text-white">No Matching Courses Found</h3>
        <p className="text-sm text-slate-300">
          {searchQuery
            ? `No courses matched your query "${searchQuery}". Try refining your search parameters.`
            : 'No courses match the active filter criteria.'}
        </p>
      </div>

      <button
        onClick={onReset}
        className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-cyan-300 font-medium text-xs border border-cyan-500/30 transition-all flex items-center gap-2 mx-auto"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Search & Filters</span>
      </button>
    </div>
  );
};
