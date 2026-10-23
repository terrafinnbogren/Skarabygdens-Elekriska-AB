# Betalning

> Arbeta bara i den här mappen när användaren uttryckligen ber om att jobba på
> just den här delen. Se "Mapparna under `funktioner/`" i rotens `CLAUDE.md`.

## Syfte

Låta kunder betala direkt via hemsidan, i första hand för uthyrning och
eventuellt erbjudanden.

## Status

Parkerad. Beslut: ingen betalning eller bokning på sajten i dagsläget – den
som vill hyra eller köpa något kontaktar företaget. Anteckningarna nedan
sparas till dess att frågan tas upp igen. Ingen betalleverantör vald, inget
avtal tecknat.

## Beslut

- Sajten tar aldrig emot kortuppgifter. Betalning sker på betalleverantörens
  egen betalsida, och kunden skickas tillbaka till en tacksida.
- Betalavtalet tecknas av företaget (organisationsnummer, företagets
  bankkonto) – inte av en privatperson. Kräver beslut av ledningen.
- Två nivåer:
  1. **Betallänkar** per produkt med fast pris – ingen programmering, en knapp
     på sajten.
  2. **Integrerad betalning** där en serverfunktion skapar betalningen med rätt
     belopp (datum, antal) och en återanrop från leverantören bekräftar den.
- Inga betalnycklar i repot – de läggs som miljövariabler.

## Öppna frågor

- Vad ska kunna betalas: uthyrning, erbjudanden, annat?
- Leverantör: t.ex. Stripe, Klarna, Svea, Nexi, Swish Handel via banken.
  Jämför avgifter och betalsätt; kontrollera aktuella villkor hos dem.
- Köpvillkor: priser inklusive moms, avbokning, ansvar, ångerrätt (14 dagar
  för konsumenter vid distansköp, med undantag t.ex. för tjänster bokade till
  ett bestämt datum). Bör granskas av någon kunnig.
- Bokföring, kvitton och moms – stäm av med redovisningskonsulten.

## Filer

Inga än.

## Beroenden

- `../uthyrning/`, `../erbjudanden/` – det som betalas för.
- `../../hemsida/` – knappar, tacksida, köpvillkor, integritetspolicy.
- `../../drift/` – serverfunktion och miljövariabler för nivå 2.
