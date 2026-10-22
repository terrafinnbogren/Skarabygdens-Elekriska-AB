# Interna verktyg: bygga eller köpa, och hur

Analys från oktober 2026, gjord utifrån `CLAUDE.md` i roten och för
serviceavtal, admin, drift, erbjudanden, uthyrning och hemsida. Det är ett
underlag för beslut, inget är bestämt. Produktnamn, priser och funktioner hos
andra leverantörer måste kontrolleras innan de används.

---

## 1. Bygga själv eller köpa?

Det finns färdiga **arbetsorder- och servicesystem för installatörsföretag**.
Ni betalar en månadsavgift per användare och får arbetsorder, kundregister,
tidrapportering, foton från mobilen, egenkontroller och ofta återkommande
serviceobjekt med påminnelser. Flera kopplas till ekonomisystem för
fakturering. Exempel på svenska system är Fieldly, Bygglet, Next och Kontek.
Kontrollera hos leverantören om systemet har serviceavtal med intervall och
sms-påminnelser, och vad det kostar.

**För att köpa:**
- Någon annan sköter drift, säkerhet, säkerhetskopior och GDPR-avtal.
- Det finns mobilappar, support och färdigt stöd för flera användare.
- Det fungerar på veckor i stället för månader.
- Systemet hänger inte på att en enda person (med AI-hjälp) förstår koden.

**För att bygga själv:**
- Det kan göras exakt som ni arbetar: sms tills åtgärden är utförd,
  arbetsledaren väljer vem som ser vad, veckosms.
- Låg löpande kostnad.
- Samma plattform som erbjudanden och uthyrning på hemsidan, vilket ett köpt
  system sällan klarar.
- Ni äger er data och er arbetsgång.

**Att bygga själv är rimligt när:**
- ni inte redan har ett affärssystem med serviceavtal (har ni det: använd det
  först),
- behovet är smalt, alltså ett register med påminnelser och inte ett
  komplett arbetsordersystem,
- någon i företaget har tid och intresse att vara ansvarig för systemet,
- ni accepterar att ni själva bär driftansvaret.

Planerar ni att snart behöva arbetsorder, tidrapporter och fakturering i
samma system är ett köpt system nästan alltid bättre. **Börja därför med att
fråga er nuvarande leverantör av affärssystem.**

---

## 2. Rekommenderad arkitektur om ni bygger själv

### VPS eller Netlify-funktioner?

**Rekommendation:** hemsidan ligger kvar på Netlify. De interna verktygen
körs på en egen liten **VPS hos en leverantör i Sverige eller EU**, till
exempel Glesys (svensk) eller Hetzner (tysk, med datacenter i Tyskland och
Finland).

- **Netlify är skyltfönstret.** Det står kvar och lyser även om verkstaden
  bakom är stängd.
- **VPS:en är en hyrd verkstadslokal.** Ni har egen nyckel och kan ställa in
  vad ni vill, men ni ansvarar själva för lås och städning.
- **Netlify-funktioner är som ett hyrt verktyg som bara finns medan det
  används.** De har inget eget arkivskåp, så databasen måste ligga hos
  ytterligare en tjänst. Funktionerna körs som standard i USA, vilket
  komplicerar GDPR, och kopplingen till externa databaser kräver oftast
  npm-paket. Därför passar en VPS bättre här.

### Delarna, med liknelser

- **Databas: SQLite, inbyggd i Node 22.** En enda pärm i arkivskåpet, alltså
  en fil på servern. Räcker gott för personalen och är lätt att kopiera.
- **Webbserver: Node, utan ramverk.** Framför den står Caddy eller nginx, som
  sköter HTTPS-certifikatet. Det är receptionen som tar emot besökare och ser
  till att allt går i förseglade kuvert. Caddy och nginx installeras från
  operativsystemet, inte från npm, men även det bör vara ett uttalat beslut.
