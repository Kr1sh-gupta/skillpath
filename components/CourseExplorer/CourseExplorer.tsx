'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Course, FetchStatus, ViewMode, ApiMode, CurrencyOverride, SortOption } from '../../lib/types';
import { CourseCard } from './CourseCard';
import { CourseSkeleton } from './CourseSkeleton';
import { CourseError } from './CourseError';
import { CourseEmpty } from './CourseEmpty';
import { PropertyBar } from './PropertyBar';
import { Search, ArrowUpDown, Filter, Sparkles, AlertCircle, RefreshCw, DollarSign, IndianRupee } from 'lucide-react';

const BASE_URL = 'https://syncsphere-hiv6.onrender.com';

export const CourseExplorer: React.FC = () => {
  // Data States
  const [courses, setCourses] = useState<Course[]>([]);
  const [countryCode, setCountryCode] = useState<string | null>(null);
  
  // Status & Error States
  const [status, setStatus] = useState<FetchStatus>('idle');
  const [courseError, setCourseError] = useState<string | null>(null);
  const [countryError, setCountryError] = useState<string | null>(null);

  // Designer Property Control States
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [apiMode, setApiMode] = useState<ApiMode>('auto');
  const [currencyOverride, setCurrencyOverride] = useState<CurrencyOverride>('auto');

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  // Primary Data Fetcher
  const fetchData = useCallback(async () => {
    setStatus('loading');
    setCourseError(null);
    setCountryError(null);

    // If evaluator forced error test mode
    if (apiMode === 'force_error') {
      setTimeout(() => {
        setCourseError('500 Internal Server Error (Forced Test Mode)');
        setCountryError('500 Service Unavailable');
        setStatus('error');
      }, 600);
      return;
    }

    try {
      // Execute both GET calls concurrently
      const [coursesRes, countryRes] = await Promise.allSettled([
        fetch(`${BASE_URL}/assignment/course-data`, { method: 'GET', cache: 'no-store' }),
        fetch(`${BASE_URL}/assignment/country-code`, { method: 'GET', cache: 'no-store' }),
      ]);

      let courseFetchFailed = false;
      let fetchedCourses: Course[] = [];
      let fetchedCountry: string | null = null;

      // Handle Course Data response
      if (coursesRes.status === 'fulfilled' && coursesRes.value.ok) {
        try {
          fetchedCourses = await coursesRes.value.json();
          if (!Array.isArray(fetchedCourses)) {
            throw new Error('Invalid array response format');
          }
        } catch {
          courseFetchFailed = true;
          setCourseError('Malformed JSON payload');
        }
      } else {
        courseFetchFailed = true;
        const errStatus = coursesRes.status === 'fulfilled' ? coursesRes.value.status : 500;
        setCourseError(`HTTP ${errStatus} API Failure`);
      }

      // Handle Country Code response
      if (countryRes.status === 'fulfilled' && countryRes.value.ok) {
        try {
          const countryJson = await countryRes.value.json();
          fetchedCountry = countryJson?.country_code || 'IN';
        } catch {
          setCountryError('Country format error');
          fetchedCountry = 'IN'; // Graceful fallback
        }
      } else {
        const errStatus = countryRes.status === 'fulfilled' ? countryRes.value.status : 500;
        setCountryError(`Country Endpoint HTTP ${errStatus}`);
        fetchedCountry = 'IN'; // Graceful fallback rule
      }

      setCountryCode(fetchedCountry);

      if (courseFetchFailed) {
        setStatus('error');
      } else {
        setCourses(fetchedCourses);
        setStatus('success');
      }

    } catch (err: any) {
      setCourseError(err?.message || 'Network error');
      setStatus('error');
    }
  }, [apiMode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Derived list of unique main categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    courses.forEach((c) => {
      if (c.mainCategory) set.add(c.mainCategory);
    });
    return ['All', ...Array.from(set)];
  }, [courses]);

  // Filtered & Sorted Courses
  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.courseName.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.courseCode.toLowerCase().includes(q) ||
          c.mainCategory.toLowerCase().includes(q)
      );
    }

    // Category pill filter
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Refundable') {
        result = result.filter((c) => c.refundable);
      } else {
        result = result.filter((c) => c.mainCategory === selectedCategory);
      }
    }

    // Sort logic
    if (sortBy === 'price-low') {
      result.sort((a, b) => (countryCode === 'US' ? a.priceUsdCents - b.priceUsdCents : a.pricePaise - b.pricePaise));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (countryCode === 'US' ? b.priceUsdCents - a.priceUsdCents : b.pricePaise - a.pricePaise));
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.courseName.localeCompare(b.courseName));
    }

    return result;
  }, [courses, searchQuery, selectedCategory, sortBy, countryCode]);

  return (
    <section id="courses" className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-cyan-400 text-xs font-mono border border-cyan-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Main Test Component</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explore Dynamic Course Catalog
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Pulling live data from <code className="text-cyan-300 font-mono">syncsphere-hiv6.onrender.com</code> with dynamic count, fault tolerance & currency math.
          </p>
        </div>

        {/* Dynamic Card Count & Currency Indicator */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl glass-pill border border-white/10 text-xs font-mono text-slate-300">
            Received: <span className="font-bold text-cyan-300 text-sm">{courses.length}</span> cards
          </div>
          <div className="px-4 py-2 rounded-2xl glass-pill border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-1">
            <span>Currency:</span>
            {countryCode === 'IN' ? (
              <span className="text-emerald-400 font-bold flex items-center gap-0.5"><IndianRupee className="w-3.5 h-3.5" /> INR (Paise ÷ 100)</span>
            ) : (
              <span className="text-cyan-400 font-bold flex items-center gap-0.5"><DollarSign className="w-3.5 h-3.5" /> USD (Cents ÷ 100)</span>
            )}
          </div>
        </div>
      </div>

      {/* Designer Property Control Bar */}
      <PropertyBar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        apiMode={apiMode}
        onApiModeChange={setApiMode}
        currencyOverride={currencyOverride}
        onCurrencyOverrideChange={setCurrencyOverride}
        activeCountry={countryCode}
        totalCourses={courses.length}
        countryError={!!countryError}
        onManualRefresh={fetchData}
        isFetching={status === 'loading'}
      />

      {/* Search Bar & Filter Controls Toolbar */}
      <div className="glass-card rounded-2xl p-4 border border-white/10 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search course title or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs placeholder:text-slate-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={() => setSelectedCategory('Refundable')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedCategory === 'Refundable'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-900/60 text-slate-400 hover:text-emerald-400 border border-white/5'
            }`}
          >
            Refundable Only
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="glass-input rounded-xl px-3 py-2 text-xs bg-slate-900 text-slate-200 border-white/10"
          >
            <option value="default">Default Order</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Title: A-Z</option>
          </select>
        </div>

      </div>

      {/* Main Content Area Rendering 4 States */}
      <div>
        {/* State 1: Loading */}
        {status === 'loading' && (
          <CourseSkeleton count={6} viewMode={viewMode} />
        )}

        {/* State 2: Error */}
        {status === 'error' && (
          <CourseError
            courseError={courseError}
            countryError={countryError}
            onRetry={fetchData}
            isRetrying={false}
          />
        )}

        {/* State 3: Zero Results */}
        {status === 'success' && filteredCourses.length === 0 && (
          <CourseEmpty
            searchQuery={searchQuery}
            onReset={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSortBy('default');
            }}
          />
        )}

        {/* State 4: Working Grid / List */}
        {status === 'success' && filteredCourses.length > 0 && (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.mangoId || course.courseCode}
                course={course}
                countryCode={countryCode}
                currencyOverride={currencyOverride}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>

    </section>
  );
};
