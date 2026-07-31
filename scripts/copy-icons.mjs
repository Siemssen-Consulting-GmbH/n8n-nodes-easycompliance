// Kopiert die Node-Icons (SVG) nach dist/ – tsc übernimmt nur .ts-Dateien.
// Bewusst ohne Zusatz-Dependency (gulp o. Ä.): Verifizierte Community Nodes
// dürfen keine Runtime-Dependencies haben, und für einen reinen Copy-Schritt
// genügt die Node-Standardbibliothek.
import { cpSync } from 'node:fs';

cpSync('nodes', 'dist/nodes', {
	recursive: true,
	filter: (src) => !src.endsWith('.ts'),
});