- **Inloggning är passerkortet.** Tre alternativ:
  - *E-post och lösenord.* Fördel: välkänt. Nackdelar: folk glömmer
    lösenord, så det behövs ett flöde för återställning, och lösenorden måste
    lagras säkert (det går med Nodes inbyggda funktioner).
  - *Engångskod via sms eller e-post.* Fördel: inga lösenord, och sms-tjänsten
    finns redan för påminnelserna. Kombinera med "kom ihåg den här telefonen"
    i till exempel 30 dagar, så blir det smidigt ute hos kund, och
    administratören kan spärra en tappad telefon. Nackdelar: sms-koder är
    något svagare än andra metoder och kostar per sms, och e-post utan
    npm-paket kräver en e-posttjänst med webb-API.
  - *Microsoft- eller Google-inloggning.* Fördelar: den som slutar stängs
    automatiskt ute när kontot stängs, och tvåstegsverifiering finns redan.
    Nackdelar: mest komplicerat att bygga, och alla anställda måste ha ett
    företagskonto.
  - **Rekommendation:** har alla anställda Microsoft 365, välj
    Microsoft-inloggning. Annars engångskod med ihågkommen telefon.
- **Bildlagring är fotopärmen.** Telefonens webbläsare förminskar bilden
  innan uppladdning. Det sparar mobildata, tar bort GPS-position och annan
  metadata och kräver inga paket. Bilden sparas som fil på servern, och
  databasen anger var den ligger.
- **Schemalagd körning är kollegan som varje morgon klockan sju går igenom
  pärmen och ringer runt.** En timer i Linux (systemd) startar den dagliga
  kontrollen: vad förfaller, vad är försenat, vilka sms ska skickas.
- **Sms-tjänsten är brevbäraren som ni betalar per brev**, till exempel
  svenska 46elks via deras API. Bygg in **ett tak för antal sms per dag**, så
  att ett programfel inte kan skicka tusentals.
- **Övervakningen är larmcentralen.** Systemet rondar, och uteblir ronden
  larmar centralen. Tre lager:
  - en extern tjänst som kontrollerar att sidan svarar (t.ex. UptimeRobot),
  - en tjänst som larmar om den dagliga körningen inte har hört av sig, ett
    så kallat dödmansgrepp (t.ex. Healthchecks.io),
  - veckosms:et.
- **Säkerhetskopior är en kopia av pärmen i ett bankfack.** Varje natt
  kopieras databasen och bilderna krypterat till lagring hos **en annan
  leverantör** i EU. **Att prova en återställning är brandövningen.** En
  kopia som aldrig har återställts är bara en förhoppning.

### Skiss

```
   Personal (telefon)                Kunder / besökare
          |                                 |
          | HTTPS                           |
          v                                 v
 +-----------------------+         +-------------------+
 |  VPS i Sverige/EU     |         |  Netlify          |
 |  Caddy (HTTPS)        |-------->|  Hemsidan         |
 |  Node-app             | bygg-   |  (statisk)        |
 |   - inloggning/roller | signal  |  Erbjudanden och  |
 |   - serviceavtal      | + data  |  uthyrning bakas  |
 |   - erbjudanden       |         |  in vid bygget    |
 |   - uthyrning         |         +-------------------+
 |  SQLite + bildmapp    |
 |  Daglig timer --------+---> Sms-tjänst ---> Personalens telefoner
 +----------+------------+
            |   ^
  nattlig   |   | "lever du?"
  kopia     v   |
 +-----------+  +---------------------+
 | Säkerhets-|  | Extern övervakning  |---> larm-sms/e-post
 | kopior    |  +---------------------+
 | (annan    |
 | leverantör)|
 +-----------+
```

---

## 3. Byggordning i etapper

**Etapp 0: förberedelser, ingen kod**
- Flytta kontona till företaget (se avsnitt 4).
- Välj VPS- och sms-leverantör och teckna biträdesavtal med dem.
- Bestäm inloggningsmetod och roller.

**Etapp 1: grunden och erbjudanden**
- Server, HTTPS, inloggning, användare och roller, och en logg över vem som
  ändrade vad.
