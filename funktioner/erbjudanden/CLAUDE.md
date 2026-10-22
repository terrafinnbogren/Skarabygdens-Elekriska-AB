# Erbjudanden

## Syfte

Personalen ska enkelt kunna lägga ut, ändra och ta bort erbjudanden som visas
på hemsidan – utan att röra kod.

## Status

Idé. Inget byggt.

## Beslut

- Erbjudanden hanteras via adminsidan (`../admin/`), inte genom att ändra
  `hemsida/src/site.mjs`.
- Hemsidan ska fungera även om erbjudandena inte går att hämta – då visas
  sektionen inte.
- Föreslagen ordning: detta är den första funktionen som byggs, eftersom den
  är enklast.

## Öppna frågor

- Vilka fält har ett erbjudande? Förslag: rubrik, text, bild, pris
  (inklusive moms), giltig från/till.
- Var på sajten visas de – egen sida, startsidan eller båda?
- Försvinner ett erbjudande automatiskt när det gått ut?
- Vem får publicera?
- Ska erbjudanden kunna köpas direkt på sajten? I så fall: `../betalning/`.

## Filer

Inga än.

## Beroenden

- `../admin/` – inloggning och redigering.
- `../../hemsida/` – där erbjudandena visas.
- `../../drift/` – var data lagras (Netlify eller VPS, inte beslutat).
