// Bygger sajten till mappen dist/. Inga externa paket behövs, bara Node.
//   node build.mjs          bygg
//   node build.mjs --serve  bygg och visa på http://localhost:4321

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { company, recruiting, services, staff, references } from './src/site.mjs';

const OUT = 'dist';

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// "073-650 98 61" -> "+46736509861"
const tel = (phone) => '+46' + phone.replace(/\D/g, '').replace(/^0/, '');

const icons = {
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>',
  network:
    '<rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="6" height="5" rx="1"/><rect x="16" y="17" width="6" height="5" rx="1"/><path d="M12 7v5M5 17v-5h14v5"/>',
  wrench:
    '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
  appliance:
    '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M4 7h16M8 4.5h.01M11 4.5h.01"/><circle cx="12" cy="14" r="4"/>',
  fiber: '<path d="M2 7h5l10 10h5M2 17h5L17 7h5"/><circle cx="12" cy="12" r="1.5"/>',
  thermal: '<path d="M14 14.8V4.5a2.5 2.5 0 0 0-5 0v10.3a4.5 4.5 0 1 0 5 0z"/><path d="M11.5 9v8"/>',
  phone:
    '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
};

const icon = (name, cls = 'icon') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;

const nav = [
  { href: '/', label: 'Start' },
  { href: '/tjanster/', label: 'Tjänster' },
  { href: '/referenser/', label: 'Referenser' },
  { href: '/om-oss/', label: 'Om oss' },
  { href: '/kontakta-oss/', label: 'Kontakt' },
];

const isCurrent = (href, current) =>
  href === current || (href === '/tjanster/' && services.some((s) => current === `/${s.slug}/`));

function layout({ path: current, title, description, body, head = '', noindex = false }) {
  const fullTitle = current === '/' ? `${company.shortName} – ${company.tagline}` : `${title} – ${company.shortName}`;
  const navLinks = nav
    .map((n) => `<li><a href="${n.href}"${isCurrent(n.href, current) ? ' aria-current="page"' : ''}>${n.label}</a></li>`)
    .join('');
  return `<!doctype html>
<html lang="sv" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${company.url}${current}">
${noindex ? '<meta name="robots" content="noindex">\n' : ''}<meta property="og:type" content="website">
<meta property="og:locale" content="sv_SE">
<meta property="og:site_name" content="${esc(company.shortName)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${company.url}${current}">
<meta name="theme-color" content="#bd1d1d">
<link rel="icon" href="/img/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/css/style.css">
<script>document.documentElement.classList.remove('no-js')</script>
${head}</head>
<body>
<a class="skip-link" href="#innehall">Hoppa till innehåll</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="logo" href="/"><img src="/img/logo.svg" alt="${esc(company.shortName)} – till startsidan" width="147" height="52"></a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="huvudmeny">
      <span class="menu-toggle-bars" aria-hidden="true"></span>Meny
    </button>
    <nav id="huvudmeny" class="main-nav" aria-label="Huvudmeny">
      <ul>${navLinks}</ul>
      <a class="btn btn-primary header-call" href="tel:${tel(company.phones[0])}">${icon('phone')}${company.phones[0]}</a>
    </nav>
  </div>
</header>
<main id="innehall">
${body}
</main>
<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <img src="/img/logo.svg" alt="" width="147" height="52" class="footer-logo">
      <p>${esc(company.tagline)}. Vi har kunder över hela Skaraborg med omnejd och utgår från Skara.</p>
    </div>
    <div>
      <h2>Kontakt</h2>
      <ul class="contact-list">
        <li>${icon('pin')}<span>${company.street}<br>${company.zip} ${company.city}</span></li>
        ${company.phones.map((p) => `<li>${icon('phone')}<a href="tel:${tel(p)}">${p}</a></li>`).join('')}
        <li>${icon('mail')}<a href="mailto:${company.email}">${company.email}</a></li>
      </ul>
    </div>
    <div>
      <h2>Tjänster</h2>
      <ul class="footer-links">
        ${services.map((s) => `<li><a href="/${s.slug}/">${s.title}</a></li>`).join('')}
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">© ${new Date().getFullYear()} ${esc(company.name)}</div>
</footer>
<script>
  const t = document.querySelector('.menu-toggle');
  t.addEventListener('click', () => {
    const open = t.getAttribute('aria-expanded') === 'true';
    t.setAttribute('aria-expanded', String(!open));
    document.body.classList.toggle('menu-open', !open);
  });
</script>
</body>
</html>
`;
}

