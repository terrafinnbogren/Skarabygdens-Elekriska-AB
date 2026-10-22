# Skarabygdens Elektriska – plattform

Plattformen för Skarabygdens Elektriska AB, ett elföretag i Skara: den publika
hemsidan och, efter hand, interna verktyg för personalen.

## Så jobbar du i det här repot

Varje del har en egen mapp med en egen `CLAUDE.md` som beskriver syfte, nuläge,
beslut och öppna frågor för just den delen. Läs bara `CLAUDE.md` för den del
uppgiften gäller – inte alla. Behöver en uppgift flera delar, läs de berörda.

| Mapp | Innehåll | Status |
|------|----------|--------|
| `hemsida/` | Den publika sajten (HTML/CSS, byggskript, bilder) | Byggd, på Netlify-testlänk |
| `funktioner/erbjudanden/` | Personalen lägger ut erbjudanden på sajten | Idé |
| `funktioner/uthyrning/` | Uthyrning av byggcentraler, verktyg m.m. | Idé |
| `funktioner/betalning/` | Betalning på sajten | Parkerad |
| `funktioner/admin/` | Inloggning och adminsida för personalen | Idé |
| `expertis/` | Fakta per område i ett träd: el, mätning och kontroll, nätverk och säkerhet, smarta hem, vitvaror, uppdrag. Se `expertis/CLAUDE.md` | Faktaunderlag |
| `drift/` | Hosting, domän, DNS, e-post, servrar, konton, säkerhet | Pågår |

## Mapparna under `funktioner/`

Rör inte mapparna under `funktioner/` om inte användaren uttryckligen ber om
att jobba på just den delen. Det gäller även deras `CLAUDE.md`: ändra inte,
bygg inget utifrån dem och föreslå inte att börja på dem som en del av annat
arbete. Dyker något upp i annat arbete som berör en sådan del, nämn det för
användaren istället för att ändra i mappen.

## Mapparna under `expertis/`

Varje område har en `CLAUDE.md` med bekräftade fakta och öppna frågor, och
`expertis/CLAUDE.md` visar hela trädet. Ändra dem bara när användaren uttryckligen ber om att jobba på just det området.
När hemsidans text om ett område skrivs eller ändras får den mappen läsas som
faktakälla – och står något inte där, hittas det inte på.

## Gemensamma regler

- Allt som besökare eller personal ser skrivs på svenska, liksom dokumentation
  och commit-meddelanden.
- Hitta aldrig på fakta om företaget (antal anställda, certifieringar, kunder,
  priser, årtal). Saknas något: fråga, eller lägg frågan i
  `hemsida/INNEHALL.md`.
- Kundnamn och logotyper visas bara när kunden har godkänt det.
- Ingen betalning eller bokning på sajten i dagsläget. Den som vill hyra
  eller köpa något kontaktar företaget. Betalning är parkerad i
  `funktioner/betalning/`.
- Inga lösenord, API-nycklar eller andra hemligheter i repot. De läggs som
  miljövariabler hos Netlify eller på servern.
- Inga personuppgifter om kunder i repot. Allt som samlar in personuppgifter
  måste stämma med integritetspolicyn (`hemsida/build.mjs`, sidan
  `/integritetspolicy/`). Uppdatera policyn när något nytt samlas in.
- Inga externa npm-paket utan ett uttalat beslut. Hemsidan byggs med enbart
  Node, och npm-registret är blockerat i molnmiljön.
- Arbetsflöde: ändring på en gren → pull request → Netlify ger en testlänk →
  sammanfogas till `main` → publiceras automatiskt.
- När ett beslut fattas eller en fråga besvaras: uppdatera den berörda delens
  `CLAUDE.md` i samma ändring – för `funktioner/` bara när användaren arbetar
  med den delen.

## Ny del

Skapa en mapp (under `funktioner/` för funktioner på plattformen) med en
`CLAUDE.md` med rubrikerna: Syfte, Status, Beslut, Öppna frågor, Filer,
Beroenden. Lägg till den i tabellen ovan.
