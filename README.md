# Flexmonster Pivot Table & Charts integration with Angular
[![Flexmonster Pivot Table & Charts](https://cdn.flexmonster.com/landing.png)](http://flexmonster.com/?r=gh_ng)
Website: [www.flexmonster.com](https://www.flexmonster.com/?r=gh_ng)

## Flexmonster Pivot Table & Charts

Flexmonster Pivot is a powerful JavaScript tool for interactive web reporting. It allows you to visualize and analyze data from JSON, CSV, SQL, NoSQL, Elasticsearch, and OLAP data sources quickly and conveniently. Flexmonster is designed to integrate seamlessly with any client-side framework and can be easily embedded into your application.

This repository contains a sample [Angular](https://angular.io/) project for Flexmonster Pivot Table & Charts.

**Note:** This version of the project uses the [ngx-flexmonster](https://github.com/flexmonster/ngx-flexmonster) wrapper, which is [Ivy-compatible](https://docs.angular.lat/guide/ivy). Switch to the [ng-flexmonster](https://github.com/flexmonster/pivot-angular/tree/ng-flexmonster) branch for the project with the legacy [ng-flexmonster](https://github.com/flexmonster/ng-flexmonster) wrapper.

Table of contents:

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Related Flexmonster docs](#related-flexmonster-docs)

## Prerequisites

- [Node.js 16 or later](https://nodejs.org/en/)

## Installation

1. Download a `.zip` archive with the sample project or clone it from GitHub with the following command:

```bash
git clone https://github.com/flexmonster/pivot-angular.git && cd pivot-angular
```

2. Install the npm dependencies described in `package.json`:

```bash
npm install
```

3. Run the sample project:

```bash
ng serve
```

To see the result, open `http://localhost:4200/` in your browser.

## Related Flexmonster docs

- [Integration with Angular](https://www.flexmonster.com/doc/integration-with-angular/?r=gh_ng) — learn how to integrate Flexmonster into an Angular project.
- [Usage examples in Angular](https://www.flexmonster.com/doc/usage-examples-angular/?r=gh_ng) — see details on Flexmonster usage.

# DEV Anleitung
## Deployment auf Github Pages
- Anleitungen: Siehe [Github Doku](https://pages.github.com/) und [Anleitung für Angular](https://medium.com/swlh/how-to-deploy-an-angular-app-to-github-pages-without-using-any-libraries-step-by-step-guide-cfe96fb0c879)
    - Der Ordner in dem Repository für die Pages muss wirklich `docs` heissen (oder es muss in den Root-Ordner).
    - Achtung: Das dauert jeweils noch einen Moment (siehe Pipeline unter Github-Actions)
- Offenbar gibt es mehr Problem mit der CSP, als das auf dem Dev-Server der Fall war.
- Beachte: Ich kopiere jetzt jeweils einfach den Inhalt vom `dist` Ordner rüber und lösche die alten Files. Dabei muss ich folgendes beachten
    - Die folgenden Files stehen lassen: `server.py`, `fullCSP.html` und `reducedCSP.html`
        - Das `server.py` ist im Parent-Ordner, ist also kein Problem.
    - Im `index.html` die Änderungen nicht einfach reverten: Brauche auf der zweituntersten Zeile die neuen Namen der Files im `<script>` Tag. Eventuell auch noch die Anpassung der CSS-Styles ein paar Zeilen weiter oben.
    - Passe diesen `<script>` Tag auch analog im `fullCSP.html` und `reducedCSP.html` an: einfach rüberkopieren.
### Lokales Servieren der gebauten Seite
- Serviere das kurz lokal, um zu testen, ob alles funktioniert.
- Gehe einfach mit der Command-Line in den Ordner, wo das index.html liegt
- Führe `python -m http.server 8080` aus.
### Deployment
- Einfach im `fgubler-ergon.github.io` Repository auf den `main` Branch pushen.
### Trouble Shooting
#### Prod-Build Optimierungen
- Durch den PROD-Build werden einige Optimierungen gemacht, die vielleicht Probleme mit der CSP machen können. Da muss ich halt etwas experimentieren.
    - Kann auch `ng serve --prod` machen, um das zu debuggen.
#### Mehrfache Auslieferung mit fullCSP.html und reducedCSP.html
- Liefere jetzt neben `index.html` auch noch ein `fullCSP.html` und `reducedCSP.html`aus, um zu zeigen was mit der vollen und einer noch stärker reduzierten CSP passiert.
- Achtung: Das `fullCSP.html` und `reducedCSP.html` ist nicht im Build drinn => das liegt im Github-Pages Repository schon drinn, darf aber beim Rüberkopieren nicht gelöscht werden.
    - Die JS Files heissen ja nach jedem Build anders. Muss somit den unteren Teil vom `index.html` jeweils noch kurz rüberkopieren. Ist der `<script>` Tag auf der zweituntersten Zeile.
