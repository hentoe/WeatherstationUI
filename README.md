# WetterstationUI

Vue-3-Oberfläche zur Verwaltung von Wetterstationen, Standorten, Sensoren und Messwerten.

## Voraussetzungen

- Node.js 22 oder neuer
- Eine laufende Wetterstation-API

## Einrichtung

```sh
npm install
```

Optional kann die API-Adresse über eine lokale `.env.local` gesetzt werden:

```sh
VITE_API_BASE_URL=https://api.example.com
```

Ohne diese Variable wird für die lokale Entwicklung `http://127.0.0.1:8000` verwendet.

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Qualität prüfen

```sh
npm run lint
npm run test
npm run build
```

`npm run lint:fix` korrigiert automatisch behebbaren Stilcode. `npm run format` formatiert die Dateien unter `src/` mit Prettier.
