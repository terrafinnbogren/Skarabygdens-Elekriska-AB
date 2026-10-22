# Drift

## Syfte

Allt som håller plattformen igång: hosting, domän, DNS, e-post, servrar,
konton, säkerhetskopior och säkerhet.

## Status

| Del | Nuläge |
|-----|--------|
| Kod | GitHub-repot `terrafinnbogren/Skarabygdens-Elekriska-AB` (personligt konto) |
| Hemsida | Netlify-projektet `resplendent-horse-b79371` (personligt konto), bygger från `main`, testlänk per pull request |
| Domän | skarabygdensel.se – pekar fortfarande på den gamla WordPress-sajten. Leverantör och DNS-åtkomst okänt |
| E-post | @skarabygdensel.se – leverantör okänd, troligen samma som webbhotellet |
| Gammal sajt | WordPress på ett LiteSpeed-webbhotell. Användaren "concil" i WordPress är troligen en extern konsult |
| Interna verktyg | Finns inte än |

## Beslut

- Den publika hemsidan ligger på Netlify.
- Företaget äger plattformen och de interna verktygen. Ägaren av GitHub-repot
  (terrafinnbogren) sköter driften.
- Domänen flyttas inte – den pekas om med DNS hos nuvarande leverantör.
  Netlify DNS används inte, för att e-postposterna inte ska behöva byggas om.
- Interna verktyg: Netlify-funktioner eller en egen VPS – inte beslutat.
  Lutar åt en kombination: hemsidan på Netlify, interna verktyg på en VPS, så
  att hemsidan fungerar även om servern är nere.
- Blir det en VPS: leverantör i Sverige eller EU (GDPR), inloggning bara med
  SSH-nyckel, automatiska säkerhetsuppdateringar, brandvägg, säkerhetskopior
  som lagras utanför servern och testas.

## Domänbyte till Netlify

1. Ta skärmbild av alla DNS-poster hos nuvarande leverantör.
2. Netlify: Domain management → Add a domain → `www.skarabygdensel.se` som
   huvudadress.
3. DNS: `www` som CNAME till `resplendent-horse-b79371.netlify.app`, roten som
   A-post till den IP-adress Netlify visar. **Rör inte MX- eller TXT-posterna**
   – de styr e-posten.
4. Vänta på att HTTPS-certifikatet utfärdas.
5. Netlify: Deploys → Trigger deploy, så att bygget ser den riktiga domänen och
   tar bort `noindex` (se `isProduction` i `../hemsida/build.mjs`).
6. Testa sajten med och utan www, kontaktformuläret och e-post till och från
   @skarabygdensel.se.
7. Säg inte upp det gamla webbhotellet förrän det är kontrollerat att det inte
   även sköter e-posten eller DNS.

## Öppna frågor

- Vem har inloggningen till domänleverantören och webbhotellet? Står domänen
  på företaget?
- Vem är "concil", och kan de föra över åtkomsten till företaget?
- Var ligger e-posten?
- Flytta GitHub-repot och Netlify-projektet till konton som ägs av företaget,
  med mer än en administratör.
- VPS eller Netlify-funktioner för de interna verktygen? Serviceavtal
  (`../funktioner/serviceavtal/`) behöver en databas med kunduppgifter, en
  daglig schemalagd körning och sms, vilket talar för en VPS.

## Beroenden

- `../hemsida/` – det som publiceras.
- `../funktioner/` – de interna verktygen behöver hosting, databas och
  inloggning härifrån.
