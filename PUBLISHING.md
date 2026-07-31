# Veröffentlichung des Community Nodes bei n8n (interne Anleitung)

Diese Anleitung beschreibt Schritt für Schritt, wie `n8n-nodes-easycompliance`
auf npm veröffentlicht und anschließend bei n8n als **verifizierter Community
Node** (sichtbar in n8n Cloud) eingereicht wird.
Stand der n8n-Anforderungen: **Juli 2026** (Quellen am Ende).

---

## Überblick: die drei Stufen

| Stufe | Ergebnis | Aufwand |
|---|---|---|
| 1. npm-Veröffentlichung | Self-hosted-Nutzer können den Node über *Settings → Community Nodes* installieren | einmalig ~1–2 h |
| 2. Verifizierung durch n8n | Node erscheint im Node-Panel **aller** n8n-Instanzen inkl. **n8n Cloud** | Antrag + Review-Schleife |
| 3. Pflege | Updates per neuer npm-Version | laufend, gering |

---

## Schritt 1: Eigenes öffentliches GitHub-Repository anlegen

Der Ordner `n8n-nodes-easycompliance/` wird in ein **eigenes, öffentliches**
Repository überführt: `github.com/Siemssen-Consulting-GmbH/n8n-nodes-easycompliance`
(Organisation angelegt 2026-07; `repository.url`/`bugs.url` in `package.json`
zeigen bereits dorthin).

Beim Anlegen auf GitHub **keine** Startdateien generieren lassen (README,
.gitignore und LICENSE bringt das Paket selbst mit – ein vorab generiertes
README erzeugt nur eine abweichende Historie, die der erste Push mergen müsste).
Danach den Ordnerinhalt (ohne `node_modules/` und `dist/`) in das neue Repo
pushen.

- npm-Pakete sind ohnehin quelloffen einsehbar – das Haupt-Repository bleibt privat.
- **Pflicht für die Verifizierung:** Seit dem **01.05.2026** verlangt n8n für
  Verifizierungs-Einreichungen die Veröffentlichung über **GitHub Actions mit
  npm-Provenance** (Herkunftsnachweis). Dafür braucht das Paket ein eigenes
  öffentliches Repo.
- Das Feld `repository.url` in `package.json` anschließend auf das neue Repo umstellen.

## Schritt 2: Lokal bauen, linten, testen

```bash
cd n8n-nodes-easycompliance
npm install
npm run lint     # eslint-plugin-n8n-nodes-base – Findings beheben
npm run build    # kompiliert nach dist/ und kopiert das SVG-Icon
```

Lokal in einer n8n-Instanz testen (eine der beiden Varianten):

- **Klassisch:** Paket per `npm link` in `~/.n8n/custom/` einhängen
  (siehe n8n-Doku „Run your node locally"), n8n neu starten, Node im Editor suchen.
- **Neues Tooling:** n8n empfiehlt inzwischen die CLI `@n8n/node-cli`
  (Scaffolding neuer Nodes über `npm create @n8n/node`; für die Verifizierung
  muss die CLI **≥ 0.23.0** sein). Für dieses bereits fertige Paket ist die
  klassische Variante ausreichend.

**Testplan (Minimalfall):** Credential mit echtem API-Key + URLs anlegen →
Credential-Test muss grün werden (nutzt `method=4`). Danach je Operation ein
Testlauf gegen einen Testnamen; Erwartungen siehe README (`hit`, `hitCount`, `hits`).

## Schritt 3: Auf npm veröffentlichen

1. npm-Konto der Firma verwenden bzw. anlegen (npmjs.com, 2FA aktivieren).
2. Prüfen, dass der Paketname frei ist: `npm view n8n-nodes-easycompliance`
   (Fehler „404" = frei).
3. Erstveröffentlichung (aus dem Paketordner):

```bash
npm login
npm publish --access public
```

4. **Für die spätere Verifizierung erforderlich:** Release-Workflow über
   GitHub Actions einrichten (Vorlage: `n8n-nodes-starter`-Repository von n8n)
   und in den npm-Paketeinstellungen den **Trusted Publisher** auf dieses
   GitHub-Repo/Workflow konfigurieren. Zukünftige Releases laufen dann über
   den Actions-Workflow und erhalten automatisch eine Provenance-Signatur.

Die Pflichtkonventionen sind in diesem Paket bereits umgesetzt:
Paketname beginnt mit `n8n-nodes-`, Keyword `n8n-community-node-package`,
`n8n`-Attribut mit Node-/Credential-Pfaden in `package.json`.

## Schritt 4: Installation für Self-hosted-Kunden

Sobald das Paket auf npm liegt, können selbst gehostete n8n-Instanzen es
installieren: **Settings → Community Nodes → Install** →
`n8n-nodes-easycompliance`. Diesen Weg auf der Website-Doku
(`/schnittstellen/n8n/`) ergänzen, sobald die Veröffentlichung erfolgt ist
(dort steht aktuell „in Vorbereitung").

## Schritt 5: Verifizierung für n8n Cloud beantragen

Einreichung über das **n8n Creator Portal** (creators.n8n.io). Die
Anforderungen an verifizierte Community Nodes – Stand Juli 2026:

- **Keine Runtime-Dependencies** (dieses Paket erfüllt das: nur devDependencies;
  auch der Icon-Copy-Schritt nutzt nur die Node-Standardbibliothek).
- Veröffentlichung über GitHub Actions **mit Provenance** (Schritt 3.4).
- n8n-**UX-Guidelines** für Nodes einhalten (Benennung, Beschreibungstexte,
  Fehlerbilder) und **Dokumentation** bereitstellen (README des Pakets).
- n8n behält sich die Ablehnung vor (z. B. bei Konkurrenz zu Bezahl-Features).

Nach Einreichung folgt ein Review durch n8n; gemeldete Punkte beheben,
neue Version veröffentlichen, Re-Review anstoßen.

## Schritt 6: Pflege

- Jede Änderung als neue **semver**-Version über den Actions-Workflow releasen
  (verifizierte Nodes: n8n prüft Updates erneut).
- API-Änderungen von easycompliance (neue Parameter/Methoden) im Node
  nachziehen und im README dokumentieren.

---

## Quellen (n8n-Dokumentation)

- Building community nodes / Publishing:
  https://docs.n8n.io/integrations/community-nodes/building-community-nodes.md
- Installation von Community Nodes:
  https://docs.n8n.io/integrations/community-nodes/installation/
- Credential-Dateien (Body-Injection `authenticate.properties.body`):
  https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/
- Starter-Repo (Vorlage für Actions-Workflow):
  https://github.com/n8n-io/n8n-nodes-starter
