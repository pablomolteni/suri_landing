// Renders each page to static HTML after the client and SSR builds
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { SITE_URL, pages } from './seo.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8')

const escape = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function head(page) {
  const url = `${SITE_URL}${page.path === '/' ? '/' : page.path}`
  const tags = [
    `<title>${escape(page.title)}</title>`,
    `<meta name="description" content="${escape(page.description)}" />`,
  ]
  if (page.noindex) {
    tags.push('<meta name="robots" content="noindex" />')
  } else {
    tags.push(
      `<link rel="canonical" href="${url}" />`,
      '<meta property="og:type" content="website" />',
      '<meta property="og:site_name" content="SURI" />',
      '<meta property="og:locale" content="es_LA" />',
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:title" content="${escape(page.title)}" />`,
      `<meta property="og:description" content="${escape(page.description)}" />`,
      `<meta property="og:image" content="${SITE_URL}/og-image.png" />`,
      '<meta property="og:image:width" content="1200" />',
      '<meta property="og:image:height" content="630" />',
      '<meta name="twitter:card" content="summary_large_image" />',
      `<meta name="twitter:title" content="${escape(page.title)}" />`,
      `<meta name="twitter:description" content="${escape(page.description)}" />`,
      `<meta name="twitter:image" content="${SITE_URL}/og-image.png" />`,
    )
  }
  if (page.jsonLd) {
    const json = JSON.stringify(page.jsonLd).replace(/</g, '\\u003c')
    tags.push(`<script type="application/ld+json">${json}</script>`)
  }
  return tags.join('\n    ')
}

for (const page of pages) {
  const html = template
    .replace('<!--app-head-->', head(page))
    .replace('<!--app-html-->', render(page.path))
  fs.writeFileSync(path.join(dist, page.file), html)
  console.log(`prerendered ${page.path} -> dist/${page.file}`)
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.filter(p => !p.noindex).map(p => `  <url><loc>${SITE_URL}${p.path}</loc></url>`).join('\n')}
</urlset>
`
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)
console.log('wrote dist/sitemap.xml')

fs.rmSync(ssrDir, { recursive: true, force: true })
