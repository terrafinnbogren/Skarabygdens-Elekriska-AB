// Kontrollerar den byggda sajten i dist/: att alla interna länkar och bilder
// pekar på filer som finns, och att varje sida har titel och beskrivning.

import fs from 'node:fs';
import path from 'node:path';

const OUT = 'dist';
const errors = [];

const htmlFiles = fs.readdirSync(OUT, { recursive: true }).filter((f) => f.endsWith('.html'));

function exists(url) {
  const clean = decodeURIComponent(url.split(/[?#]/)[0]);
  const file = path.join(OUT, clean);
  if (clean.endsWith('/')) return fs.existsSync(path.join(file, 'index.html'));
  return fs.existsSync(file);
}

for (const f of htmlFiles) {
  const html = fs.readFileSync(path.join(OUT, f), 'utf8');
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${f}: saknar <title>`);
  if (!/<meta name="description" content="[^"]+">/.test(html)) errors.push(`${f}: saknar beskrivning`);
  for (const [, attr, url] of html.matchAll(/\b(href|src)="(\/[^"]*)"/g)) {
    if (!exists(url)) errors.push(`${f}: ${attr}="${url}" finns inte`);
  }
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="/.test(tag)) errors.push(`${f}: bild utan alt-text: ${tag}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Kontrollerade ${htmlFiles.length} sidor – inga fel.`);
