# Erbjudanden

> Arbeta bara i den här mappen när användaren uttryckligen ber om att jobba på
> just den här delen. Se "Mapparna under `funktioner/`" i rotens `CLAUDE.md`.

## Syfte

Cheferna ska enkelt kunna lägga ut, ändra och ta bort erbjudanden, kampanjer
och tidsbegränsade annonser som visas på hemsidan – utan att röra kod.

## Status

Idé. Inget byggt.

## Beslut

- Cheferna lägger in erbjudanden, kampanjer och annonser via adminsidan
  (`../admin/`), inte genom att ändra `hemsida/src/site.mjs`.
- Varje inlägg har ett startdatum och antingen ett slutdatum eller "tills
  vidare":
  - Med slutdatum försvinner inlägget automatiskt från sajten när
    slutdatumet har passerat.
  - Tills vidare ligger inlägget kvar tills någon tar bort det.
- Att inlägg försvinner ska inte kräva att någon gör något: sajten visar bara
  det som är giltigt just den dagen.
- Hemsidan ska fungera även om erbjudandena inte går att hämta – då visas
  sektionen inte.
- Föreslagen ordning: detta är den första funktionen som byggs, eftersom den
  är enklast.
- Erbjudanden köps inte på sajten. Den som är intresserad kontaktar företaget,
  så varje erbjudande har en tydlig väg till kontakt (telefon och formulär).

## Öppna frågor

- Är kampanjer och annonser samma sak som erbjudanden, eller en egen typ –
  t.ex. en banner överst på sajten med ett kort meddelande?
- Vilka fält har ett inlägg? Förslag: rubrik, text, bild, pris (inklusive
  moms), startdatum, slutdatum eller tills vidare.
- Var på sajten visas de – egen sida, startsidan eller båda?
- Ska platsannonsen på startsidan (`recruiting` i `hemsida/src/site.mjs`)
  flyttas hit, så att den också kan få ett slutdatum?

## Filer

Inga än.

## Beroenden

- `../admin/` – inloggning och redigering.
- `../../hemsida/` – där erbjudandena visas.
- `../../drift/` – var data lagras (Netlify eller VPS, inte beslutat).
