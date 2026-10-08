// Allt innehåll på sajten samlas här. Ändra texter, telefonnummer och
// medarbetare i den här filen och kör sedan `npm run build`.

export const company = {
  name: 'Skarabygdens Elektriska AB',
  shortName: 'Skarabygdens Elektriska',
  tagline: 'Elektriker i Skara och Skaraborg',
  url: 'https://www.skarabygdensel.se',
  street: 'Danielstorpsgatan 1',
  zip: '532 40',
  city: 'Skara',
  phones: ['073-650 98 61', '073-650 98 62'],
  email: 'info@skarabygdensel.se',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Danielstorpsgatan+1,+532+40+Skara',
};

// Sätt till false när ni inte längre söker personal.
export const recruiting = {
  active: true,
  text: 'Just nu söker vi två elektriker. Hör av dig till Niklas eller Tony för mer information.',
};

// Bilder: förbered med `python3 scripts/bilder.py bilder-inkorg/x.jpg public/img/x.jpg`
// och skriv in sökvägen här. Tomt värde = ingen bild.
export const images = {
  hero: '', // stor bild bakom rubriken på startsidan, t.ex. '/img/hero.jpg'
  about: null, // bild på Om oss, t.ex. { src: '/img/personal.jpg', alt: 'Personalen framför lokalen' }
};

export const faq = [
  {
    q: 'Vilka områden arbetar ni i?',
    a: 'Vi utgår från Skara och har kunder över hela Skaraborg med omnejd – bland annat i Skövde, Lidköping, Götene, Falköping och Vara.',
  },
  {
    q: 'Arbetar ni åt både privatpersoner och företag?',
    a: 'Ja. Våra kunder är allt från privatpersoner till fastighetsägare, butiker och större företag.',
  },
  {
    q: 'Kan jag få ROT-avdrag?',
    a: 'Ja. Som privatperson kan du få ROT-avdrag för arbetskostnaden när vi utför elarbeten i din bostad. Avdraget görs direkt på fakturan.',
  },
  {
    q: 'Hur får jag en offert?',
    a: 'Ring oss eller skriv till oss via <a href="/kontakta-oss/">kontaktformuläret</a>, så återkommer vi.',
  },
];

// Varje tjänst kan få en bild: image: { src: '/img/fiber.jpg', alt: 'Fibersvetsning' }
export const services = [
  {
    slug: 'elinstallation',
    title: 'Elinstallation',
    icon: 'bolt',
    summary: 'Alla typer av elinstallationer i bostäder, kontor och industri.',
    description:
      'Elinstallationer i bostäder, kontor och industri – vid nyinstallation, renovering och underhåll.',
    body: `
      <p>Vi utför alla typer av elinstallationer, i bostäder, kontor och inom industrin. Vid nyinstallation, renovering eller underhåll har vi den kompetens som krävs.</p>
      <h2>Det här hjälper vi till med</h2>
      <ul class="checklist">
        <li>Nyinstallation i bostäder, kontor och industri</li>
        <li>Renovering och ombyggnad</li>
        <li>Underhåll av befintliga anläggningar</li>
        <li>Projektering – vi medverkar gärna redan i planeringsskedet</li>
      </ul>`,
  },
  {
    slug: 'teledatalarm',
    title: 'Tele, data & larm',
    icon: 'network',
    summary: 'Tele- och datanät, passerkontroll, porttelefoner och larm.',
    description:
      'Entreprenader för tele- och datanät, passerkontroll, porttelefoner och larmanläggningar.',
    body: `
      <p>Vi arbetar huvudsakligen med entreprenader för el- och telearbeten vid ny-, till- och ombyggnader för kontor, fastigheter och industri.</p>
      <h2>Våra åtaganden omfattar</h2>
      <ul class="checklist">
        <li>Tele- och datanät</li>
        <li>Passerkontrollanläggningar</li>
        <li>Porttelefonanläggningar</li>
        <li>Larmanläggningar</li>
      </ul>`,
  },
  {
    slug: 'service',
    title: 'Service',
    icon: 'wrench',
    summary: 'Felavhjälpning, statuskontroller och löpande underhåll.',
    description:
      'Service för fastighetsägare och butiker: felavhjälpning, statuskontroller och snabb hjälp lokalt.',
    body: `
      <p>Vi utför servicejobb för bland annat fastighetsägare och butiksägare, samt om- och nybyggnationer av kontor, lager och bostäder.</p>
      <p>Vi ser till att våra kunder har en säker anläggning med kontinuerligt underhåll och snabb service. Vår lokala närvaro är en god förutsättning för din trygghet.</p>
      <h2>Vi erbjuder</h2>
      <ul class="checklist">
        <li>Felavhjälpning</li>
        <li>Statuskontroller</li>
        <li>Kontinuerligt underhåll</li>
      </ul>`,
  },
  {
    slug: 'vitvaror',
    title: 'Vitvaror',
    icon: 'appliance',
    summary: 'Vi säljer vitvaror av märket Cylinda.',
    description: 'Vi säljer vitvaror av märket Cylinda. Hör av dig för ett kostnadsförslag.',
    body: `
      <p>Vi säljer vitvaror av märket Cylinda.</p>
      <p>Hör gärna av dig för ett kostnadsförslag.</p>`,
  },
  {
    slug: 'fiber',
    title: 'Fiber',
    icon: 'fiber',
    summary: 'Fastighets-, stam- och accessnät. Svetsning, mätning och projektering.',
    description:
      'Fiberinstallation: fastighetsnät, stamnät, accessnät, svetsning av SM och MM, OTDR- och effektmätning.',
    body: `
      <h2>Vi utför</h2>
      <ul class="checklist">
        <li>Fastighetsnät</li>
        <li>Stamnät</li>
        <li>Accessnät</li>
        <li>Trunkkablar</li>
        <li>OTDR-mätning</li>
        <li>Effektmätning</li>
        <li>Blåsning (vi hyr in blåsutrustning)</li>
        <li>Projektering</li>
        <li>Utsättning</li>
      </ul>
      <p>Vi svetsar både singelmod (SM) och multimod (MM).</p>`,
  },
  {
    slug: 'termografi',
    title: 'Termografi',
    icon: 'thermal',
    summary: 'Värmekamera och drönare hittar fel innan de blir allvarliga.',
    description:
      'Termografering med värmekamera och drönare – för solcellsanläggningar, elcentraler, ställverk och kraftledningar.',
    body: `
      <p>Vi utför termografi med bland annat drönare utrustad med värmekamera, som registrerar infraröd strålning från elektriska apparater och ledningar.</p>
      <p>Termografering är ett effektivt verktyg för att förebygga och hitta fel på en anläggning innan det får allvarliga konsekvenser.</p>
      <h2>Exempel på användningsområden</h2>
      <ul class="checklist">
        <li>Solcellsanläggningar (drönaröverflygning)</li>
        <li>Växelriktare och batterilager</li>
        <li>Elcentraler, ställverk, transformatorer och apparatskåp</li>
        <li>Frostskyddskablar och värmeslingor</li>
        <li>Lufthängda kraftledningar</li>
      </ul>
      <p>Våra drönarpiloter har certifiering för A1/A3 och A2 för en säker flygning.</p>
      <p>Har du andra frågor om termografi är du välkommen att kontakta oss.</p>`,
  },
];

