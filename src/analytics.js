// Google Analytics 4, loaded only on the production site.
// Ads storage is always denied and Google Signals is off, so GA only sets its own first-party cookies (_ga, _ga_<id>).
const GA_MEASUREMENT_ID = 'G-TB6386D4YW'
const PRODUCTION_HOST = 'www.suri.lat'

export function initAnalytics() {
  if (!GA_MEASUREMENT_ID || window.location.hostname !== PRODUCTION_HOST) return

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { window.dataLayer.push(arguments) }

  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
  })
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)
}

// No-op until GA is loaded (local, previews, or no ID yet)
export function track(event, params = {}) {
  if (typeof window !== 'undefined' && window.gtag) window.gtag('event', event, params)
}
