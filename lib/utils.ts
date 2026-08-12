import { Course, FormattedPrice, CurrencyCode } from './types';

export function formatCoursePrice(
  course: Course,
  countryCode: string | null,
  currencyOverride: 'auto' | 'INR' | 'USD' = 'auto'
): FormattedPrice {
  let effectiveCurrency: CurrencyCode = 'INR';

  if (currencyOverride === 'INR') {
    effectiveCurrency = 'INR';
  } else if (currencyOverride === 'USD') {
    effectiveCurrency = 'USD';
  } else {
    // Auto mode based on country code
    const isIndia = countryCode?.toUpperCase() === 'IN';
    effectiveCurrency = isIndia ? 'INR' : 'USD';
  }

  if (effectiveCurrency === 'INR') {
    // 199900 paise = ₹1,999 (divide by 100)
    const rupees = course.pricePaise / 100;
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(rupees);

    return {
      amountFormatted: formatted,
      currency: 'INR',
      symbol: '₹',
      rawAmount: rupees,
      unit: `${course.pricePaise.toLocaleString('en-IN')} paise`,
    };
  } else {
    // 3999 cents = $39.99 (divide by 100)
    const dollars = course.priceUsdCents / 100;
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(dollars);

    return {
      amountFormatted: formatted,
      currency: 'USD',
      symbol: '$',
      rawAmount: dollars,
      unit: `${course.priceUsdCents.toLocaleString('en-US')} cents`,
    };
  }
}
