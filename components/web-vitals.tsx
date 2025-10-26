'use client'

import { useSearchParams } from 'next/navigation'
import { useReportWebVitals } from 'next/web-vitals'
import type { Metric } from 'web-vitals'

const logWebVitals = (metric: Metric) => {
  console.log(metric)
}

export function WebVitals() {
  const searchParams = useSearchParams();
  const shouldLog = searchParams?.get('web-vitals') === 'true';

  useReportWebVitals((metric) => {
    if (shouldLog) {
      logWebVitals(metric);
    }
  });

  return null
}