#!/usr/bin/env node

// Fetches the latest Heroicons release tarball and copies optimised 24px solid/outline icons
// into this package's `solid/` and `outline/` folders.
// Uses only Node core + fs-extra. No global git required.

const https = require('https');
const path = require('path');
const fs = require('fs-extra');
const { execSync } = require('child_process');
const os = require('os');

// --- settings
const VERSION = 'v2.1.5';
const TAR_URL = `https://codeload.github.com/tailwindlabs/heroicons/tar.gz/refs/tags/${VERSION}`;
const TMP_DIR = path.join(os.tmpdir(), `heroicons_${Date.now()}`);
const PACKAGE_DIR = path.resolve(__dirname, '..');

async function run() {
  console.log(`[heroicons-html-cdn] Downloading Heroicons ${VERSION} …`);
  await downloadAndExtract();
  console.log('Copying SVGs …');
  const solidSrc = path.join(TMP_DIR, `heroicons-${VERSION.substring(1)}`, 'optimized', '24', 'solid');
  const outlineSrc = path.join(TMP_DIR, `heroicons-${VERSION.substring(1)}`, 'optimized', '24', 'outline');
  const solidDest = path.join(PACKAGE_DIR, 'solid');
  const outlineDest = path.join(PACKAGE_DIR, 'outline');
  await fs.emptyDir(solidDest);
  await fs.emptyDir(outlineDest);
  await fs.copy(solidSrc, solidDest);
  await fs.copy(outlineSrc, outlineDest);
  console.log('✔ Done – icons ready!');
  // cleanup
  await fs.remove(TMP_DIR);
}

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
            execSync(`tar -xzf ${tarPath} -C ${TMP_DIR}`);
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      });
    }).on('error', reject);
  });
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});