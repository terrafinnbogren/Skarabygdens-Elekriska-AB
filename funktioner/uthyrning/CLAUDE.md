# Uthyrning

> Arbeta bara i den här mappen när användaren uttryckligen ber om att jobba på
> just den här delen. Se "Mapparna under `funktioner/`" i rotens `CLAUDE.md`.

## Syfte

Visa vilka byggcentraler, verktyg och annan utrustning som går att hyra, så
att kunder hör av sig.

## Status

Idé. Inget byggt.

## Beslut

- Ingen bokning och ingen betalning på sajten. För att hyra krävs kontakt med
  personalen, som bekräftar, gör upp villkor och tar betalt utanför sajten.
- Sajten visar varje objekt med bild, beskrivning och status (ledig/uthyrd),
  och en tydlig väg till kontakt: telefon och ett förfrågningsformulär där
  kunden kan ange objekt och önskade datum.
- Status ändras av personalen i adminsidan (`../admin/`).

## Öppna frågor

- Vilka objekt hyrs ut, och hur många av varje?
- Ska priser visas, eller "pris på förfrågan"? Visas priser för privatpersoner
  ska de vara inklusive moms.
- Hyr ni ut till privatpersoner, företag eller båda?
- Ska hyresvillkoren (skadeansvar, hämtning, återlämning) finnas på sajten,
  eller bara lämnas vid kontakt?
- Vem i personalen tar emot förfrågningarna?

## Filer

Inga än.

## Beroenden

- `../admin/` – hantera objekt och status.
- `../../hemsida/` – där objekten visas. Formuläret samlar personuppgifter, så
  integritetspolicyn måste stämma.
- `../../drift/` – lagring.
