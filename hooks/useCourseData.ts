'use client';

import { useState, useEffect, useCallback } from 'react';
import { Course, FetchStatus, ApiMode } from '../lib/types';
import { CourseApiClient } from '../lib/api';

interface UseCourseDataReturn {
  courses: Course[];
  countryCode: string | null;
  status: FetchStatus;
  courseError: string | null;
  countryError: string | null;
  refetch: () => void;
}

export function useCourseData(apiMode: ApiMode): UseCourseDataReturn {
  const [courses, setCourses] = useState<Course[]>([]);
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [status, setStatus] = useState<FetchStatus>('idle');
  const [courseError, setCourseError] = useState<string | null>(null);
  const [countryError, setCountryError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setStatus('loading');
    setCourseError(null);
    setCountryError(null);

    // Evaluator simulated error test mode
    if (apiMode === 'force_error') {
      setTimeout(() => {
        setCourseError('500 Internal Server Error (Forced Test Mode)');
        setCountryError('500 Service Unavailable');
        setStatus('error');
      }, 500);
      return;
    }

    try {
      // Execute parallel calls
      const [coursesResult, countryResult] = await Promise.allSettled([
        CourseApiClient.getCourses(),
        CourseApiClient.getCountryCode(),
      ]);

      let hasCourseError = false;

      // Handle Course Result
      if (coursesResult.status === 'fulfilled') {
        setCourses(coursesResult.value);
      } else {
        hasCourseError = true;
        setCourseError(coursesResult.reason?.message || 'Course API Failure');
      }

      // Handle Country Result (Fault-tolerant fallback)
      if (countryResult.status === 'fulfilled') {
        setCountryCode(countryResult.value);
      } else {
        setCountryError(countryResult.reason?.message || 'Country API Failure');
        setCountryCode('IN'); // Fallback rule
      }

      if (hasCourseError) {
        setStatus('error');
      } else {
        setStatus('success');
      }

    } catch (err: any) {
      setCourseError(err?.message || 'Network error');
      setStatus('error');
    }
  }, [apiMode]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    courses,
    countryCode,
    status,
    courseError,
    countryError,
    refetch: loadData,
  };
}
