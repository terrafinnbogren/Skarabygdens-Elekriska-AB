# Skarabygdens Elektriska – ny hemsida

Ny hemsida för Skarabygdens Elektriska AB (skarabygdensel.se), som ersätter
den gamla WordPress-sajten. Sajten är ren HTML/CSS och byggs med ett litet
Node-skript utan externa paket.

## Ändra innehåll

- **Texter, telefonnummer, medarbetare, tjänster och vanliga frågor:** `src/site.mjs`
- **Platsannonsen på startsidan:** sätt `recruiting.active` till `false` i `src/site.mjs`
- **Utseende (färger, typsnitt):** `public/css/style.css`
- **Sidmallar och sidornas uppbyggnad:** `build.mjs`

Det som återstår att ta fram inför lanseringen finns i `INNEHALL.md`.

## Bilder

Lägg nya bilder i `bilder-inkorg/` (se `bilder-inkorg/LÄSMIG.md`). Förbered
dem för webben med

```sh
python3 scripts/bilder.py bilder-inkorg/foto.jpg public/img/foto.jpg
```

Skriptet roterar, skalar ner, tar bort metadata (t.ex. GPS) och sparar
bildens mått i `src/bilder.json`. Skriv sedan in sökvägen i `src/site.mjs`.

## Köra lokalt

Kräver Node 20 eller senare.

```sh
npm run build   # bygger sajten till dist/
npm run check   # letar efter trasiga länkar och bilder i dist/
npm run dev     # bygger och visar den på http://localhost:4321
```

GitHub kör `build` och `check` automatiskt vid varje push.

## Testlänk

Med repot kopplat till Netlify får varje push en egen testlänk. Testlänkar
visas inte på Google (de får `noindex` och en spärrande robots.txt). Bara den
riktiga domänen www.skarabygdensel.se indexeras.

## Publicering

`netlify.toml` är förberedd för Netlify (bygger med `node build.mjs`, publicerar
`dist/`). Kontaktformuläret använder Netlify Forms. Inkomna meddelanden syns i
Netlify och kan skickas vidare till info@skarabygdensel.se.

### Checklista vid lansering

1. Koppla repot till Netlify och kontrollera förhandslänken.
2. Lägg till domänen `www.skarabygdensel.se` (och `skarabygdensel.se`) i Netlify.
3. Ändra DNS hos domänleverantören så att domänen pekar på Netlify.
   **Rör inte MX-posterna** – de styr e-posten till @skarabygdensel.se.
4. Ställ in att formulärmeddelanden mejlas till info@skarabygdensel.se.
5. Kontrollera att alla sidor, formuläret och e-posten fungerar.
6. Säg upp det gamla webbhotellet först när allt fungerar.

Sidadresserna (`/elinstallation/`, `/kontakta-oss/` osv.) är desamma som på
den gamla sajten, så länkar från Google fortsätter att fungera.
