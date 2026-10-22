# Serviceavtal

> Arbeta bara i den här mappen när användaren uttryckligen ber om att jobba på
> just den här delen. Se "Mapparna under `funktioner/`" i rotens `CLAUDE.md`.

## Syfte

Ett register för personalen över kundernas serviceavtal: vad som ska göras,
hur ofta och vad som redan är gjort. Systemet påminner i god tid innan nästa
åtgärd ska göras, så att företaget har koll åt kunden.

Exempel: batteribyte i UPS, termografering en gång om året.

## Status

Idé. Inget byggt.

## Beslut

- Personalen lägger in avtal och registrerar utförda åtgärder: vad som
  gjordes, när och av vem, med en anteckning.
- Varje återkommande åtgärd har ett intervall (t.ex. varje år). Nästa datum
  räknas fram från när åtgärden senast utfördes.
- Påminnelser skickas som sms med start månaden innan nästa åtgärd krävs, och
  fortsätter tills åtgärden är registrerad som utförd.
- Tjänsten testas varje vecka så att det syns att den verkligen är igång. En
  server som har stannat kan inte själv larma, så det kontrolleras på två
  sätt:
  - Ett veckosms till ansvarig, t.ex. på måndagar: hur många åtgärder som
    förfaller den kommande månaden och hur många som är försenade. Uteblir
    sms:et är något fel.
  - En extern övervakningstjänst som regelbundet anropar servern och larmar om
    den inte svarar eller om den dagliga kontrollen inte har körts.
- Kunduppgifter (namn, telefonnummer, adresser) lagras i databasen, aldrig i
  repot.
- Anpassad för telefon först. Personalen ska enkelt kunna registrera en
  åtgärd ute hos kunden och fota direkt med telefonen.
- Användarna har olika behörighetsnivåer:
  - Administratör: allt, även att lägga till användare och ändra behörigheter.
  - Arbetsledare: lägger in, ändrar och avslutar avtal och kunder.
  - Tekniker: ser de avtal hen har fått tillgång till och registrerar utförda
    åtgärder med bilder, men kan inte ändra eller ta bort avtal.
- Arbetsledaren väljer vilka tekniker som ser ett avtal, och kan flytta en
  åtgärd till någon annan. Den som tar över får då tillgång till avtalet.
- Administratör eller projektledare bestämmer vem som har tillgång till vad.
- Bilder kan bifogas till en utförd åtgärd. De förminskas vid uppladdning och
  lagras på servern, inte i repot, och ingår i säkerhetskopiorna.

## Öppna frågor

- Vem får sms:et – den ansvariga kollegan, kunden eller båda?
- Hur ofta upprepas påminnelsen – varje vecka? Ska den gå oftare, eller även
  till arbetsledaren, när åtgärden är försenad?
- Vem får veckosms:et och larmen från övervakningen?
- Vilka uppgifter behövs per avtal? Förslag: kund, anläggning och adress,
  kontaktperson, objekt (t.ex. UPS-modell och batterier), åtgärder med
  intervall, avtalstid.
- Vilka filer förutom bilder ska kunna bifogas – t.ex. PDF-rapporter från
  termografering eller mätprotokoll?
- Räcker det att öppna sidan i webbläsaren, eller ska den kunna läggas som en
  ikon på telefonens hemskärm (fungerar utan app från App Store)?
- Är projektledare samma roll som arbetsledare, eller en egen nivå mellan
  administratör och arbetsledare?
- Vem ska ha vilken nivå?
- Använder ni redan ett affärs- eller arbetsordersystem? Har det serviceavtal
  och påminnelser kan det vara bättre att använda eller koppla mot det än att
  bygga ett eget.
- Vilken sms-tjänst? Förslag: en svensk leverantör med API, t.ex. 46elks.
  Kostar per skickat sms.
- Var körs den: VPS eller Netlify-funktioner (`../../drift/`)? Det här är
  den första funktionen som behöver en databas med kunduppgifter, en körning
  varje dag som letar efter åtgärder som snart ska göras, och sms. Det talar
  för en VPS i Sverige eller EU, där Node med inbyggd SQLite och en schemalagd
  körning räcker, utan externa paket. Hemsidan ligger kvar på Netlify.
- Hur länge sparas uppgifterna efter att ett avtal har upphört? Behandlingen
  av kunduppgifter ska beskrivas i integritetspolicyn
  (`../../hemsida/build.mjs`) innan funktionen tas i bruk.

## Filer

Inga än.

## Beroenden

- `../admin/` – samma inloggning som övriga interna funktioner.
- `../../drift/` – server, databas, säkerhetskopior och sms-tjänst.
- `../../expertis/uppdrag/serviceavtal/` – vad ett avtal kan innehålla.
