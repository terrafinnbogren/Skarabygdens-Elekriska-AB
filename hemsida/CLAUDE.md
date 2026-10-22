# Hemsidan

## Syfte

Den publika sajten skarabygdensel.se: tjänster, kontakt, om oss, vanliga
frågor och integritetspolicy. Ersätter den gamla WordPress-sajten.

## Status

Byggd och publicerad på Netlify-testlänken. Ännu inte på den riktiga domänen –
se `../drift/CLAUDE.md`. Innehåll som saknas inför lanseringen står i
`INNEHALL.md`.

## Kommandon

Kör från den här mappen (`hemsida/`):

```sh
npm run build   # bygger till dist/
npm run check   # trasiga länkar, bilder utan alt-text, titlar
npm run dev     # förhandsvisning på http://localhost:4321
```

Kör alltid `build` och `check` innan du pushar. GitHub Actions kör samma sak.

## Filer

- `src/site.mjs` – allt innehåll: företagsuppgifter, tjänster, medarbetare,
  vanliga frågor, platsannons, bilder. Textändringar görs här.
- `build.mjs` – sidmallar, alla sidor, sitemap, robots.txt, `_headers`,
  `_redirects`.
- `public/css/style.css` – all styling. Färger i `:root`.
- `scripts/bilder.py` – förbereder bilder (skalar, tar bort metadata, sparar
  mått i `src/bilder.json`). Körs från `hemsida/`.
- `scripts/check.mjs` – kontrollerna bakom `npm run check`.
- `bilder-inkorg/` – originalbilder från personalen, innan de förbereds.
- `INNEHALL.md` – checklista över innehåll och fakta som ska tas fram.

## Beslut

- Statisk sajt utan externa paket. Byggs av Netlify från `../netlify.toml`.
- Sidadresserna är desamma som på den gamla sajten. Tas en sida bort ska den
  gamla adressen omdirigeras i `_redirects` i `build.mjs` (t.ex. `/referenser/`).
- Testlänkar får `noindex` och en spärrande robots.txt. Bara produktion på
  skarabygdensel.se indexeras (`isProduction` i `build.mjs`).
- Inga spårningscookies och ingen cookiebanner. Integritetspolicyn lovar det –
  läggs något till som sätter cookies (t.ex. YouTube, analys) måste policyn
  uppdateras och samtycke inhämtas. YouTube bäddas in så att filmen laddas
  först vid klick.
- Kontaktformuläret går via Netlify Forms.
- Fakta om tjänsterna hämtas från `../expertis/<område>/CLAUDE.md`. Står något
  inte där, skrivs det inte på sajten.
- Referenser och kundlogotyper är borttagna tills kunderna har godkänt.
- Bilder: originalen läggs i `bilder-inkorg/`, webbversionerna (max 1600 px,
  JPEG) i `public/img/`. Filmer läggs inte i repot – korta bakgrundsklipp
  komprimeras till under ca 10 MB, längre filmer läggs på YouTube.
- Mobil först: kontrollera att inga sidor får sidledsscroll på mobil.

## Öppna frågor

Se `INNEHALL.md`.

## Beroenden

- Erbjudanden och uthyrning ska visas här när de byggs
  (`../funktioner/`).
- Hosting och domän: `../drift/`.
