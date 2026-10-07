# Skarabygdens Elektriska – ny hemsida

Ny hemsida för Skarabygdens Elektriska AB (skarabygdensel.se), som ersätter
den gamla WordPress-sajten. Sajten är ren HTML/CSS och byggs med ett litet
Node-skript utan externa paket.

## Ändra innehåll

- **Texter, telefonnummer, medarbetare, tjänster och referenser:** `src/site.mjs`
- **Platsannonsen på startsidan:** sätt `recruiting.active` till `false` i `src/site.mjs`
- **Utseende (färger, typsnitt):** `public/css/style.css`
- **Sidmallar och sidornas uppbyggnad:** `build.mjs`

## Bilder

Lägg nya bilder i `bilder-inkorg/` (se `bilder-inkorg/LÄSMIG.md`). De
komprimeras och läggs in under `public/img/`.

## Köra lokalt

Kräver Node 20 eller senare.

```sh
npm run build   # bygger sajten till dist/
npm run dev     # bygger och visar den på http://localhost:4321
```

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