// Valfritt per person: role: 'VD', photo: '/img/personal/niklas.jpg'
export const staff = [
  { name: 'Niklas Johansson', phone: '073-650 98 62', email: 'niklas@skarabygdensel.se' },
  { name: 'Tony Karlsson', phone: '073-650 98 61', email: 'tony@skarabygdensel.se' },
  { name: 'Charlotte Johansson', phone: '070-491 88 95', email: 'lotta@skarabygdensel.se' },
  { name: 'Peter Bergman', phone: '073-650 98 50', email: 'peter@skarabygdensel.se' },
  { name: 'Robert Selmosson', phone: '073-650 98 65', email: 'robert@skarabygdensel.se' },
  { name: 'Simon Forsman', phone: '073-650 98 57', email: 'simon@skarabygdensel.se' },
  { name: 'Christoffer Bogren', phone: '073-650 98 60', email: 'kristoffer@skarabygdensel.se' },
  { name: 'Oskar Jilderbo', phone: '073-650 98 74', email: 'oskar@skarabygdensel.se' },
  { name: 'Bo Jonsson', phone: '070-362 98 72', email: 'bo@skarabygdensel.se' },
  { name: 'Filip Eriksson', phone: '073-650 94 09', email: 'filip@skarabygdensel.se' },
  { name: 'Anton Hallbeck', phone: '073-650 94 43', email: 'anton@skarabygdensel.se' },
  { name: 'Theo Wernersson', phone: '073-650 94 40', email: 'theo@skarabygdensel.se' },
  { name: 'Hugo Snögren', phone: '073-650 94 30', email: 'hugo@skarabygdensel.se' },
  { name: 'Fredrik Lundgren', phone: '', email: 'fredrik@skarabygdensel.se' },
  { name: 'Aron Landahl', phone: '073-650 98 09', email: 'aron@skarabygdensel.se' },
  { name: 'Sören Larsson', phone: '073-650 94 46', email: 'soren@skarabygdensel.se' },
  { name: 'Christoffer Lindqvist', phone: '073-650 98 45', email: 'christoffer@skarabygdensel.se' },
];

export const references = [
  { name: 'HSB', logo: '/img/referenser/hsb.png' },
  { name: 'Jula', logo: '/img/referenser/jula.png' },
  { name: 'Blank Söner', logo: '/img/referenser/blank-soner.png' },
  { name: 'SBB', logo: '/img/referenser/sbb.jpg' },
];