- Säkerhetskopior och övervakning från första dagen, inklusive en provad
  återställning.
- Första riktiga funktion: **erbjudanden**. Den är enkel och har inga
  kunduppgifter, så hela kedjan kan testas utan risk.
- VPS:en ger Netlify en signal att bygga om hemsidan, så att erbjudandena
  bakas in i den statiska sajten. En nattlig ombyggnad tar bort det som har
  gått ut. Är servern nere används senaste versionen eller döljs sektionen.
  Hemsidan påverkas aldrig.

**Etapp 2: serviceavtal, minsta användbara version**
- Kunder, anläggningar, avtal och åtgärder med intervall. Nästa datum räknas
  fram.
- Utförd åtgärd registreras med anteckning och foto från telefonen.
- Listorna "förfaller snart" och "försenade".
- Roller: administratör och arbetsledare ser allt, tekniker ser tilldelade
  avtal.
- Daglig körning, påminnelse-sms till den ansvariga kollegan och veckosms.
- Uppdatera integritetspolicyn **innan** riktiga kunduppgifter läggs in.

**Etapp 3: förfining**
- Arbetsledaren flyttar åtgärder mellan tekniker.
- Påminnelser trappas upp vid försening, till exempel till arbetsledaren.
- PDF-bilagor, som termograferingsrapporter.
- Ikon på hemskärmen, så att det känns som en app.
- Export till Excel.

**Etapp 4: uthyrning och eventuellt sms till kunder**
- Uthyrning byggs på samma sätt som erbjudanden: objekt och status hanteras i
  admin och bakas in i hemsidan. Förfrågningar går via Netlify Forms som i dag.
- Innan kunder får sms behöver ni ta ställning till samtycke och vad
  meddelandena ska innehålla.

Är serviceavtalen det mest akuta kan etapp 2 komma före erbjudanden.
Grunden i etapp 1 behövs ändå.

---

## 4. Drift och ansvar

**Löpande**
- **Varje vecka:** kontrollera att veckosms:et kom.
- **Varje månad:** gå igenom larm och loggar och se att säkerhetskopiorna
  växer.
- **Varje kvartal:** återställ en säkerhetskopia på en testserver och
  kontrollera att allt finns med, även bilderna.
- **Uppdateringar:** säkerhetsuppdateringar av operativsystemet sker
  automatiskt. Node uppgraderas manuellt. **Node 22 får säkerhetsuppdateringar
  till och med april 2027**, så planera ett byte till Node 24 under våren.
- **När någon slutar:** stäng kontot samma dag och spärra inloggningar som
  fortfarande är aktiva.

**Om servern går ner**
- Hemsidan fungerar som vanligt.
- Personalen kommer inte åt avtalen och påminnelserna uteblir, men
  övervakningen larmar.
- Lösningen är en nyinstallerad server och den senaste säkerhetskopian.
  Skriv en **driftbok**, en steg-för-steg-instruktion i repot, så att det kan
  göras med AI-hjälp inom några timmar.
- Komplettera gärna med en månatlig export av kommande åtgärder till en säker
  plats, så att ni aldrig står helt utan underlag.

**Vem äger kontona**
- **Företaget, inte en privatperson.** I dag ligger GitHub och Netlify på ett
  personligt konto. Detsamma ska gälla VPS, sms-tjänst, säkerhetskopior,
  övervakning och domän.
- Använd en funktionsadress, till exempel it@skarabygdensel.se.
- Ha **minst två administratörer**, tvåstegsverifiering och en gemensam
  lösenordshanterare.

---

## 5. Kostnadsposter

Beloppen är ungefärliga och måste kontrolleras.

- **VPS:** i storleksordningen ett hundratal kronor i månaden för en liten
  server i EU.
- **Lagring för säkerhetskopior:** några tiotal kronor i månaden.
- **Sms:** per sms, ungefär under en krona styck inom Sverige, beroende på
  volym och längd.
