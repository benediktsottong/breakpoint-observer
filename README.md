## react-breakpoint-observer

## Installation
Um das Projekt ausführen zu können, führe folgende Befehle in der Kommandozeile aus 
```
npm i
```
(build mit Redux-Dev-Tools)
```
npm run build:dev
```
(build ohne Redux-Dev-Tools)
```
npm run build:prod
```
oder (den watcher)
```
npm run watch
```
Alle erstellten Dateien können unter src/client/public gefunden werden

### Tests
```
npm run test
```
Die Coverage wird unter bin/coverage gespeichert.

## Ausführung
Die index.html unter /src/client kann in einem normalen Browser ausgeführt werden. Sie zeigt eine Übersicht des Breakpoints und einen Counter welcher die Renderprozesse zählt. Sobald das Browserfenster die Größe ändert, werden die Informationen angepasst.

### Besondere Anforderungen
Wichtig ist, dass die Komponenten NUR einmal gerendert werden, wenn gewisse Punkte überschritten werden.

### Hinweis zum Projekt
Bei diesem Projekt handelt es sich um eine beispielhafte Einbundung eines Breakpoint-Observers. Nachdem eine Komponente sich Subscribed hat (siehe App.jsx Zeile 26+) überwacht der Observer die aktuelle Breite des Browserfensters.

+ Die Breakpoints sind unter /config/BreakPoints.ts zu finden.
+ Die Funktionalität befindet sich hauptsächlich in der Datei /library/BreakpointObserver.ts

### Einsatzzweck
Geplant ist, diese Funktionalität zur Steuerung eines Sliders zu nutzen. Die Funktionalität des Sliders soll sich abhängig zum Breakpoint verändern (daher kann nicht auf media queries zurückgegriffen werden). 

-- enjoy

### Code
*Root-Path*: src/client<br />
*Components*: /components<br />
*Container*: /container<br />
*Store*: /store<br />
*Actions*: /actions<br />
*Reducers*: /reducers<br />
