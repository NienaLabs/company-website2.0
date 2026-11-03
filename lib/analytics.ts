/**
 * Niena Labs Analytics & Google Consent Mode v2 Utility
 *
 * Provides type-safe event tracking and GDPR-compliant consent state management
 * for Google Analytics 4 (GA4) and Google Tag Manager (GTM).
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export type ConsentStatus = 'granted' | 'denied';

export const CONSENT_STORAGE_KEY = 'niena_cookie_consent';

/**
 * Updates Google Consent Mode v2 state across gtag and GTM dataLayer.
 * Persists the user's decision in localStorage.
 */
export function setConsent(status: ConsentStatus): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, status);
  } catch (e) {
    // LocalStorage might be disabled or restricted
  }

  // Update Google Consent Mode v2 via gtag
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      ad_storage: status,
      ad_user_data: status,
      ad_personalization: status,
      analytics_storage: status,
    });
  }

  // Push consent update to GTM dataLayer
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: 'consent_update',
      consent_status: status,
    });
  }
}

/**
 * Returns the stored consent preference ('granted', 'denied', or null if undecided).
 */
export function getStoredConsent(): ConsentStatus | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored === 'granted' || stored === 'denied') {
      return stored;
    }
  } catch (e) {
    // Ignore storage errors
  }
  return null;
}

/**
 * Safe event dispatch function that routes to both GA4 and GTM.
 */
export function trackEvent(
  action: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;

  // 1. Dispatch to GA4 via gtag
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }

  // 2. Dispatch to GTM dataLayer
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: action,
      ...params,
    });
  }
}

