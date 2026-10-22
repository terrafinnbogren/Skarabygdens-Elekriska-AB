# Uthyrning

## Syfte

Hyra ut byggcentraler, verktyg och annan utrustning till kunder via hemsidan.

## Status

Idé. Inget byggt.

## Beslut

Byggs i två steg:

1. **Lista och förfrågan.** Varje objekt visas med bild, beskrivning, pris och
   status (ledig/uthyrd). Kunden skickar en förfrågan via formulär, och
   personalen bekräftar manuellt. Status ändras i adminsidan.
2. **Bokning** (senare, om behovet finns). Kalender med lediga datum, bokning
   direkt på sajten och eventuellt betalning (`../betalning/`).

I början rekommenderas betalning vid hämtning eller faktura – enklare vid
skador och deposition.

## Öppna frågor

- Vilka objekt hyrs ut, och hur många av varje?
- Priser: per dygn, vecka? Inklusive moms för privatpersoner?
- Deposition?
- Hyresvillkor: ansvar vid skada eller förlust, hämtning och återlämning,
  avbokning. Bör granskas av någon kunnig.
- Hyr ni ut till privatpersoner, företag eller båda?

## Filer

Inga än.

## Beroenden

- `../admin/` – hantera objekt och status.
- `../betalning/` – i steg 2.
- `../../hemsida/` – där objekten visas. Formuläret samlar personuppgifter, så
  integritetspolicyn måste stämma.
- `../../drift/` – lagring.
