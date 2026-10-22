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
- Det ska gå att se vem som ändrade vad och när.
- Användarna har olika behörighetsnivåer. Administratör eller projektledare
  bestämmer vem som har tillgång till vad (se nivåerna i
  `../serviceavtal/`).
- Cheferna har behörighet att lägga in, ändra och ta bort erbjudanden,
  kampanjer och annonser (`../erbjudanden/`).

## Öppna frågor

- Var körs den: Netlify-funktioner eller VPS? (`../../drift/`)
- Hur loggar personalen in – e-post och lösenord, eller engångskod via sms
  med "kom ihåg den här telefonen"? Se `../serviceavtal/ANALYS.md`.
- Vilka chefer ska ha konton? Ska fler än cheferna ha åtkomst, och ska några
  bara få se men inte ändra?
- Adress: förslag `skarabygdensel.se/admin` eller en egen underdomän.

## Filer

Inga än.

## Beroenden

- `../erbjudanden/`, `../uthyrning/`, `../serviceavtal/` – det som redigeras här.
- `../../drift/` – hosting, databas, säkerhetskopior.
