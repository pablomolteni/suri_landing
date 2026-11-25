// Notifies Bing (and other IndexNow engines) that the site's pages changed.
// Run after a production deploy: npm run indexnow
// The key file lives at public/<key>.txt so the engines can verify ownership.
import { SITE_URL, pages } from './seo.js'

const KEY = '96cf541ac4319cfab7657f1d52ea0efa'

const urlList = pages.filter(p => !p.noindex).map(p => `${SITE_URL}${p.path}`)

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: new URL(SITE_URL).host,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList,
  }),
})

console.log(`IndexNow: ${res.status} ${res.statusText}`)
urlList.forEach(u => console.log(`  ${u}`))
if (!res.ok && res.status !== 202) process.exit(1)
