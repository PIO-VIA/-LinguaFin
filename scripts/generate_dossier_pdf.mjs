import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT_DIR = path.resolve('.');
const outHtmlPath = path.join(ROOT_DIR, 'SAFINUM_GIFA_Dossier_Technique.html');
const outPdfPath = path.join(ROOT_DIR, 'SAFINUM_GIFA_Dossier_Technique.pdf');

console.log('[PDF] Compilation du dossier technique via Google Chrome headless...');
try {
  execSync(`google-chrome --headless --disable-gpu --print-to-pdf="${outPdfPath}" --no-pdf-header-footer "${outHtmlPath}"`, {
    stdio: 'inherit'
  });
  const stats = fs.statSync(outPdfPath);
  console.log(`✔ Dossier PDF généré : ${outPdfPath} (${(stats.size / 1024).toFixed(1)} Ko)`);
} catch (err) {
  console.error('❌ Échec de la compilation du PDF :', err);
  process.exit(1);
}
