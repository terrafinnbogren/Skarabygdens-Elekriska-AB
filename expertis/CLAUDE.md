# Expertis

Fakta om företagets områden, ordnade i ett träd med få huvudkategorier och
underkategorier. Varje mapp har en `CLAUDE.md`.

> Ändra bara i en mapp här när användaren uttryckligen ber om att jobba på just
> det området. När hemsidans text om ett område skrivs eller ändras får den
> mappen läsas som faktakälla – står något inte där, skrivs det inte på sajten.

## Trädet

```
el/                         El
  installation/             Elinstallation            → /elinstallation/
  service/                  Service                   → /service/
  laddning/                 Laddning
    elbil/                  Elbilsladdare
    lastbil/                Lastbilsladdning
  ups-batteribyte/          UPS – batteribyte
matning-och-kontroll/       Mätning och kontroll
  eurotest/                 Eurotest
  ups-batteritest/          UPS – batteritest
  termografi/               Termografi                → /termografi/
    dronare/                Drönare
natverk-och-sakerhet/       Nätverk och säkerhet
  fiber/                    Fiber                     → /fiber/
  natverk/                  Nätverk                   → /teledatalarm/
  larm-och-passage/         Larm och passage          → /teledatalarm/
  kamera/                   Kamera
smarta-hem/                 Smarta hem
  shelly/                   Shelly
  plejd/                    Plejd
vitvaror/                   Vitvaror                  → /vitvaror/
uppdrag/                    Uppdrag (gäller alla områden)
  projektering/             Projektering
  offerter/                 Offerter
```

`→` visar vilken sida på hemsidan området hör till. Områden utan pil har ingen
egen sida än.

## Så är filerna uppbyggda

- **Bekräftade fakta** – med källa: den tidigare hemsidan, eller uppgift från
  företaget. Bara detta får användas som fakta om företaget.
- **Bakgrund** – allmän kunskap om området (t.ex. vad en Eurotest-mätning
  innebär). Inte uppgifter om företaget. Stäms av med användaren innan något
  används på hemsidan.
- **Öppna frågor** – det som behöver svar. När en fråga besvaras flyttas svaret
  till Bekräftade fakta.
- **Hör ihop med** – närliggande områden, t.ex. UPS-batteritest och
  UPS-batteribyte.

Mappnamn skrivs med små bokstäver, utan å, ä och ö.

## Nytt område

Lägg det som underkategori under den huvudkategori där det passar bäst, och
skapa bara en ny huvudkategori om inget passar. Uppdatera trädet ovan.
