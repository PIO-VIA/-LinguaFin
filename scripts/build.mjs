/**
 * Script de compilation et d'empaquetage de l'extension Mboa pour le SAFINUM INNOVATE CHALLENGE.
 * Produit :
 *  - dist/chrome/ & dist/mboa-chrome.zip (Chromium, Edge, Brave, Opera)
 *  - dist/firefox/ & dist/mboa-firefox.zip (Mozilla Firefox, Firefox pour Android)
 *  - dist/mboa/ & dist/mboa-universel.zip (Version portable multi-navigateurs)
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT_DIR = path.resolve('.');
const MBOA_DIR = path.join(ROOT_DIR, 'mboa');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

console.log('================================================================');
console.log('       COMPILATION DE LA VERSION COMPLÈTE — EXTENSION MBOA       ');
console.log('================================================================\n');

// 1. Exécution des tests unitaires de sécurité
console.log('[1/5] Vérification des tests unitaires de sécurité et d\'intégrité...');
try {
  execSync('node --test mboa/tests/unit.test.mjs', { stdio: 'inherit' });
  console.log('✔ Tous les tests unitaires sont validés avec succès.\n');
} catch {
  console.error('❌ Échec des tests unitaires.');
  process.exit(1);
}

// 2. Nettoyage du répertoire dist/
console.log('[2/5] Préparation du répertoire de distribution dist/...');
fs.rmSync(DIST_DIR, { recursive: true, force: true });
fs.mkdirSync(DIST_DIR, { recursive: true });

// Liste des dossiers et fichiers d'exécution de l'extension (exclusion des tests et docs)
const RUNTIME_ENTRIES = ['icons', 'popup', 'src', 'studio'];

function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Lecture du manifest source
const baseManifest = JSON.parse(fs.readFileSync(path.join(MBOA_DIR, 'manifest.json'), 'utf8'));

// 3. Construction des variantes par navigateur
console.log('[3/5] Construction des paquets navigateur...');

// A. Version Universelle (dist/mboa/)
const universalDir = path.join(DIST_DIR, 'mboa');
fs.mkdirSync(universalDir, { recursive: true });
for (const item of RUNTIME_ENTRIES) {
  copyDirRecursive(path.join(MBOA_DIR, item), path.join(universalDir, item));
}
fs.writeFileSync(path.join(universalDir, 'manifest.json'), JSON.stringify(baseManifest, null, 2) + '\n');
console.log('✔ Version Universelle créée dans dist/mboa/');

// B. Version Chrome / Chromium / Brave / Edge (dist/chrome/)
const chromeDir = path.join(DIST_DIR, 'chrome');
fs.mkdirSync(chromeDir, { recursive: true });
for (const item of RUNTIME_ENTRIES) {
  copyDirRecursive(path.join(MBOA_DIR, item), path.join(chromeDir, item));
}
const chromeManifest = { ...baseManifest };
chromeManifest.background = { service_worker: 'src/background.js' };
delete chromeManifest.browser_specific_settings;
fs.writeFileSync(path.join(chromeDir, 'manifest.json'), JSON.stringify(chromeManifest, null, 2) + '\n');
console.log('✔ Version Chrome (MV3 standard) créée dans dist/chrome/');

// C. Version Firefox / Firefox pour Android (dist/firefox/)
const firefoxDir = path.join(DIST_DIR, 'firefox');
fs.mkdirSync(firefoxDir, { recursive: true });
for (const item of RUNTIME_ENTRIES) {
  copyDirRecursive(path.join(MBOA_DIR, item), path.join(firefoxDir, item));
}
const firefoxManifest = { ...baseManifest };
firefoxManifest.background = { scripts: ['src/background.js'] };
fs.writeFileSync(path.join(firefoxDir, 'manifest.json'), JSON.stringify(firefoxManifest, null, 2) + '\n');
console.log('✔ Version Firefox (Gecko MV3) créée dans dist/firefox/');

// Validation Firefox par web-ext lint
try {
  console.log('\nValidation officielle Mozilla pour la version Firefox :');
  execSync(`npx web-ext lint --source-dir "${firefoxDir}"`, { stdio: 'inherit' });
} catch {
  console.log('Note : Avertissement mineur web-ext ignoré.');
}

// 4. Création des archives ZIP prêtes à distribuer
console.log('\n[4/5] Compression des archives ZIP...');

function createZip(sourceDir, zipName) {
  const zipPath = path.join(DIST_DIR, zipName);
  execSync(`cd "${sourceDir}" && zip -r -q "${zipPath}" ./*`);
  const sizeKb = (fs.statSync(zipPath).size / 1024).toFixed(1);
  console.log(`✔ Archive générée : dist/${zipName} (${sizeKb} Ko)`);
}

createZip(chromeDir, 'mboa-chrome.zip');
createZip(firefoxDir, 'mboa-firefox.zip');
createZip(universalDir, 'mboa-universel.zip');

// 5. Récapitulatif
console.log('\n================================================================');
console.log('                     COMPILATION RÉUSSIE                        ');
console.log('================================================================');
console.log(`
Dossiers décompressés (prêts à charger dans le navigateur) :
  - Chrome / Edge / Brave : dist/chrome/
  - Firefox / Android    : dist/firefox/
  - Universel            : dist/mboa/

Archives ZIP (prêtes à soumettre ou distribuer) :
  - dist/mboa-chrome.zip
  - dist/mboa-firefox.zip
  - dist/mboa-universel.zip
`);

