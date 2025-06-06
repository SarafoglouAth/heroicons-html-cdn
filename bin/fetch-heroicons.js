#!/usr/bin/env node

// Fetches the latest Heroicons release tarball and copies optimized 24 px
// solid / outline SVGs into this package’s folders, then auto-generates the
// TypeScript union types.

import https from 'https';
import path from 'path';
import fs from 'fs-extra';
import { execSync } from 'child_process';
import os from 'os';
import { fileURLToPath } from 'url';

// ──────────────────────────────────────────────
// resolve __dirname in ESM
// ──────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ──────────────────────────────────────────────
// settings
// ──────────────────────────────────────────────
const VERSION      = 'v2.1.5';
const TAR_URL      = `https://codeload.github.com/tailwindlabs/heroicons/tar.gz/refs/tags/${VERSION}`;
const TMP_DIR      = path.join(os.tmpdir(), `heroicons_${Date.now()}`);
const PACKAGE_DIR  = path.resolve(__dirname, '..');

// ──────────────────────────────────────────────
// main
// ──────────────────────────────────────────────
async function run() {
  console.log(`[heroicons-html-cdn] Downloading Heroicons ${VERSION} …`);
  await downloadAndExtract();

  console.log('Copying SVGs …');
  const solidSrc   = path.join(TMP_DIR, `heroicons-${VERSION.slice(1)}`, 'optimized', '24', 'solid');
  const outlineSrc = path.join(TMP_DIR, `heroicons-${VERSION.slice(1)}`, 'optimized', '24', 'outline');
  const solidDest   = path.join(PACKAGE_DIR, 'solid');
  const outlineDest = path.join(PACKAGE_DIR, 'outline');

  await fs.ensureDir(solidDest); // Use ensureDir (singular)
  await fs.ensureDir(outlineDest); // Use ensureDir (singular)
  await fs.copy(solidSrc,   solidDest);
  await fs.copy(outlineSrc, outlineDest);

  // ─ generate d.ts with union types
  await createIconTypes(solidDest, outlineDest);

  // ─ tidy up temp files
  await fs.remove(TMP_DIR);

  console.log('✔ Done – icons & types ready!');
}

// ──────────────────────────────────────────────
// helpers
// ──────────────────────────────────────────────
function downloadAndExtract() {
  return new Promise((resolve, reject) => {
    const tarPath = path.join(TMP_DIR, 'heroicons.tar.gz');
    fs.ensureDirSync(TMP_DIR);

    const file = fs.createWriteStream(tarPath);
    https.get(TAR_URL, res => {
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log('Extracting …');
          try {
            execSync(`tar -xzf "${tarPath}" -C "${TMP_DIR}"`);
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      });
    }).on('error', reject);
  });
}

async function createIconTypes(solidDest, outlineDest) {
  const toUnion = arr => arr.map(n => `"${n}"`).join(' | ');

  const solidIcons = (await fs.readdir(solidDest))
    .filter(f => f.endsWith('.svg'))
    .map(f => f.replace('.svg', ''));

  const outlineIcons = (await fs.readdir(outlineDest))
    .filter(f => f.endsWith('.svg'))
    .map(f => f.replace('.svg', ''));

  const content =
`// AUTO-GENERATED – DO NOT EDIT
export type SolidIconName   = ${toUnion(solidIcons)};
export type OutlineIconName = ${toUnion(outlineIcons)};
`;

  await fs.writeFile(
    path.join(PACKAGE_DIR, 'icon-types.d.ts'),
    content,
    'utf8'
  );
  const iconList = {
    solid: solidIcons,
    outline: outlineIcons
  };

  await fs.writeJson(
    path.join(PACKAGE_DIR, 'icons.json'),
    iconList,
    { spaces: 2 }
  );
  console.log('  • icon-types.d.ts generated');
}

// ──────────────────────────────────────────────
run().catch(err => {
  console.error(err);
  process.exit(1);
});