const serviceCards = () => `
<ul class="card-grid">
  ${services
    .map(
      (s) => `<li class="card">
    <a href="/${s.slug}/">
      <span class="card-icon">${icon(s.icon)}</span>
      <h3>${s.title}</h3>
      <p>${s.summary}</p>
      <span class="card-more">Läs mer ${icon('arrow')}</span>
    </a>
  </li>`,
    )
    .join('')}
</ul>`;

const referenceLogos = () => `
<ul class="logo-grid">
  ${references.map((r) => `<li><img src="${r.logo}" alt="${esc(r.name)}" width="142" height="108" loading="lazy"></li>`).join('')}
</ul>`;

const ctaBand = (heading = 'Behöver du en elektriker?') => `
<section class="cta-band">
  <div class="container cta-inner">
    <div>
      <h2>${heading}</h2>
      <p>Ring oss eller skicka ett meddelande, så återkommer vi.</p>
    </div>
    <div class="cta-actions">
      <a class="btn btn-light" href="tel:${tel(company.phones[0])}">${icon('phone')}${company.phones[0]}</a>
      <a class="btn btn-outline-light" href="/kontakta-oss/">Skriv till oss</a>
    </div>
  </div>
</section>`;

const pageHeader = (title, lead = '') => `
<section class="page-header">
  <div class="container">
    <h1>${title}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </div>
</section>`;

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'Electrician',
  name: company.name,
  url: company.url + '/',
  logo: company.url + '/img/logo.svg',
  telephone: tel(company.phones[0]),
  email: company.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.street,
    postalCode: company.zip,
    addressLocality: company.city,
    addressCountry: 'SE',
  },
  areaServed: 'Skaraborg',
};

const pages = [];

pages.push({
  path: '/',
  title: 'Start',
  description: `${company.shortName} utför elinstallationer, service, tele/data/larm, fiber och termografi åt privatpersoner och företag i Skara och hela Skaraborg.`,
  head: `<script type="application/ld+json">${JSON.stringify(localBusiness)}</script>\n`,
  body: `
<section class="hero">
  <div class="container hero-inner">
    <p class="eyebrow">${company.shortName}</p>
    <h1>Elektriker i Skara och hela Skaraborg</h1>
    <p class="lead">Med många års erfarenhet inom elbranschen och gediget kunnande utför vi de flesta typer av elinstallationer – åt privatpersoner, fastighetsägare och företag.</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="/kontakta-oss/">Kontakta oss</a>
      <a class="btn btn-outline-light" href="/tjanster/">Våra tjänster</a>
    </div>
  </div>
</section>
${
  recruiting.active
    ? `<section class="notice"><div class="container notice-inner"><strong>Vill du jobba hos oss?</strong> <span>${recruiting.text}</span> <a href="/kontakta-oss/#medarbetare">Kontaktuppgifter ${icon('arrow')}</a></div></section>`
    : ''
}
<section class="section">
  <div class="container">
    <div class="section-head">
      <h2>Våra tjänster</h2>
      <p>Från enskilda uttag till hela entreprenader.</p>
    </div>
    ${serviceCards()}
  </div>
</section>
<section class="section section-alt">
  <div class="container">
    <div class="section-head"><h2>Därför väljer kunder oss</h2></div>
    <ul class="usp-grid">
      <li><h3>Lokal förankring</h3><p>Vi utgår från Skara och har kunder över hela Skaraborg. Nära till dig när något behöver åtgärdas.</p></li>
      <li><h3>Lång erfarenhet</h3><p>Många år i elbranschen och kunnande inom allt från bostäder till industri, tele och fiber.</p></li>
      <li><h3>Nära samarbete</h3><p>Vi arbetar alltid tätt ihop med kunden – från projektering till färdig anläggning.</p></li>
    </ul>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head">
      <h2>Några av våra kunder</h2>
      <p><a href="/referenser/">Se fler referenser</a></p>
    </div>
    ${referenceLogos()}
  </div>
</section>
${ctaBand()}`,
});

