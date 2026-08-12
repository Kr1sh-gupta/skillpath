'use client';

import React from 'react';

interface CourseSkeletonProps {
  count?: number;
  viewMode?: 'grid' | 'list';
}

export const CourseSkeleton: React.FC<CourseSkeletonProps> = ({
  count = 6,
  viewMode = 'grid',
}) => {
  const items = Array.from({ length: count });

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {items.map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div className="flex gap-2">
                <div className="w-24 h-5 rounded-full skeleton-shimmer" />
                <div className="w-20 h-5 rounded-full skeleton-shimmer" />
              </div>
              <div className="w-2/3 h-6 rounded-lg skeleton-shimmer" />
              <div className="w-full h-4 rounded-md skeleton-shimmer" />
              <div className="w-4/5 h-4 rounded-md skeleton-shimmer" />
            </div>
            <div className="w-32 h-12 rounded-xl skeleton-shimmer self-end md:self-center" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((_, i) => (
        <div key={i} className="glass-card rounded-3xl p-6 border border-white/10 space-y-4 flex flex-col justify-between h-[280px]">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="w-28 h-6 rounded-full skeleton-shimmer" />
              <div className="w-20 h-5 rounded-full skeleton-shimmer" />
            </div>
            <div className="w-3/4 h-7 rounded-lg skeleton-shimmer" />
            <div className="w-full h-4 rounded-md skeleton-shimmer" />
            <div className="w-5/6 h-4 rounded-md skeleton-shimmer" />
          </div>
          
          <div className="pt-4 border-t border-white/10 flex justify-between items-end">
            <div className="space-y-1.5">
              <div className="w-16 h-3 rounded skeleton-shimmer" />
              <div className="w-24 h-7 rounded-md skeleton-shimmer" />
            </div>
            <div className="w-24 h-10 rounded-2xl skeleton-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
};
