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
- Det ska gå att se vem som ändrade vad och när.
- Cheferna har behörighet att lägga in, ändra och ta bort erbjudanden,
  kampanjer och annonser (`../erbjudanden/`).

## Öppna frågor

- Var körs den: Netlify-funktioner eller VPS? (`../../drift/`)
- Hur loggar personalen in – e-post och lösenord, engångskod via e-post, eller
  inloggning med företagets befintliga konton (t.ex. Microsoft eller Google)?
- Vilka chefer ska ha konton? Ska fler än cheferna ha åtkomst, och ska några
  bara få se men inte ändra?
- Adress: förslag `skarabygdensel.se/admin` eller en egen underdomän.

## Filer

Inga än.

## Beroenden

- `../erbjudanden/`, `../uthyrning/` – det som redigeras här.
- `../../drift/` – hosting, databas, säkerhetskopior.