pages.push({
  path: '/tjanster/',
  title: 'Tjänster',
  description: `Tjänster från ${company.shortName}: elinstallation, tele/data/larm, service, vitvaror, fiber och termografi i Skaraborg.`,
  body: `
${pageHeader('Våra tjänster', 'Vi hjälper privatpersoner, fastighetsägare och företag i hela Skaraborg.')}
<section class="section">
  <div class="container">${serviceCards()}</div>
</section>
${ctaBand()}`,
});

for (const s of services) {
  const others = services.filter((o) => o !== s);
  pages.push({
    path: `/${s.slug}/`,
    title: s.title,
    description: s.description,
    body: `
${pageHeader(s.title, s.summary)}
<section class="section">
  <div class="container with-aside">
    <div class="prose">${s.body}</div>
    <aside class="aside-box">
      <h2>Nyfiken på mer?</h2>
      <p>Kontakta oss så berättar vi mer eller lämnar ett kostnadsförslag.</p>
      <a class="btn btn-primary" href="tel:${tel(company.phones[0])}">${icon('phone')}${company.phones[0]}</a>
      <a class="btn btn-outline" href="/kontakta-oss/">Skriv till oss</a>
      <h3>Andra tjänster</h3>
      <ul class="footer-links">${others.map((o) => `<li><a href="/${o.slug}/">${o.title}</a></li>`).join('')}</ul>
    </aside>
  </div>
</section>`,
  });
}

pages.push({
  path: '/referenser/',
  title: 'Referenser',
  description: `Några av de företag och organisationer som anlitat ${company.shortName}.`,
  body: `
${pageHeader('Referenser', 'Våra kunder är allt från privatpersoner till större företag. Här är några av dem.')}
<section class="section">
  <div class="container">${referenceLogos()}</div>
</section>
${ctaBand('Vill du också bli kund?')}`,
});

pages.push({
  path: '/om-oss/',
  title: 'Om oss',
  description: `${company.shortName} är ett elföretag i Skara med ${staff.length} medarbetare och kunder över hela Skaraborg.`,
  body: `
${pageHeader('Om oss', 'Ett lokalt elföretag med lång erfarenhet.')}
<section class="section">
  <div class="container prose">
    <p>Med många års erfarenhet inom elbranschen och gediget kunnande utför vi idag de flesta typer av elinstallationer. Vi utgår från våra lokaler på ${company.street.replace(/ \d+$/, '')} i ${company.city}, och idag är vi ${staff.length} medarbetare.</p>
    <p>Vi har en stark lokal förankring och arbetar alltid i nära samarbete med kunden. Våra kunder är allt från privatpersoner till större företag, och vi arbetar för en hög kundnöjdhet.</p>
    <p>Vi är medlemmar i Installatörsföretagen (tidigare EIO, Elektriska installatörsorganisationen).</p>
    <p><a href="/kontakta-oss/#medarbetare">Träffa våra medarbetare ${icon('arrow')}</a></p>
  </div>
</section>
${ctaBand()}`,
});

