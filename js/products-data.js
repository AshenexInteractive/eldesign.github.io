/* ============================================
   ELDESIGN - Products Data Array
   All product information in one place
   ============================================ */

const PRODUCTS = [
    {
        id: "sp-0",
        slug: "sp-0",
        name: "Minimalspenningsrele",
        model: "SP-0 Mod D",
        category: "Rele",
        tagline: "Forrigling av bryterstyringer i kraft- og transformatorstasjoner",
        heroDescription: "Minimalspenningsreleet brukes til forrigling av bryterstyringer i kraft- og transformatorstasjoner. Spenningsindikering på linjer/samleskinner.",
        features: [
            "Forrigling av bryterstyringer i kraft- og transformatorstasjoner",
            "Spenningsindikering på linjer/samleskinner"
        ],
        description: [
            {
                label: "Inngangen",
                text: "Består av en stjernekoblet tre-fasetransformator, etterfulgt av en likeretterbro. R4 og V9 begrenser spenningen til ca. 27 V = til den øvrige elektronikk. Releet K1 styres av komparatoren V17 som får inn referanse fra spenningsdeleren R12, R8."
            },
            {
                label: "Målespenningen",
                text: "Taes fra spenningsdeleren R5, R6. Denne er valgt, slik at komparatoren ikke kobler releet før innkoblingsspenningen er tilstrekkelig høy."
            },
            {
                label: "Releet",
                text: "Faller fra når spenningen etter R4 har kommet ned i 5-6 Volt. R1, R2 og R3 er varistor, som trer i funksjon ved ca. 330/600 V~, for henholdsvis 110/220 Voltutgaven."
            }
        ],
        normalOperation: {
            title: "Normal tilkobling og spenning på alle faser",
            specs: [
                "Tiltrekking ca. 40/75 V~",
                "Frafall ca. 25/40 V~ for henholdsvis 110/220 V~ utgaven, målt på inngangen"
            ]
        },
        electricalSpecs: {
            "Inngangsspenning": "110 V eller 220 V - 50/60 Hz",
            "Isolasjonstestet": "2,3 kV~ mellom utgang og inngang",
            "Omgivelsestemperatur": "-20° - +60°C"
        },
        orderInfo: [
            { artNr: "19-000-14", type: "SP0 MOD.D 110V 50/60Hz", mounting: "DIN 35" },
            { artNr: "19-000-89", type: "SP0 MOD.D 220V 50/60Hz", mounting: "DIN 35" }
        ],
        discount: "35%",
        icon: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="12" y="8" width="40" height="48" rx="4"/>
            <circle cx="32" cy="28" r="10"/>
            <path d="M28 28h8M32 24v8"/>
            <line x1="20" y1="44" x2="44" y2="44"/>
            <circle cx="26" cy="50" r="2"/><circle cx="32" cy="50" r="2"/><circle cx="38" cy="50" r="2"/>
        </svg>`
    },
    {
        id: "type-lsi",
        slug: "type-lsi",
        name: "Bryterstillingsindikator",
        model: "Type LSI",
        category: "Indikator",
        tagline: "Indikatoren brukes i tavler og styreskap for å vise bryterposisjoner for enkel avlesning",
        heroDescription: "Indikatoren brukes i tavler og styreskap for å vise bryterposisjoner, ventilposisjoner osv. for enkel avlesning.",
        features: [
            "Svært lang driftstid",
            "Enkel montering",
            "Avlesning fra vid vinkel",
            "Pålitelig lesing på lang avstand",
            "Spar plass og installasjon: Kombiner to lamper i en"
        ],
        description: [
            {
                label: "Beskrivelse",
                text: "Indikatoren består av to lysrekker, den ene viser vertikal og den andre viser horisontal retning."
            },
            {
                label: "Grønn vertikal rekke",
                text: "LED's viser bryter etc. i: På-posisjon"
            },
            {
                label: "Rød horisontal rekke",
                text: "LED's viser bryter etc. i: Av-posisjon"
            }
        ],
        additionalInfo: "Indikatoren blir levert i standard rund utførelse. Løs firkantfront medfølger for effektbryter. Andre farger og kombinasjoner av lysrekkene kan bli levert på forespørsel. Det grønne eller røde lyset viser bryterposisjoner på en måte som gjør det mulig å avlese bryterposisjoner på 20 meters avstand og i en vinkel på ± 45°.",
        electricalSpecs: {
            "Spenningstype": "Veksel eller likespenning",
            "Tilgjengelig tilførsel": "24V / 110V / 230V ac/dc",
            "Strømforbruk": "< 10mA i det spesifiserte spenningsområde"
        },
        mechanicalSpecs: {
            "Arbeidstemperatur": "-40 til +70°C",
            "Sokkel": "Pluggbar sokkel med 3 skrutilkoplinger",
            "LED farger": "Andre farger på forespørsel",
            "Kapsling": "IP67 (front)"
        },
        orderInfo: [
            { code: "LSI-24", description: "24 V ac/dc" },
            { code: "LSI-110", description: "110 V ac/dc" },
            { code: "LSI-230", description: "230 V ac/dc" }
        ],
        orderAccessories: [
            { code: "SQ", description: "Square frame" },
            { code: "SH", description: "Sign holder" },
            { code: "N", description: "None" }
        ],
        orderLedColors: {
            vertical: [
                { code: "G", description: "Green Color" },
                { code: "C1", description: "Custom Color 1" }
            ],
            horizontal: [
                { code: "R", description: "Red Color" },
                { code: "C2", description: "Custom Color 2" }
            ]
        },
        discount: "45%",
        icon: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="32" cy="32" r="24"/>
            <circle cx="32" cy="32" r="16"/>
            <line x1="32" y1="16" x2="32" y2="48" stroke-width="2"/>
            <circle cx="32" cy="20" r="2" fill="currentColor"/>
            <circle cx="32" cy="28" r="2" fill="currentColor"/>
            <circle cx="32" cy="36" r="2" fill="currentColor"/>
            <circle cx="32" cy="44" r="2" fill="currentColor"/>
        </svg>`
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PRODUCTS;
}