- **Övervakning:** grundnivån är ofta gratis för så här få kontroller.
- **Domän och Netlify:** kostnader ni redan har. Netlifys gratisnivå räcker
  troligen.
- **Utvecklingstid:** den överlägset största posten, oavsett om det är egen
  tid med AI-hjälp eller en inhyrd konsult.
- **Löpande underhåll:** några timmar i månaden, mer när något går sönder.
- **Jämförelse:** färdiga system kostar ofta ett par hundra kronor per
  användare och månad (ungefärligt, varierar). Med hela personalen blir det
  flera tusen kronor i månaden, men då ingår drift och support.

---

## 6. Risker och fallgropar

- **Beroende av en nyckelperson.** Förstår bara en person systemet stannar
  det när den personen gör det. Motmedel: dokumentation i repot, en driftbok
  och enkel kod utan ramverk.
- **Säkerhet.** En server på internet med kunduppgifter är ett mål. Därför:
  inloggning till servern bara med SSH-nyckel, brandvägg, uppdateringar och
  spärr efter upprepade misslyckade inloggningar.
- **Sms som skenar.** Ett fel kan skicka samma sms om och om igen. Motmedel:
  ett dagligt tak och en kontroll mot dubbla utskick.
- **Datumfällor.** "En månad efter 31 januari", skottår och sommartid måste
  testas noga.
- **Säkerhetskopior som inte fungerar.** Det märks först när de behövs.
- **Låg användning.** Registrerar teknikerna inte utförda åtgärder fortsätter
  sms:en i onödan. Systemet måste gå snabbare att använda än att låta bli.
- **Dubbel registrering.** Finns kunderna redan i ett affärssystem får ni två
  register som glider isär.
- **Kraven växer.** Snart vill någon ha tidrapporter och fakturering, och då
  är ni på väg att bygga ett affärssystem. Bestäm gränsen tidigt.
- **GDPR i detaljerna:**
  - Bilder kan visa personer eller adresser.
  - Sms passerar en extern leverantör, så skriv så lite som möjligt i dem.
  - Ni behöver bestämma hur länge uppgifter sparas efter att ett avtal har
    upphört.
  - Personalens egna uppgifter, som telefonnummer och loggar, är också
    personuppgifter.
- **AI-skriven kod som ingen granskar.** Låt någon utomstående granska
  säkerheten innan riktiga kunduppgifter läggs in.

---

## 7. Beslut att fatta innan bygget börjar

1. Har ert nuvarande affärs- eller arbetsordersystem serviceavtal med
   påminnelser? Jämför med två eller tre färdiga system. Bygga eller köpa?
2. Vem är systemets ägare och driftansvarig, och vem är reserv?
3. Ska GitHub, Netlify och alla nya tjänster flyttas till konton som
   företaget äger, med två administratörer?
4. Vilken VPS-leverantör i Sverige eller EU, och vilken lagring för
   säkerhetskopior hos en annan leverantör?
5. Vilken inloggningsmetod: Microsoft- eller Google-konton, engångskod eller
   lösenord? Har alla anställda ett företagskonto?
6. Vilka roller ska finnas? Är projektledare en egen nivå? Vem får vilken
   roll?
7. Vem får påminnelse-sms och veckosms, och vem får larmen från
   övervakningen? Hur ofta upprepas påminnelserna?
8. Ska kunder få sms, nu eller aldrig?
9. Vilken sms-leverantör, och vilket dagligt tak?
10. Vilka uppgifter ska finnas per avtal, och vilka bilagor utöver bilder?
11. Hur länge sparas uppgifter efter att ett avtal har upphört, och hur ska
    integritetspolicyn formuleras?
12. Får Caddy eller nginx installeras på servern? Det är ett systemprogram,
    inte ett npm-paket.
13. I vilken ordning: erbjudanden eller serviceavtal först?
14. Var går gränsen? Vad ska systemet uttryckligen *inte* göra, till exempel
    tidrapporter och fakturering?
