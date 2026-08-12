import { Course, CountryResponse } from './types';

const BASE_URL = 'https://syncsphere-hiv6.onrender.com';
const DEFAULT_TIMEOUT_MS = 8000;

export class ApiError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Fetch helper with built-in signal timeout
 */
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Modular API client for Course Explorer platform
 */
export class CourseApiClient {
  /**
   * Fetches courses from /assignment/course-data
   */
  static async getCourses(): Promise<Course[]> {
    const res = await fetchWithTimeout(`${BASE_URL}/assignment/course-data`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new ApiError(`HTTP ${res.status} Course Endpoint Error`, res.status);
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      throw new ApiError('Invalid response format: Expected array of courses', 500);
    }

    return data;
  }

  /**
   * Fetches country code from /assignment/country-code
   */
  static async getCountryCode(): Promise<string> {
    const res = await fetchWithTimeout(`${BASE_URL}/assignment/country-code`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new ApiError(`HTTP ${res.status} Country Endpoint Error`, res.status);
    }

    const data: CountryResponse = await res.json();
    return data.country_code || 'IN';
  }
}