pages.push({
  path: '/kontakta-oss/',
  title: 'Kontakt',
  description: `Kontakta ${company.shortName} i Skara. Telefon ${company.phones.join(' eller ')}, e-post ${company.email}.`,
  body: `
${pageHeader('Kontakta oss', 'Ring, mejla eller använd formuläret – vi återkommer så snart vi kan.')}
<section class="section">
  <div class="container contact-grid">
    <div>
      <h2>${esc(company.name)}</h2>
      <ul class="contact-list contact-list-large">
        <li>${icon('pin')}<span>${company.street}<br>${company.zip} ${company.city}<br><a href="${company.mapsUrl}" rel="noopener" target="_blank">Visa på karta</a></span></li>
        <li>${icon('phone')}<span>${company.phones.map((p) => `<a href="tel:${tel(p)}">${p}</a>`).join(' eller ')}</span></li>
        <li>${icon('mail')}<a href="mailto:${company.email}">${company.email}</a></li>
      </ul>
    </div>
    <form class="contact-form" name="kontakt" method="POST" action="/tack/" data-netlify="true" netlify-honeypot="bot-field">
      <h2>Skriv till oss</h2>
      <input type="hidden" name="form-name" value="kontakt">
      <p class="visually-hidden"><label>Fyll inte i detta fält: <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
      <label for="f-namn">Namn</label>
      <input id="f-namn" name="namn" autocomplete="name" required>
      <label for="f-epost">E-post</label>
      <input id="f-epost" name="epost" type="email" autocomplete="email" required>
      <label for="f-telefon">Telefon <span class="optional">(valfritt)</span></label>
      <input id="f-telefon" name="telefon" type="tel" autocomplete="tel">
      <label for="f-meddelande">Meddelande</label>
      <textarea id="f-meddelande" name="meddelande" rows="6" required></textarea>
      <button class="btn btn-primary" type="submit">Skicka</button>
    </form>
  </div>
</section>
<section class="section section-alt" id="medarbetare">
  <div class="container">
    <div class="section-head"><h2>Medarbetare</h2></div>
    <ul class="staff-grid">
      ${staff
        .map(
          (p) => `<li>
        <h3>${esc(p.name)}</h3>
        ${p.phone ? `<a href="tel:${tel(p.phone)}">${icon('phone')}${p.phone}</a>` : ''}
        <a href="mailto:${p.email}">${icon('mail')}${p.email}</a>
      </li>`,
        )
        .join('')}
    </ul>
  </div>
</section>`,
});

pages.push({
  path: '/tack/',
  title: 'Tack för ditt meddelande',
  description: 'Tack för ditt meddelande.',
  noindex: true,
  body: `
${pageHeader('Tack för ditt meddelande!', 'Vi har tagit emot det och återkommer så snart vi kan.')}
<section class="section"><div class="container"><a class="btn btn-primary" href="/">Till startsidan</a></div></section>`,
});

pages.push({
  path: '/404.html',
  title: 'Sidan hittades inte',
  description: 'Sidan du letar efter finns inte.',
  noindex: true,
  body: `
${pageHeader('Sidan hittades inte', 'Sidan du letar efter finns inte längre eller har flyttats.')}
<section class="section"><div class="container">${serviceCards()}</div></section>`,
});

// --- Bygg ---

fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync('public', OUT, { recursive: true });

for (const p of pages) {
  const file = p.path.endsWith('.html') ? path.join(OUT, p.path) : path.join(OUT, p.path, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, layout(p));
}

const indexed = pages.filter((p) => !p.noindex);
fs.writeFileSync(
  path.join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexed.map((p) => `  <url><loc>${company.url}${p.path}</loc></url>`).join('\n')}
</urlset>
`,
);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${company.url}/sitemap.xml\n`);

console.log(`Byggde ${pages.length} sidor till ${OUT}/`);

if (process.argv.includes('--serve')) {
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.xml': 'application/xml', '.txt': 'text/plain' };
  http
    .createServer((req, res) => {
      let file = path.join(OUT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
      if (!file.startsWith(OUT) || !fs.existsSync(file)) {
        res.writeHead(404, { 'content-type': types['.html'] });
        return res.end(fs.readFileSync(path.join(OUT, '404.html')));
      }
      res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' });
      res.end(fs.readFileSync(file));
    })
    .listen(4321, () => console.log('Förhandsvisning: http://localhost:4321'));
}
