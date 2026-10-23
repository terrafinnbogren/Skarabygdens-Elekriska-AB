# Admin

> Arbeta bara i den här mappen när användaren uttryckligen ber om att jobba på
> just den här delen. Se "Mapparna under `funktioner/`" i rotens `CLAUDE.md`.

## Syfte

En inloggad sida där personalen hanterar innehåll som ändras ofta –
erbjudanden, uthyrningsobjekt och senare annat – utan att röra kod.

## Status

Idé. Inget byggt.

## Beslut

- Gemensam för alla interna funktioner: en inloggning, en adminsida med en
  sektion per funktion.
- Bara personal med eget konto får logga in. Inga delade lösenord.
- Inloggningen hanteras i plattformen själv, inte via Microsoft- eller
  Google-konton, eftersom alla anställda inte har sådana.
- Personalen loggar in med e-post och lösenord. Lösenorden lagras hashade med
  Nodes inbyggda funktioner, aldrig i klartext.
- Glömt lösenord återställs via en länk i e-post. Länken gäller en kort tid
  och kan bara användas en gång.
- Administratörer måste ha tvåstegsverifiering.
- Det ska gå att se vem som ändrade vad och när.
- Användarna har olika behörighetsnivåer. Administratör eller projektledare
  bestämmer vem som har tillgång till vad (se nivåerna i
  `../serviceavtal/`).
- Cheferna har behörighet att lägga in, ändra och ta bort erbjudanden,
  kampanjer och annonser (`../erbjudanden/`).

## Öppna frågor

- Var körs den: Netlify-funktioner eller VPS? (`../../drift/`)
- Vilken e-posttjänst skickar återställningslänkarna? Den behöver kunna
  skicka från servern, helst från en adress på skarabygdensel.se.
- Tvåstegsverifiering: förslag är en kod från en autentiseringsapp (t.ex.
  Bitwarden Authenticator, Microsoft eller Google Authenticator), som kan
  byggas med Nodes inbyggda funktioner. Eller sms-kod? Ska fler än
  administratörer kunna välja att slå på det?
- Vilka chefer ska ha konton? Ska fler än cheferna ha åtkomst, och ska några
  bara få se men inte ändra?
- Adress: förslag `skarabygdensel.se/admin` eller en egen underdomän.

## Filer

Inga än.

## Beroenden

- `../erbjudanden/`, `../uthyrning/`, `../serviceavtal/` – det som redigeras här.
- `../../drift/` – hosting, databas, säkerhetskopior.
