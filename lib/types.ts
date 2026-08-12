export interface Course {
  courseName: string;
  courseCode: string;
  description: string;
  mainCategory: string;
  shortCourse: string;
  courseType: string;
  pricePaise: number;
  priceUsdCents: number;
  mangoId: string;
  refundable: boolean;
}

export interface CountryResponse {
  country_code: string;
}

export type CurrencyCode = 'INR' | 'USD';

export interface FormattedPrice {
  amountFormatted: string;
  currency: CurrencyCode;
  symbol: string;
  rawAmount: number;
  unit: string;
}

export type FetchStatus = 'idle' | 'loading' | 'success' | 'error';
export type ViewMode = 'grid' | 'list';
export type ApiMode = 'auto' | 'force_error' | 'force_success';
export type CurrencyOverride = 'auto' | 'INR' | 'USD';
export type SortOption = 'default' | 'price-low' | 'price-high' | 'name-asc';
